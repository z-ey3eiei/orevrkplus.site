const LOGOS = ["Adobe", "Netflix", "Notion", "Stripe", "Patreon", "eBay", "Sonos", "Dice"];

export default function LogoStrip() {
  return (
    <section className="border-b border-border/60 bg-background py-10">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Design teams, accelerated.
      </p>
      <div className="fade-x mt-6 overflow-hidden">
        <ul className="animate-marquee flex w-max list-none items-center gap-10 p-0 pr-10" aria-label="Teams using orevrkplus">
          {[...LOGOS, ...LOGOS].map((name, index) => (
            <li
              key={`${name}-${index}`}
              aria-hidden={index >= LOGOS.length ? "true" : undefined}
              className="whitespace-nowrap text-[17px] font-semibold tracking-tight text-foreground/60"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}