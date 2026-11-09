import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box, Gauge, Github, Atom } from "lucide-react";
import Hero from "@/components/home/Hero";
import LogoStrip from "@/components/home/LogoStrip";
import DesignRows from "@/components/home/DesignRows";
import FaqSection from "@/components/home/FaqSection";
import CommunityNews from "@/components/news/CommunityNews";

// Inline keyframes and specific global styles to match the original
const KeyframesStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes floatA { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-20px) translateX(10px); } }
    @keyframes floatB { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-15px) scale(1.05); } }
    @keyframes floatC { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-25px) rotate(5deg); } }
    @keyframes sweep { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    .animate-sweep { background-size: 200% auto; animation: sweep 3s linear infinite; }
    
    .bg-grid-pattern {
      background-size: 40px 40px;
      background-image: 
        linear-gradient(to right, hsl(var(--border) / 0.5) 1px, transparent 1px),
        linear-gradient(to bottom, hsl(var(--border) / 0.5) 1px, transparent 1px);
    }
  `}} />
);

const AnimatedElement = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), delay);
        observer.unobserve(el);
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className || ""}`}>
      {children}
    </div>
  );
};

const featureFallback = [
  { title: "Built-in Optimizations", description: "Automatic Image, Font, and Script Optimizations for improved UX and Core Web Vitals." },
  { title: "Dynamic HTML Streaming", description: "Instantly stream UI from the server, integrated with the App Router and React Suspense." },
  { title: "React Server Components", description: "Add components without sending additional client-side JavaScript. Built on the latest React features." },
  { title: "Data Fetching", description: "Make your React component async and await your data. Next.js supports both server and client data fetching." },
  { title: "CSS Support", description: "Style your application with your favorite tools, including support for CSS Modules, Tailwind CSS, and popular community libraries." },
  { title: "Client and Server Rendering", description: "Flexible rendering and caching options, including Incremental Static Regeneration (ISR), on a per-page level." },
  { title: "Server Actions", description: "Run server code by calling a function. Skip the API. Then, easily revalidate cached data and update your UI in one network roundtrip." },
  { title: "Route Handlers", description: "Build API endpoints to securely connect with third-party services for handling auth or listening for webhooks." },
  { title: "Proxy", description: "Take control of the incoming request. Use code to define routing and access rules for authentication, experimentation, and internationalization." },
];

const templateFallback = [
  { name: "Next.js Boilerplate", description: "A Next.js application and a Serverless Function API Route.", repo: "examples/nextjs" },
  { name: "Chatbot", description: "A full-featured, hackable Next.js AI chatbot built by Vercel.", repo: "examples/chatbot" },
  { name: "Platforms Starter Kit", description: "A template for site builders and low-code tools.", repo: "vercel/platforms" },
  { name: "ISR Blog", description: "Incremental Static Regeneration blog with Next.js and WordPress.", repo: "examples/cms-wordpress" },
  { name: "Next.js Commerce", description: "Starter kit for high-performance ecommerce sites.", repo: "vercel/commerce" },
];

const showcaseFallback = [
  { name: "The Washington Post", tagline: "Effortless listening", image_url: "https://media.base44.com/images/public/6ae7693fcb65c519922617b3/dbea18e31_nextjs_org_preview-wapo_04195bfa.png" },
  { name: "Sonos", tagline: "Sonos product homepage", image_url: "https://media.base44.com/images/public/6ae7693fcb65c519922617b3/b3f3bca9d_nextjs_org_preview-sonos_3a7399e8.png" },
  { name: "Notion", tagline: "Notion product homepage", image_url: "https://media.base44.com/images/public/6ae7693fcb65c519922617b3/fa11856d6_nextjs_org_preview-notion_ad1e8497.png" },
  { name: "Dice", tagline: "Dice event discovery homepage", image_url: "https://media.base44.com/images/public/6ae7693fcb65c519922617b3/d62b45c0d_nextjs_org_preview-dice_28b7a11e.png" },
  { name: "Nike", tagline: "Nike product homepage", image_url: "https://media.base44.com/images/public/6ae7693fcb65c519922617b3/740f92e1f_nextjs_org_preview-nike_7a5da41f.png" },
];

