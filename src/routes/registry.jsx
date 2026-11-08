import { createFileRoute } from "@tanstack/react-router";
import { listRegistryPackages } from "@/lib/server-fns";
import CopyLine, { useRegistryOrigin } from "@/components/registry/CopyLine";
import PackageListItem from "@/components/registry/PackageListItem";
import PublishGuide from "@/components/registry/PublishGuide";

export const Route = createFileRoute("/registry")({
  loader: () => listRegistryPackages(),
  head: () => ({
    meta: [
      { title: "npm registry — orevrkplus" },
      {
        name: "description",
        content: "Install every orevrkplus package straight from our own npm registry, compatible with npm publish and npm install.",
      },
    ],
  }),
  component: RegistryPage,
});

function RegistryPage() {
  const packages = Route.useLoaderData();
  const origin = useRegistryOrigin();
  const registryUrl = `${origin}/api/npm`;

  return (
    <div className="bg-background text-foreground">
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-primary">npm registry</p>
          <h1 className="mt-3 max-w-2xl text-[34px] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[46px]">
            Every orevrkplus package, from one registry.
          </h1>
          <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-muted-foreground">
            A real npm-compatible registry hosted with the framework. Point npm at it once, then install, publish and
            pin versions exactly the way you always have.
          </p>
          <div className="mt-6 max-w-xl space-y-2">
            <CopyLine label="registry" command={registryUrl} />
            <CopyLine label="config" command={`npm config set @onenex:registry ${registryUrl}`} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-[19px] font-semibold tracking-[-0.02em]">Packages</h2>
          <span className="font-mono text-[11.5px] text-muted-foreground">{packages.length} total</span>
        </div>

        {packages.length ? (
          <div className="mt-5 space-y-3">
            {packages.map((pkg) => (
              <PackageListItem key={pkg.name} pkg={pkg} registryUrl={registryUrl} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-dashed border-border/80 bg-card/20 p-6 text-center">
            <p className="text-[14px] font-medium text-foreground">No packages published yet</p>
            <p className="mt-1.5 text-[13px] text-muted-foreground">
              Publish your first package with the commands below — it shows up here right away.
            </p>
          </div>
        )}

        <div className="mt-10">
          <PublishGuide registryUrl={registryUrl} />
        </div>
      </section>
    </div>
  );
}