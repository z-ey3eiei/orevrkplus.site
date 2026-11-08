import CopyLine from "@/components/registry/CopyLine";

export default function PackageListItem({ pkg, registryUrl }) {
  return (
    <div className="rounded-xl border border-border/80 bg-card/40 p-4 transition-colors hover:border-border hover:bg-card/70 sm:p-5">
      <div className="flex flex-wrap items-baseline gap-2">
        <h3 className="font-mono text-[14px] font-medium text-foreground">{pkg.name}</h3>
        {pkg.latest_version ? (
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10.5px] text-primary">
            {pkg.latest_version}
          </span>
        ) : null}
        <span className="ml-auto text-[11px] text-muted-foreground">{pkg.version_count} versions</span>
      </div>

      {pkg.description ? (
        <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{pkg.description}</p>
      ) : null}

      {pkg.keywords?.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {pkg.keywords.slice(0, 6).map((keyword) => (
            <span
              key={keyword}
              className="rounded border border-border/70 px-1.5 py-0.5 font-mono text-[10.5px] text-muted-foreground"
            >
              {keyword}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-3">
        <CopyLine command={`npm install ${pkg.name} --registry=${registryUrl}`} label="install" />
      </div>
    </div>
  );
}