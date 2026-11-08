const LOGOS = ["Adobe", "Netflix", "Notion", "Stripe", "Patreon", "eBay", "Sonos", "Dice"];

export default function LogoStrip() {
  return (
    <section className="border-b border-border/60 bg-background py-10">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Design teams, accelerated.
      </p>
      <div className="fade-x mt-6 overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-10 pr-10">
          {[...LOGOS, ...LOGOS].map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="whitespace-nowrap text-[17px] font-semibold tracking-tight text-foreground/35"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}