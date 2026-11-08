import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Search, ArrowRight, BookOpen, Rocket, Layers, Server, Zap, Terminal, Copy, Check } from "lucide-react";

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

const featureFallback = [
  { title: "Built-in Optimizations", description: "Automatic Image, Font, and Script Optimizations for improved UX and Core Web Vitals." },
  { title: "Dynamic HTML Streaming", description: "Instantly stream UI from the server, integrated with the App Router and React Suspense." },
  { title: "React Server Components", description: "Add components without sending additional client-side JavaScript." },
  { title: "Data Fetching", description: "Make your React component async and await your data." },
  { title: "Server Actions", description: "Run server code by calling a function. Skip the API." },
  { title: "Route Handlers", description: "Build API endpoints to securely connect with third-party services." },
];

const steps = [
  { icon: Terminal, title: "Create your app", cmd: "npx create-next-app@latest", text: "Scaffold a new project with TypeScript, Tailwind and the App Router in one command." },
  { icon: Layers, title: "Add routes and layouts", cmd: "app/dashboard/page.tsx", text: "Use the file system to define routes, nested layouts, and loading states." },
  { icon: Server, title: "Fetch data on the server", cmd: "const data = await getData()", text: "Make components async and await data directly, no client-side waterfalls." },
  { icon: Rocket, title: "Deploy", cmd: "vercel deploy", text: "Push to Git and ship globally with zero configuration." },
];

const faqs = [
  { q: "What is the App Router?", a: "The App Router is a file-system based router built on React Server Components, supporting layouts, streaming, and server actions." },
  { q: "Can I use Tailwind CSS?", a: "Yes. Next.js supports CSS Modules, Tailwind CSS, and popular community styling libraries out of the box." },
  { q: "How does rendering work?", a: "Choose static, dynamic, or Incremental Static Regeneration (ISR) on a per-page level for flexible caching." },
  { q: "Where can I deploy?", a: "Anywhere Node.js runs, or one-click on Vercel for the best developer experience." },
];

function Docs() {
  const [features, setFeatures] = useState([]);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(null);
  useEffect(() => { base44.entities.Feature.list("order", 20).then(setFeatures).catch(() => {}); }, []);
  const items = features.length > 0 ? features : featureFallback;
  const filtered = (items || []).filter((f) => (f.title + " " + f.description).toLowerCase().includes(query.toLowerCase()));
  const copy = (i, text) => {
    try { navigator.clipboard?.writeText(text); } catch (e) {}
    setCopied(i);
    setTimeout(() => setCopied(null), 1600);
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-background min-h-[40vh] flex items-center">
        <div className="absolute -top-24 left-1/4 w-[480px] h-[480px] bg-primary/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[380px] h-[380px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-[12%] w-4 h-4 rounded-full border border-primary/40 pointer-events-none" style={{ animation: "floatA 8s ease-in-out infinite" }} />
        <div className="absolute bottom-16 left-[10%] w-3 h-3 rounded-full bg-primary/40 pointer-events-none" style={{ animation: "floatB 6s ease-in-out 2s infinite" }} />
        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1 text-xs text-card-foreground mb-5">
              <BookOpen className="w-3.5 h-3.5 text-primary" /> Documentation
            </div>
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-tighter leading-[1.02] text-foreground max-w-2xl">
              Learn to build with <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">Next.js</span>
            </h1>
            <p className="mt-5 max-w-xl text-foreground/70">Guides, concepts, and API references to help you ship high-quality web applications faster.</p>
            <div className="mt-8 relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the docs…" className="pl-9 h-11 rounded-full bg-card/80 backdrop-blur border-border" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedElement>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-foreground">Core concepts</h2>
          </AnimatedElement>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((f, i) => (
              <AnimatedElement key={f.id || f.title} delay={(i % 3) * 80}>
                <a href="#" className="group block h-full rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.3)]">
                  <Zap className="w-5 h-5 text-primary mb-4" />
                  <div className="flex items-center gap-2 font-semibold text-foreground">{f.title}<ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{f.description}</p>
                </a>
              </AnimatedElement>
            ))}
            {filtered.length === 0 && <p className="text-foreground/70 col-span-full">No results for "{query}".</p>}
          </div>
        </div>
      </section>

      <section className="relative bg-background py-20 overflow-hidden">
        <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedElement>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-foreground">From zero to production</h2>
          </AnimatedElement>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <AnimatedElement key={s.title} delay={i * 100}>
                <div className="p-px rounded-xl bg-gradient-to-br from-primary/50 via-border to-accent/50 h-full">
                  <div className="rounded-xl bg-card p-6 h-full">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center">{i + 1}</span>
                      <s.icon className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">{s.title}</h3>
                    </div>
                    <p className="mt-3 text-sm text-foreground/70">{s.text}</p>
                    <div className="mt-4 flex items-center justify-between rounded-lg bg-secondary px-3 py-2">
                      <code className="font-mono text-xs text-foreground">{s.cmd}</code>
                      <button onClick={() => copy(i, s.cmd)} aria-label="Copy" className="p-1 hover:bg-muted rounded">
                        {copied === i ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-foreground/60" />}
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedElement>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-foreground text-center">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="mt-10 rounded-xl border border-border bg-card px-6">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-foreground">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-foreground/70">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedElement>
        </div>
      </section>

      <section className="relative bg-background py-24 overflow-hidden">
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[260px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <AnimatedElement>
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tighter text-foreground">Ready to start building?</h2>
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

export const Route = createFileRoute("/Docs")({ component: Docs, ssr: false });
