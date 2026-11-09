import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Monitor, Sun, Moon, Check } from "lucide-react";
import brand from "@/lib/brand.config";
import BrandMark from "@/components/BrandMark";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [theme, setTheme] = useState("system");
  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail("");
  };

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 text-sm">
          <section className="flex flex-col gap-3">
            <h2 className="font-semibold text-foreground text-xs">Get started</h2>
            <Link to={brand.links.docs} className="text-foreground/70 hover:text-primary transition-colors">Docs</Link>
            <a href={brand.links.learn} className="text-foreground/70 hover:text-primary transition-colors">Learn</a>
            <Link to={brand.links.showcase} className="text-foreground/70 hover:text-primary transition-colors">Showcase</Link>
            <a href={brand.links.blog} className="text-foreground/70 hover:text-primary transition-colors">Blog</a>
            <a href={brand.links.templates} className="text-foreground/70 hover:text-primary transition-colors">Templates</a>
            <a href={brand.links.deploy} className="text-foreground/70 hover:text-primary transition-colors">Deploy</a>
            <a href={brand.links.guides} className="text-foreground/70 hover:text-primary transition-colors">Guides</a>
            <a href={brand.links.cli} className="text-foreground/70 hover:text-primary transition-colors">CLI</a>
            <a href={brand.links.releases} className="text-foreground/70 hover:text-primary transition-colors">Releases</a>
            <a href={brand.links.changelog} className="text-foreground/70 hover:text-primary transition-colors">Changelog</a>
            <a href={brand.links.community} className="text-foreground/70 hover:text-primary transition-colors">Community</a>
          </section>
          <section className="flex flex-col gap-3">
            <h2 className="font-semibold text-foreground text-xs">Build</h2>
            <a href={brand.links.routing} className="text-foreground/70 hover:text-primary transition-colors">Routing</a>
            <a href={brand.links.dataFetching} className="text-foreground/70 hover:text-primary transition-colors">Data fetching</a>
            <a href={brand.links.rendering} className="text-foreground/70 hover:text-primary transition-colors">Rendering</a>
            <a href={brand.links.styling} className="text-foreground/70 hover:text-primary transition-colors">Styling</a>
            <a href={brand.links.serverFunctions} className="text-foreground/70 hover:text-primary transition-colors">Server functions</a>
            <a href={brand.links.apiRoutes} className="text-foreground/70 hover:text-primary transition-colors">API routes</a>
            <a href={brand.links.caching} className="text-foreground/70 hover:text-primary transition-colors">Caching</a>
            <a href={brand.links.github} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">GitHub</a>
          </section>
          <section className="flex flex-col gap-3">
            <h2 className="font-semibold text-foreground text-xs">About {brand.name}</h2>
            <a href={brand.links.about} className="text-foreground/70 hover:text-primary transition-colors">About {brand.name}</a>
            <a href={brand.links.why} className="text-foreground/70 hover:text-primary transition-colors">Why {brand.name}</a>
            <a href={brand.links.openSource} className="text-foreground/70 hover:text-primary transition-colors">Open Source Software</a>
            <a href={brand.links.github} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">GitHub</a>
            <a href={brand.links.bluesky} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">Bluesky</a>
            <a href={brand.links.x} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">X</a>
          </section>
          <section className="flex flex-col gap-3">
            <h2 className="font-semibold text-foreground text-xs">Legal</h2>
            <a href={brand.links.privacy} className="text-foreground/70 hover:text-primary transition-colors">Privacy Policy</a>
            <a href={brand.links.terms} className="text-foreground/70 hover:text-primary transition-colors">Terms of Service</a>
            <button className="text-left text-foreground/70 hover:text-primary transition-colors">Cookie Preferences</button>
          </section>
          <section className="col-span-2 lg:col-span-1 flex flex-col gap-3">
            <h4 className="font-semibold text-foreground text-xs">Subscribe to our newsletter</h4>
            <form onSubmit={submit} className="flex gap-2">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" className="h-9 bg-card border-border text-card-foreground" />
              <Button type="submit" size="sm" className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground">Subscribe</Button>
            </form>
            {done && <p className="flex items-center gap-1 text-xs text-primary"><Check className="w-3 h-3" />Thanks for subscribing!</p>}
            <p className="text-xs text-foreground/70">Release notes, guides and product updates. One short email a month.</p>
          </section>
        </div>

        <div className="mt-16 flex items-center justify-between">
          <BrandMark className="w-[22px] h-[22px]" />
          <fieldset className="flex items-center rounded-full border border-border bg-card p-0.5">
            <legend className="sr-only">Select a display theme:</legend>
            <button type="button" onClick={() => setTheme("system")} aria-label="Use system theme" aria-pressed={theme === "system"} className={`p-1.5 rounded-full transition-colors ${theme === "system" ? "bg-secondary text-foreground" : "text-foreground/60"}`}><Monitor className="w-3.5 h-3.5" /></button>
            <button type="button" onClick={() => setTheme("light")} aria-label="Use light theme" aria-pressed={theme === "light"} className={`p-1.5 rounded-full transition-colors ${theme === "light" ? "bg-secondary text-foreground" : "text-foreground/60"}`}><Sun className="w-3.5 h-3.5" /></button>
            <button type="button" onClick={() => setTheme("dark")} aria-label="Use dark theme" aria-pressed={theme === "dark"} className={`p-1.5 rounded-full transition-colors ${theme === "dark" ? "bg-secondary text-foreground" : "text-foreground/60"}`}><Moon className="w-3.5 h-3.5" /></button>
          </fieldset>
        </div>
      </div>
    </footer>
  );
}