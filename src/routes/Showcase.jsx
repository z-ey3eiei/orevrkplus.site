import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Gauge, Users, Globe } from "lucide-react";

const AnimatedElement = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { clearTimeout(fallback); setTimeout(() => setIsVisible(true), delay); observer.unobserve(el); }
    }, { threshold: 0.05, rootMargin: "0px 0px 200px 0px" });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className || ""}`}>
      {children}
    </div>
  );
};

const showcaseFallback = [
  { name: "The Washington Post", tagline: "Engineering at the speed of breaking news", image_url: "https://media.base44.com/images/public/6ae7693fcb65c519922617b3/dbea18e31_nextjs_org_preview-wapo_04195bfa.png" },
  { name: "Sonos", tagline: "Amplifying developer experience", image_url: "https://media.base44.com/images/public/6ae7693fcb65c519922617b3/b3f3bca9d_nextjs_org_preview-sonos_3a7399e8.png" },
  { name: "Notion", tagline: "Your wiki, docs, and projects. Together.", image_url: "https://media.base44.com/images/public/6ae7693fcb65c519922617b3/fa11856d6_nextjs_org_preview-notion_ad1e8497.png" },
  { name: "Dice", tagline: "Event discovery for live music fans", image_url: "https://media.base44.com/images/public/6ae7693fcb65c519922617b3/d62b45c0d_nextjs_org_preview-dice_28b7a11e.png" },
  { name: "Nike", tagline: "Elevated product storytelling", image_url: "https://media.base44.com/images/public/6ae7693fcb65c519922617b3/740f92e1f_nextjs_org_preview-nike_7a5da41f.png" },
];

const stats = [
  { icon: Gauge, value: "0.09", label: "Average Cumulative Layout Shift" },
  { icon: Users, value: "Millions", label: "Of developers building with Next.js" },
  { icon: Globe, value: "Global", label: "Trusted by the largest companies" },
];

function Showcase() {
  const [shows, setShows] = useState([]);
  const [active, setActive] = useState(0);
  useEffect(() => { base44.entities.Showcase.list("order", 10).then(setShows).catch(() => {}); }, []);
  const items = shows.length > 0 ? shows : showcaseFallback;
  const list = items || [];
  const current = list[active] || list[0];

  return (
    <div>
      <section className="relative overflow-hidden bg-background min-h-[40vh] flex items-center">
        <div className="absolute -top-24 right-1/4 w-[480px] h-[480px] bg-primary/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[380px] h-[380px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-24 left-[10%] w-4 h-4 rounded-full border border-primary/40 pointer-events-none" style={{ animation: "floatA 8s ease-in-out infinite" }} />
        <div className="absolute bottom-16 right-[12%] w-3 h-3 rounded-full bg-primary/40 pointer-events-none" style={{ animation: "floatC 9s ease-in-out 3s infinite" }} />
        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-tighter leading-[1.02] text-foreground max-w-2xl">
              The framework of choice <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">when it matters</span>
            </h1>
            <p className="mt-5 max-w-xl text-foreground/70">Explore how the world's biggest brands ship fast, resilient experiences with Next.js.</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatedElement className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xl shadow-primary/10">
              {current && <img src={current.image_url} alt={current.name} className="w-full aspect-[4/3] object-cover object-top transition-all duration-500" />}
              <div className="p-5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-foreground">{current?.name}</div>
                  <div className="text-sm text-foreground/70">{current?.tagline}</div>
                </div>
                <Button size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground">Visit <ArrowUpRight className="w-4 h-4 ml-1" /></Button>
              </div>
            </div>
          </AnimatedElement>
          <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
            {list.map((s, i) => (
              <button
                key={s.id || s.name}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg min-w-[220px] lg:min-w-0 ${i === active ? "border-primary bg-card shadow-lg shadow-primary/20" : "border-border bg-card/60"}`}
              >
                <img src={s.image_url} alt="" className="w-16 h-12 rounded-md object-cover object-top" />
                <span>
                  <span className="block font-semibold text-foreground text-sm">{s.name}</span>
                  <span className="block text-xs text-foreground/70 line-clamp-1">{s.tagline}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-background py-20 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <AnimatedElement key={s.label} delay={i * 100}>
              <div className="h-full rounded-2xl border border-border bg-card/70 backdrop-blur-xl p-8 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.3)] transition-all duration-500">
                <s.icon className="w-6 h-6 text-primary" />
                <div className="mt-6 text-4xl font-semibold tracking-tighter text-foreground">{s.value}</div>
                <p className="mt-2 text-sm text-foreground/70">{s.label}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </section>

      <section className="relative bg-muted py-24 overflow-hidden">
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[260px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <AnimatedElement>
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tighter text-foreground">Join them. Ship with Next.js.</h2>
            <Button className="relative overflow-hidden mt-8 rounded-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-primary/30 px-8 h-11">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/25 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
              <span className="relative">Get started</span>
            </Button>
          </div>
        </AnimatedElement>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/Showcase")({ component: Showcase });
