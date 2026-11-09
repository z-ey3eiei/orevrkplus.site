/**
 * Facts sourced from https://github.com/devstacksdk/create-ovk-app
 * (package.json, README.md, bin/index.mjs). Do not add flags or scripts not in that repo.
 */
export const createOvkApp = {
  packageName: "create-ovk-app",
  version: "1.0.1",
  npmInvoke: "npx create-ovk-app@latest",
  defaultProjectName: "ovk-app",
  helpFlags: ["-h", "--help"],
  nodeEngine: ">=20",
  license: "MIT",
  repository: "https://github.com/devstacksdk/create-ovk-app",
  githubOrg: "https://github.com/devstacksdk",
  homepage: "https://orevrkplus.site",
  description:
    "Scaffold an OREVRK PLUS app: dev server on port 3000, static build in dist/, ready to deploy",
  scaffoldCommand: "npx create-ovk-app@latest my-app",
  afterScaffold: ["cd my-app", "npm install", "npm run dev"],
  projectScripts: [
    { command: "npm run dev", result: "Dev server at http://localhost:3000" },
    { command: "npm run build", result: "Writes the deployable site to dist/" },
    { command: "npm run preview", result: "Serves dist/ at http://localhost:4173" },
    { command: "npm run export", result: "Builds and packs dist/ into <name>-dist.zip" },
    { command: "npm run deploy:cloudflare", result: "Optional Cloudflare deployment" },
  ],
  deployExamples: [
    { host: "Netlify", command: "npx netlify deploy --dir dist --prod" },
    { host: "Vercel", command: "npx vercel deploy dist --prod" },
    { host: "Cloudflare", command: "npm run deploy:cloudflare" },
  ],
  hostBuildHint: { buildCommand: "npm run build", outputDirectory: "dist" },
  sitePath: "/create-ovk-app",
};

export default createOvkApp;
