export default function PreviewDemo() {
  return (
    <div className="overflow-hidden rounded-xl border border-border/70 bg-background/60">
      <div className="flex items-center gap-2 border-b border-border/70 bg-muted/40 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="ml-1 truncate font-mono text-[10.5px] text-muted-foreground">orevrkplus.site</span>
        <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">
          preview
        </span>
      </div>

      <div className="relative space-y-2.5 p-4">
        <div className="h-2.5 w-2/3 rounded-full bg-border/80" />
        <div className="h-2.5 w-1/2 rounded-full bg-border/60" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="h-14 rounded-lg border border-border/70 bg-muted/40" />
          <div className="h-14 rounded-lg border border-border/70 bg-muted/40" />
          <div className="h-14 rounded-lg border border-border/70 bg-muted/40" />
        </div>

        <div className="mt-3 w-[86%] rounded-lg border border-primary/30 bg-card p-2.5 shadow-lg shadow-black/30">
          <p className="text-[11.5px] leading-snug text-foreground/85">
            The contrast ratio on this <span className="font-mono text-[11px] text-primary">blockquote</span> isn't
            passing AA. Can we tweak?
          </p>
          <p className="mt-1.5 text-[10.5px] text-muted-foreground">rauno · 30 min ago</p>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {["Accessibility", "Flags", "Layout shifts", "OG image"].map((tool) => (
            <span
              key={tool}
              className="rounded-md border border-border/70 px-2 py-1 text-[10.5px] text-muted-foreground"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}