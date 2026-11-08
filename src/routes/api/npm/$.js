import { createFileRoute } from "@tanstack/react-router";
import { createHash } from "node:crypto";
import { Buffer } from "node:buffer";

// npm registry compatible endpoints under /api/npm/*:
//   GET  /:name                      packument
//   GET  /:name/:version             version manifest
//   GET  /:name/-/:file.tgz          tarball (redirects to public storage)
//   PUT  /:name                      publish (app admin token required)
//   GET  /-/ping                     ping

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });

// "@scope%2Fname/-/name-1.0.0.tgz" arrives decoded, so a scoped name spans two segments.
function parsePath(splat) {
  const segments = String(splat || "").split("/").filter(Boolean);
  if (!segments.length) return { name: null, rest: [] };
  let name = segments[0];
  let rest = segments.slice(1);
  if (name.startsWith("@") && rest.length) {
    name = `${name}/${rest[0]}`;
    rest = rest.slice(1);
  }
  return { name, rest };
}

function compareVersions(a, b) {
  const pa = String(a || "0").split(".").map(Number);
  const pb = String(b || "0").split(".").map(Number);
  for (let i = 0; i < 3; i += 1) {
    const diff = (pa[i] || 0) - (pb[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function manifestFor(record) {
  let manifest = {};
  try {
    manifest = JSON.parse(record.manifest_json || "{}");
  } catch {
    manifest = {};
  }
  return {
    ...manifest,
    name: record.package_name,
    version: record.version,
    description: record.description || manifest.description || "",
    dist: {
      tarball: record.tarball_url,
      shasum: record.shasum,
      integrity: record.integrity,
    },
  };
}

async function loadPackage(base44, name) {
  const packages = await base44.entities.NpmPackage.filter({ name });
  const pkg = packages[0];
  if (!pkg) return null;
  const versions = await base44.entities.NpmVersion.filter({ package_name: name });
  return { pkg, versions: versions.sort((a, b) => compareVersions(b.version, a.version)) };
}

async function handleGet({ params, context }) {
  const base44 = context.getBase44();
  const { name, rest } = parsePath(params._splat);

  if (name === "-") {
    if (rest[0] === "ping") return json({});
    return json({ error: "Not found" }, 404);
  }
  if (!name) return json({ error: "Package name required" }, 400);

  const data = await loadPackage(base44, name);
  if (!data) return json({ error: "Not found" }, 404);

  // Tarball: send npm to the stored immutable file.
  if (rest[0] === "-" && rest[1]) {
    const base = name.split("/").pop();
    const version = rest[1].replace(/\.tgz$/, "").slice(base.length + 1);
    const record = data.versions.find((item) => item.version === version);
    if (!record) return json({ error: "Not found" }, 404);
    return Response.redirect(record.tarball_url, 302);
  }

  if (rest.length === 1) {
    const wanted = rest[0] === "latest" ? data.pkg.latest_version : rest[0];
    const record = data.versions.find((item) => item.version === wanted);
    if (!record) return json({ error: "Not found" }, 404);
    return json(manifestFor(record));
  }

  const time = {};
  data.versions.forEach((record) => {
    time[record.version] = record.published_at || record.created_date;
  });
  const sorted = [...data.versions].reverse();

  return json({
    _id: data.pkg.name,
    name: data.pkg.name,
    description: data.pkg.description || "",
    "dist-tags": { latest: data.pkg.latest_version || sorted[sorted.length - 1]?.version },
    versions: Object.fromEntries(data.versions.map((record) => [record.version, manifestFor(record)])),
    time: {
      created: sorted[0]?.published_at || sorted[0]?.created_date,
      modified: data.versions[0]?.published_at || data.versions[0]?.updated_date,
      ...time,
    },
    keywords: data.pkg.keywords || [],
    readme: data.pkg.readme || "",
    maintainers: [],
  });
}

async function handlePublish({ params, request, context }) {
  const { name, rest } = parsePath(params._splat);
  if (!name || rest.length) return json({ error: "Publish to /api/npm/<name>" }, 400);

  const user = await context
    .getBase44()
    .auth.me()
    .catch(() => null);
  if (!user || user.role !== "admin") {
    return json({ error: "Publishing requires an app admin token" }, 403);
  }

  const body = await request.json();
  const manifestVersions = body.versions || {};
  const versionKeys = Object.keys(manifestVersions);
  const tagged = body["dist-tags"]?.latest;
  const version = tagged || versionKeys[versionKeys.length - 1];
  if (!version) return json({ error: "No version in payload" }, 400);

  const manifest = manifestVersions[version] || {};
  const attachment = Object.values(body._attachments || {})[0];
  if (!attachment?.data) return json({ error: "Tarball attachment required" }, 400);

  const bytes = Buffer.from(attachment.data, "base64");
  if (!bytes.length) return json({ error: "Empty tarball" }, 400);

  const base = name.split("/").pop();
  const file = new File([bytes], `${base}-${version}.tgz`, { type: "application/octet-stream" });
  const base44 = context.getBase44().asServiceRole;
  const uploaded = await base44.integrations.Core.UploadPublicFile({ file });
  if (!uploaded?.file_url) return json({ error: "Tarball upload failed" }, 502);

  const { dist: _dist, ...restManifest } = manifest;
  const description = body.description || manifest.description || "";
  const publishedAt = new Date().toISOString();

  const existingPackage = (await base44.entities.NpmPackage.filter({ name }))[0];
  const latestVersion =
    tagged === version || !existingPackage?.latest_version
      ? version
      : compareVersions(version, existingPackage.latest_version) > 0
        ? version
        : existingPackage.latest_version;

  const packageData = {
    name,
    description,
    latest_version: latestVersion,
    keywords: manifest.keywords || [],
  };
  if (existingPackage) await base44.entities.NpmPackage.update(existingPackage.id, packageData);
  else await base44.entities.NpmPackage.create(packageData);

  const versionData = {
    package_name: name,
    version,
    description,
    tarball_url: uploaded.file_url,
    shasum: createHash("sha1").update(bytes).digest("hex"),
    integrity: `sha512-${createHash("sha512").update(bytes).digest("base64")}`,
    size: bytes.length,
    manifest_json: JSON.stringify(restManifest),
    published_at: publishedAt,
  };

  const existingVersion = (await base44.entities.NpmVersion.filter({ package_name: name, version }))[0];
  if (existingVersion) await base44.entities.NpmVersion.update(existingVersion.id, versionData);
  else await base44.entities.NpmVersion.create(versionData);

  return json({ ok: true, success: true, id: name, version }, 201);
}

export const Route = createFileRoute("/api/npm/$")({
  server: {
    handlers: {
      GET: handleGet,
      PUT: handlePublish,
    },
  },
});