// Decorative visual for feature 1 (Optimizations)
const VisualOptimizations = () => (
  <div className="w-full h-48 bg-background flex items-center justify-center p-6 relative overflow-hidden group-hover:bg-muted/30 transition-colors duration-500">
    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
    <div className="relative w-full h-full flex items-end justify-center gap-4 pb-4">
      <div className="w-1/4 h-[40%] bg-border/50 rounded-t-sm relative shadow-sm border border-border group-hover:h-[50%] transition-all duration-700 ease-out" />
      <div className="w-1/4 h-[70%] bg-primary/20 rounded-t-sm relative shadow-sm border border-primary/20 group-hover:h-[80%] transition-all duration-700 delay-100 ease-out">
        <div className="absolute top-2 left-2 text-[8px] font-mono text-primary/60">1.4MB/s</div>
      </div>
      <div className="w-1/4 h-[50%] bg-border/50 rounded-t-sm relative shadow-sm border border-border group-hover:h-[60%] transition-all duration-700 delay-200 ease-out" />
    </div>
  </div>
);

// Decorative visual for feature 2 (Streaming)
const VisualStreaming = () => (
  <div className="w-full h-48 bg-background flex items-center justify-center p-6 relative overflow-hidden group-hover:bg-muted/30 transition-colors duration-500">
    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
    <div className="w-[85%] h-[80%] bg-card border border-border rounded-md shadow-sm flex flex-col overflow-hidden group-hover:shadow-md transition-shadow">
      <div className="h-4 border-b border-border bg-muted flex items-center px-2 gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-border" />
        <div className="w-1.5 h-1.5 rounded-full bg-border" />
        <div className="w-1.5 h-1.5 rounded-full bg-border" />
      </div>
      <div className="flex-1 p-3 flex gap-3">
        <div className="w-1/3 h-full bg-muted/50 rounded-sm" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="w-full h-1/2 bg-primary/10 rounded-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:animate-[sweep_2s_ease-in-out_infinite]" />
          </div>
          <div className="w-2/3 h-1/4 bg-muted/50 rounded-sm" />
        </div>
      </div>
    </div>
  </div>
);

// Decorative visual for feature 3 (Server Components)
const VisualServerComponents = () => (
  <div className="w-full h-48 bg-background flex items-center justify-center p-6 relative overflow-hidden group-hover:bg-muted/30 transition-colors duration-500">
    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
    <svg className="w-full h-full" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Lines */}
      <path d="M100 20 L60 60 M100 20 L140 60 M60 60 L40 100 M60 60 L80 100 M140 60 L120 100 M140 60 L160 100" stroke="hsl(var(--border))" strokeWidth="1.5" className="group-hover:stroke-primary/40 transition-colors duration-500" />
      {/* Nodes */}
      <circle cx="100" cy="20" r="8" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" className="group-hover:fill-primary/20 transition-colors duration-500" />
      <circle cx="60" cy="60" r="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
      <circle cx="140" cy="60" r="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
      <circle cx="40" cy="100" r="5" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <circle cx="80" cy="100" r="5" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <circle cx="120" cy="100" r="5" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <circle cx="160" cy="100" r="5" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" className="group-hover:fill-primary/20 transition-colors duration-500 delay-100" />
    </svg>
  </div>
);

