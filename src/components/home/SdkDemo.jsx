export default function SdkDemo() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="overflow-hidden rounded-xl border border-border/70 bg-background/60">
        <div className="flex items-center justify-between border-b border-border/70 px-3 py-2">
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">run.ts</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">@onenex/sdk</span>
        </div>
        <pre className="overflow-x-auto p-3 font-mono text-[11px] leading-[1.6] text-foreground/80">
          <code>{`import { OneNext } from "@onenex/sdk";

const onenex = new OneNext({
  bearerToken: process.env.TOKEN,
});

const { projects } = await onenex
  .projects
  .list({ limit: 3 });`}</code>
        </pre>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/70 bg-background/60">
        <div className="flex items-center justify-between border-b border-border/70 px-3 py-2">
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">200 · json</span>
          <span className="font-mono text-[10px] text-muted-foreground">128 ms</span>
        </div>
        <pre className="overflow-x-auto p-3 font-mono text-[11px] leading-[1.6] text-muted-foreground">
          <code>{`{
  "projects": [
    {
      "id": "prj_8f2c",
      "name": "design-system",
      "framework": "react",
      "ready": true
    },
    {
      "id": "prj_1a90",
      "name": "marketing-site",
      "framework": "onenex",
      "ready": true
    }
  ]
}`}</code>
        </pre>
      </div>

      <div className="flex flex-wrap gap-2 sm:col-span-2">
        {[
          ["Projects", "33"],
          ["Deployments", "10"],
          ["Domains", "9"],
          ["Webhooks", "4"],
        ].map(([label, count]) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 px-3 py-1 text-[11.5px] text-muted-foreground"
          >
            {label}
            <span className="font-mono text-[10.5px] text-foreground/70">{count} endpoints</span>
          </span>
        ))}
      </div>
    </div>
  );
}