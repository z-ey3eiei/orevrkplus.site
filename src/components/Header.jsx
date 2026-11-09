import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sparkles, Github, ArrowRight } from "lucide-react";
import brand from "@/lib/brand.config";
import BrandMark from "@/components/BrandMark";
import { useActivity } from "@/components/system/ActivityProvider";

const primaryLinks = [
  { label: "Docs", href: `${brand.links.github}#readme` },
  { label: "Learn", href: brand.links.learn },
  { label: "Showcase", to: brand.links.showcase },
  { label: "Registry", to: brand.links.registry },
  { label: "Blog", href: brand.links.blog },
];

const menuLinks = [
  { label: "Starter", href: brand.links.templates },
  { label: "Deploy", href: brand.links.deploy },
];

export default function Header() {
  const { record } = useActivity();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 8);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const tap = (label) => {
    record("nav_click", `Tapped ${label}`);
    setMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-background/90 text-foreground backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "border-b border-border/80 shadow-[0_1px_0_0_hsl(var(--border)/0.6)]" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-6">
          <Link to={brand.links.home} onClick={() => tap("Home")} className="group flex shrink-0 items-center gap-2">
            <BrandMark className="h-5 w-5 transition-transform duration-300 group-hover:scale-105 sm:h-6 sm:w-6" />
            <span className="flex items-center text-[17px] font-bold tracking-tight sm:text-xl">
              {brand.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 text-[13.5px] font-medium text-foreground/70 xl:flex">
            {primaryLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => tap(link.label)}
                  className="rounded-full px-3 py-2 transition-colors duration-200 hover:bg-muted/70 hover:text-foreground active:scale-95"
                  activeProps={{ className: "text-foreground bg-muted/60" }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-full px-3 py-2 transition-colors duration-200 hover:bg-muted/70 hover:text-foreground active:scale-95"
                >
                  {link.label}
                </a>
              )
            )}
            {menuLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-1 rounded-full px-3 py-2 transition-colors duration-200 hover:bg-muted/70 hover:text-foreground active:scale-95"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <Button asChild size="sm" className="h-9 px-4">
            <a href="/#get-started" onClick={() => tap("Get started")}>Get started <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="hidden h-8 gap-1.5 rounded-full border-border/80 px-3 text-foreground transition-all hover:scale-105 hover:bg-secondary hover:shadow-sm lg:flex"
          >
            <Link to="/ai" onClick={() => tap("Ask AI")}>
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Ask AI
            </Link>
          </Button>
          <a
            href={brand.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu" className="h-11 w-11 rounded-full">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[86vw] max-w-sm border-l border-border bg-background text-foreground">
            <nav className="mt-10 flex flex-col text-[15px] font-medium">
              <Link
                to={brand.links.home}
                onClick={() => tap("Home")}
                className="flex min-h-[52px] items-center justify-between rounded-lg px-2 text-foreground transition-colors active:bg-muted"
              >
                Home
              </Link>
              <a href={`${brand.links.github}#readme`} onClick={() => tap("Docs")} className="flex min-h-[52px] items-center rounded-lg px-2 text-foreground/75">Docs</a>
              <a href="/#get-started" onClick={() => tap("Get started")} className="flex min-h-[52px] items-center rounded-lg px-2 text-primary">Get started <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></a>
              <Link
                to="/ai"
                onClick={() => tap("Ask AI")}
                className="flex min-h-[52px] items-center justify-between rounded-lg px-2 text-foreground/75 transition-colors active:bg-muted"
              >
                Ask AI
                <Sparkles className="h-4 w-4 text-primary" />
              </Link>
              <Link
                to={brand.links.showcase}
                onClick={() => tap("Showcase")}
                className="flex min-h-[52px] items-center justify-between rounded-lg px-2 text-foreground/75 transition-colors active:bg-muted"
              >
                Showcase
              </Link>
              <Link
                to={brand.links.registry}
                onClick={() => tap("Registry")}
                className="flex min-h-[52px] items-center justify-between rounded-lg px-2 text-foreground/75 transition-colors active:bg-muted"
              >
                Registry
              </Link>
              {["Learn", "Blog"].map((label) => (
                <a
                  key={label}
                  href={brand.links[label.toLowerCase()]}
                  onClick={() => tap(label)}
                  className="flex min-h-[52px] items-center justify-between rounded-lg px-2 text-foreground/75 transition-colors active:bg-muted"
                >
                  {label}
                </a>
              ))}
              <div className="my-2 h-px bg-border/80" />
              {menuLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => tap(link.label)}
                  className="flex min-h-[52px] items-center justify-between rounded-lg px-2 text-foreground/75 transition-colors active:bg-muted"
                >
                  {link.label}
                </a>
              ))}
              <div className="my-2 h-px bg-border/80" />
              <a
                href={brand.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => tap("GitHub")}
                className="flex min-h-[52px] items-center gap-3 rounded-lg px-2 text-foreground/75 transition-colors active:bg-muted"
              >
                <Github className="h-5 w-5" /> GitHub
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}