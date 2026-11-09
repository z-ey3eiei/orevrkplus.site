import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import brand from "@/lib/brand.config";
import InstallCommand from "./InstallCommand";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background">
      <div className="vgrid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <a href={brand.links.github} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          Introducing create-ovk-app <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <h1 className="mx-auto mt-8 max-w-4xl text-[42px] font-semibold leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
          Your next website.<br /><span className="text-muted-foreground">Starts with OREVRK PLUS.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
          Start with a Vite-powered template, make it yours, and build static files ready for any host. One command to get going.
        </p>
        <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <Button asChild className="h-12 px-7 font-semibold"><a href="#get-started">Get started <ArrowRight className="h-4 w-4" aria-hidden="true" /></a></Button>
          <Button asChild variant="outline" className="h-12 px-7 font-semibold"><a href={`${brand.links.github}#readme`}>Read the docs</a></Button>
        </div>
        <div className="mx-auto mt-8 max-w-lg text-left"><InstallCommand /></div>
        <p className="mt-4 text-xs text-muted-foreground">Node.js 20+ · Vite · MIT licensed</p>
        <a href={brand.links.github} className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"><Github className="h-4 w-4" aria-hidden="true" />Explore the source</a>
      </div>
    </section>
  );
}
