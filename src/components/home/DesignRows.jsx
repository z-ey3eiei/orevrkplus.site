import SdkDemo from "@/components/home/SdkDemo";
import PreviewDemo from "@/components/home/PreviewDemo";

function Row({ eyebrow, title, body, media, reverse = false }) {
  return (
    <div className="grid items-center gap-7 md:grid-cols-2 md:gap-12">
      <div className={reverse ? "md:order-2" : ""}>
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        <h3 className="mt-3 text-[26px] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-[32px]">
          {title}
        </h3>
        <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-muted-foreground">{body}</p>
      </div>
      <div className={`rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 ${reverse ? "md:order-1" : ""}`}>
        {media}
      </div>
    </div>
  );
}

const FRAMEWORKS = ["React", "Next-style routing", "Vue", "Svelte", "Nuxt"];

function FrameworkMedia() {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FRAMEWORKS.map((name, index) => (
          <span
            key={name}
            className={`rounded-full border px-3 py-1.5 text-[12px] transition-colors ${
              index === 0
                ? "border-primary/40 bg-primary/10 text-foreground"
                : "border-border/80 text-muted-foreground"
            }`}
          >
            {name}
          </span>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-border/70 bg-background/60 p-3.5 font-mono text-[11px] leading-6 text-muted-foreground">
        <p>
          <span className="text-primary">✓</span> framework detected: react
        </p>
        <p>
          <span className="text-primary">✓</span> routes generated: app/**/*.jsx
        </p>
        <p>
          <span className="text-primary">✓</span> deploy target: edge (iad1)
        </p>
      </div>
    </div>
  );
}

export default function DesignRows() {
  return (
    <section className="border-b border-border/60 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl space-y-16 px-4 sm:space-y-24 sm:px-6">
        <Row
          eyebrow="Framework-defined infrastructure"
          title="Design more, configure less."
          body="Choose your framework — the rest is up to us. Routing, server functions and caching are generated from the files you already write, so your team stays on the design."
          media={<FrameworkMedia />}
        />
        <Row
          reverse
          eyebrow="Type-safe SDK"
          title="Ship the SDK in minutes."
          body="Every REST endpoint is a typed method. Install @onenex/sdk, pass a bearer token, and query projects, deployments and domains with full autocomplete."
          media={<SdkDemo />}
        />
        <Row
          eyebrow="Preview deployments"
          title="Design to deploy."
          body="Turn ideas into UI with preview environments you can share like they are already in production — comments land on the real DOM, not a screenshot."
          media={<PreviewDemo />}
        />
      </div>
    </section>
  );
}