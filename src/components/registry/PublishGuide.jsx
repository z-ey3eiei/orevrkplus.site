import CopyLine from "@/components/registry/CopyLine";

export default function PublishGuide({ registryUrl }) {
  const authKey = `//${registryUrl.replace(/^https?:\/\//, "")}/:_authToken`;

  return (
    <div className="rounded-2xl border border-border/80 bg-card/40 p-5 sm:p-6">
      <h3 className="text-[15px] font-semibold text-foreground">Publish a package</h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
        Sign in once with a personal access token from the dashboard (API page) that belongs to an app admin, then
        publish from any package folder.
      </p>

      <div className="mt-4 space-y-2">
        <CopyLine label="auth" command={`npm config set ${authKey}=$ONENEXT_TOKEN`} />
        <CopyLine label="publish" command={`npm publish --registry=${registryUrl}`} />
        <CopyLine label="install" command={`npm install <package> --registry=${registryUrl}`} />
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground">
        Tarballs are served from permanent public URLs so plain <code className="font-mono text-foreground/80">npm install</code>{" "}
        works without a token. Publishing requires an admin token.
      </p>
    </div>
  );
}