function FeaturesSection() {
  const [features, setFeatures] = useState([]);
  
  useEffect(() => { 
    base44.entities.Feature.list("order", 20)
      .then(res => setFeatures(res.length ? res : featureFallback))
      .catch(() => setFeatures(featureFallback)); 
  }, []);

  const items = features.length > 0 ? features : featureFallback;
  const visualItems = items.slice(0, 3);
  const textItems = items.slice(3, 8); // Take 5 for text items to make room for Next.js 16 block at the end
  const visuals = [VisualOptimizations, VisualStreaming, VisualServerComponents];

  return (
    <section id="features" className="bg-background py-24 sm:py-32 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <h2 className="text-4xl sm:text-[40px] font-semibold tracking-tighter leading-[1.05] max-w-lg text-foreground mb-16">
            Everything you need to build great products on the web
          </h2>
        </AnimatedElement>
        
        {/* Top 3 Visual Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {visualItems.map((f, i) => {
            const Visual = visuals[i] || (() => <div className="w-full h-48 bg-muted" />);
            return (
              <AnimatedElement key={f.id || f.title} delay={i * 100}>
                <a href="#" className="group block h-full rounded-xl border border-border/80 bg-card/50 overflow-hidden hover:bg-card hover:shadow-xl hover:shadow-primary/5 hover:border-border transition-all duration-500 hover:-translate-y-1">
                  <div className="border-b border-border/60">
                    <Visual />
                  </div>
                  <div className="p-6">
                    <h3 className="flex items-center gap-2 font-semibold text-foreground text-[15px]">
                      {f.title}
                      <ArrowRight className="w-3.5 h-3.5 text-foreground/40 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </h3>
                    <p className="mt-2.5 text-[14px] text-foreground/60 leading-relaxed font-medium">
                      {f.description}
                    </p>
                  </div>
                </a>
              </AnimatedElement>
            );
          })}
        </div>

        {/* Remaining Text Features + Next.js 16 CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {textItems.map((f, i) => (
            <AnimatedElement key={f.id || f.title} delay={(i % 3) * 80}>
              <a href="#" className="group block h-full rounded-xl border border-transparent hover:border-border bg-transparent hover:bg-card/50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.03]">
                <h3 className="flex items-center gap-2 font-semibold text-foreground text-[15px]">
                  {f.title}
                  <ArrowRight className="w-3.5 h-3.5 text-foreground/40 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </h3>
                <p className="mt-2.5 text-[14px] text-foreground/60 leading-relaxed font-medium">
                  {f.description}
                </p>
              </a>
            </AnimatedElement>
          ))}
          
          {/* Next.js 16 Solid Block CTA */}
          <AnimatedElement delay={160}>
            <a href="#" className="group relative block h-full overflow-hidden rounded-xl bg-primary text-primary-foreground p-8 transition-all duration-500 hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-primary/30">
              {/* Animated hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
                <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                  Next.js 16 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <p className="text-[15px] font-medium text-primary-foreground/90 leading-snug">
                  The power of full-stack to the frontend.<br />
                  <span className="underline underline-offset-4 opacity-80 group-hover:opacity-100 transition-opacity">Read the release notes.</span>
                </p>
              </div>
            </a>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}

function ToolingSection() {
  const tools = [
    { name: "React", icon: Atom, desc: "The library for web and native user interfaces. Next.js is built on the latest React features, including Server Components and Actions." },
    { name: "Turbopack", icon: Box, desc: "An incremental bundler optimized for JavaScript and TypeScript, written in Rust, and built into Next.js." },
    { name: "Speedy Web Compiler", icon: Gauge, desc: "An extensible Rust-based platform for the next generation of fast developer tools, and can be used for both compilation and minification." },
  ];

  return (
    <section className="bg-muted/30 py-24 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <h2 className="text-[32px] sm:text-[40px] font-semibold tracking-tighter leading-[1.05] max-w-lg text-foreground mb-14">
            Built on a foundation of fast, production-grade tooling
          </h2>
        </AnimatedElement>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((t, i) => (
            <AnimatedElement key={t.name} delay={i * 120}>
              <a href="#" className="group block h-full rounded-xl border border-border/80 bg-background/50 backdrop-blur-sm p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:border-border hover:bg-background">
                <div className="mb-6 w-10 h-10 flex items-center justify-center rounded-lg bg-foreground/5 text-background group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                  <t.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground flex items-center gap-2 text-[15px]">
                  {t.name}
                  <ArrowRight className="w-3.5 h-3.5 text-foreground/40 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </h3>
                <p className="mt-3 text-[14px] text-foreground/60 leading-relaxed font-medium">{t.desc}</p>
              </a>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseSection() {
  const [shows, setShows] = useState([]);
  
  useEffect(() => { 
    base44.entities.Showcase.list("order", 10)
      .then(res => setShows(res.length ? res : showcaseFallback))
      .catch(() => setShows(showcaseFallback)); 
  }, []);

  const items = shows.length > 0 ? shows : showcaseFallback;
  
  // Custom layout mapping based on screenshot
  // Screenshot top right: 2 small images (index 0, 1)
  // Screenshot bottom row: 3 varied images (index 2, 3, 4)
  const topImages = items.slice(0, 2);
  const bottomImages = items.slice(2, 5);

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-6">
          <AnimatedElement className="lg:col-span-5 pb-8 lg:pb-0">
            <h2 className="text-4xl sm:text-[48px] font-semibold tracking-tighter leading-[1.05] text-foreground">
              The framework of choice <br />when it matters
            </h2>
          </AnimatedElement>
          
          <div className="lg:col-span-7 grid grid-cols-2 gap-6">
            {topImages.map((s, i) => (
              <AnimatedElement key={s.id || s.name} delay={i * 100}>
                <a href="#" aria-label={s.name} className="block overflow-hidden rounded-xl border border-border/80 bg-card hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 group">
                  <img src={s.image_url} alt={s.tagline} className="w-full aspect-[4/3] object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
                </a>
              </AnimatedElement>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Notion (Large Left) */}
          {bottomImages[0] && (
            <AnimatedElement className="md:col-span-5" delay={150}>
              <a href="#" className="block overflow-hidden rounded-xl border border-border/80 bg-card hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 group h-full">
                <img src={bottomImages[0].image_url} alt={bottomImages[0].tagline} className="w-full h-full aspect-square md:aspect-auto object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
              </a>
            </AnimatedElement>
          )}
          
          {/* Dice (Tall Middle) */}
          {bottomImages[1] && (
            <AnimatedElement className="md:col-span-3" delay={200}>
              <a href="#" className="block overflow-hidden rounded-xl border border-border/80 bg-card hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 group h-full">
                <img src={bottomImages[1].image_url} alt={bottomImages[1].tagline} className="w-full h-full aspect-[3/4] md:aspect-auto object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
              </a>
            </AnimatedElement>
          )}
          
          {/* Nike (Square Right) */}
          {bottomImages[2] && (
            <AnimatedElement className="md:col-span-4" delay={250}>
              <a href="#" className="block overflow-hidden rounded-xl border border-border/80 bg-card hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 group h-full">
                <img src={bottomImages[2].image_url} alt={bottomImages[2].tagline} className="w-full h-full aspect-[4/3] md:aspect-auto object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
              </a>
            </AnimatedElement>
          )}
        </div>
        
        <AnimatedElement className="mt-16 text-center lg:text-left">
          <p className="text-xl sm:text-[22px] text-foreground/70 max-w-2xl font-medium tracking-tight leading-snug">
            For <strong className="text-foreground font-semibold">performance, efficiency and developer experience</strong>. Next.js is trusted by some of the biggest names on the web.
          </p>
        </AnimatedElement>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const quotes = [
    { 
      brand: "SONOS", 
      text: "It's just a pity we didn't go sooner. Next.js and Vercel make our developers happier, make us go to market quicker, and let us move with confidence.", 
      who: "Jonathan Lemon", 
      role: "Software Engineering Manager",
      icon: null
    },
    { 
      brand: "Notion", 
      text: "With Next.js, we now consistently average 0.09 or lower for Cumulative Layout Shift, placing our site in the top tier for user experience and Core Web Vitals.", 
      who: "", 
      role: "Senior Software Engineer, Frontend",
      icon: Box
    },
  ];

  return (
    <section className="bg-muted/20 py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {quotes.map((q, i) => (
            <AnimatedElement key={q.brand} delay={i * 150} className="flex flex-col items-center text-center">
              <div className="mb-8 flex items-center justify-center h-10">
                {q.icon ? (
                  <div className="flex items-center gap-2 text-foreground/80 font-semibold text-2xl tracking-tight">
                    <q.icon className="w-6 h-6" /> {q.brand}
                  </div>
                ) : (
                  <div className="text-2xl tracking-[0.2em] font-bold text-foreground/80 font-sans">
                    {q.brand}
                  </div>
                )}
              </div>
              
              <blockquote className="text-[22px] sm:text-[26px] font-medium tracking-tight leading-[1.3] text-foreground max-w-lg mb-8">
                “{q.text}”
              </blockquote>
              
              <div className="mt-auto flex gap-3 text-sm text-foreground/60 font-medium">
                {q.who && <span className="text-foreground font-semibold">{q.who}</span>}
                <span>{q.role}</span>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function TemplatesSection() {
  const [templates, setTemplates] = useState([]);
  
  useEffect(() => { 
    base44.entities.Template.list("order", 10)
      .then(res => setTemplates(res.length ? res : templateFallback))
      .catch(() => setTemplates(templateFallback)); 
  }, []);
  
  const items = templates.length > 0 ? templates : templateFallback;
  const displayItems = items.slice(0, 4); // Show 4 to match 2x2 grid in screenshot

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
        
        <AnimatedElement className="lg:col-span-4 sticky top-32">
          <h2 className="text-[40px] sm:text-[48px] font-semibold tracking-tighter leading-[1.05] text-foreground mb-6">
            Get started <br />in seconds
          </h2>
          <p className="text-base text-foreground/60 max-w-sm mb-10 font-medium leading-relaxed">
            Jumpstart your Next.js development with pre-built solutions from Vercel and our community.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6 font-semibold transition-all hover:scale-105 shadow-md shadow-primary/20">
              Deploy Now
            </Button>
            <Button variant="outline" className="rounded-full h-11 px-6 font-semibold border-border/80 hover:bg-muted transition-all hover:scale-105">
              All templates
            </Button>
          </div>
        </AnimatedElement>
        
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {displayItems.map((t, i) => (
            <AnimatedElement key={t.id || t.name} delay={i * 100}>
              <a href="#" className="group relative flex h-full min-h-[180px] flex-col justify-between rounded-xl border border-border/80 bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-black/5 overflow-hidden">
                {/* Decorative cut-corner illusion (Next.js style) */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-background border-b border-l border-border/80 group-hover:border-primary/30 transition-colors z-10" 
                     style={{}} />
                
                <div className="relative z-20">
                  <h3 className="font-semibold text-foreground text-[16px] mb-2">{t.name}</h3>
                  <p className="text-[14px] text-foreground/60 leading-relaxed font-medium">{t.description}</p>
                </div>
                
                <div className="mt-8 flex items-center gap-2 text-[13px] font-mono text-foreground/50 group-hover:text-foreground/80 transition-colors">
                  <Github className="w-4 h-4" /> {t.repo}
                </div>
              </a>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="bg-background py-32 border-t border-border/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      
      <AnimatedElement>
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10">
          <h2 className="text-[48px] sm:text-[56px] font-bold tracking-tighter text-foreground leading-tight">
            Ready to deploy?
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-7 font-semibold transition-all hover:scale-105 shadow-lg shadow-primary/20">
              Get started
            </Button>
            <Button variant="outline" className="rounded-full h-11 px-7 font-semibold border-border/80 hover:bg-muted transition-all hover:scale-105 bg-background">
              Learn Next.js
            </Button>
          </div>
        </div>
      </AnimatedElement>
    </section>
  );
}

function Home() {
  return (
    <div className="bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <KeyframesStyles />
      <Hero />
      <LogoStrip />
      <DesignRows />
      <FeaturesSection />
      <ToolingSection />
      <ShowcaseSection />
      <TestimonialsSection />
      <TemplatesSection />
      <CommunityNews />
      <FaqSection />
      <CtaSection />
    </div>
  );
}

export const Route = createFileRoute("/")({ component: Home });