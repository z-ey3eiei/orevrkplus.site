import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Code2, FolderOpen, Package, Terminal, Upload, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/home/Hero";
import FaqSection from "@/components/home/FaqSection";
import brand from "@/lib/brand.config";

const features = [
  { icon: Terminal, title: "One command to begin", description: "Create your project with create-ovk-app, install dependencies, and start building." },
  { icon: Code2, title: "Your code. Your canvas.", description: "Edit src/main.js and src/style.css. Start with the OREVRK PLUS theme and make it your own." },
  { icon: Zap, title: "Powered by Vite", description: "Develop at localhost:3000 with hot reload. Preview your production build at localhost:4173." },
  { icon: FolderOpen, title: "A clear project structure", description: "Keep editable code in src/ and static assets in public/. Build your finished website into dist/." },
  { icon: Package, title: "Ready to hand off", description: "Run npm run export to build and package your website as a <project-name>-dist.zip archive." },
  { icon: Upload, title: "Choose your host", description: "Publish dist/ to a static host, or use the included Cloudflare deployment command." },
];
const steps = [
  { title: "Create your project", text: "Use Node.js 20 or newer. Choose a new directory for your website.", command: brand.command },
  { title: "Make it yours", text: "Open localhost:3000 and edit the files in src/. Changes reload while you work.", command: "cd my-app\nnpm install\nnpm run dev" },
  { title: "Build the real thing", text: "Generate dist/, then preview the files you will publish at localhost:4173.", command: "npm run build\nnpm run preview" },
];

function Home() {
  return (
    <div className="bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Hero />
      <section id="features" aria-labelledby="features-heading" className="scroll-mt-24 border-b border-border/60 px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Small start. Room to build.</p>
          <h2 id="features-heading" className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">Everything in its right place.</h2>
          <p className="mt-5 max-w-xl leading-7 text-muted-foreground">A focused starter for your website, with a familiar workflow from the first edit to the final files.</p>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <article key={title} className="bg-card p-7 sm:p-8">
                <Icon className="mb-8 h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="get-started" aria-labelledby="start-heading" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">From terminal to browser</p>
            <h2 id="start-heading" className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Get started.<br /><span className="text-muted-foreground">Keep creating.</span></h2>
            <p className="mt-6 max-w-sm leading-7 text-muted-foreground">Three steps to your first build. The development server is your workspace; dist/ is the website you publish.</p>
            <a href={`${brand.links.github}#readme`} className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline">Read the setup guide <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
          <ol className="min-w-0 space-y-8">
            {steps.map((step, index) => (
              <li key={step.title} className="flex min-w-0 gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border font-mono text-xs text-muted-foreground">{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
                  <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-card p-4 text-xs leading-7 sm:text-sm"><code>{step.command}</code></pre>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section id="deploy" aria-labelledby="deploy-heading" className="scroll-mt-24 border-y border-border bg-card px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Built here. Hosted anywhere.</p>
            <h2 id="deploy-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Your website, beyond localhost.</h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">Upload dist/ to Netlify, Vercel, GitHub Pages, Cloudflare, or your own static host. Export a ZIP when you need to share the finished files.</p>
            <Button asChild variant="outline" className="mt-6 h-11"><a href={`${brand.links.github}#readme`}>Deployment guide <ArrowRight className="h-4 w-4" aria-hidden="true" /></a></Button>
          </div>
          <div className="min-w-0 rounded-xl border border-border bg-background p-6">
            <p className="text-xs text-muted-foreground">Build and package your website</p>
            <pre className="mt-3 overflow-x-auto text-sm leading-8"><code>npm run export</code></pre>
            <div className="my-5 h-px bg-border" />
            <p className="text-xs text-muted-foreground">Or deploy to Cloudflare after authenticating</p>
            <pre className="mt-3 overflow-x-auto text-sm leading-8"><code>npm run deploy:cloudflare</code></pre>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">Cloudflare deployment requires your account and Wrangler authentication.</p>
          </div>
        </div>
      </section>
      <FaqSection />
      <section className="border-t border-border px-4 py-20 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Make something yours.</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 px-6"><a href="#get-started">Start building <ArrowRight className="h-4 w-4" aria-hidden="true" /></a></Button>
            <Button asChild variant="outline" className="h-12 px-6"><a href={brand.links.github}>View on GitHub</a></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    links: [
      { rel: "alternate", type: "text/markdown", href: "/index.md" },
      { rel: "describedby", href: "/llms.txt" },
    ],
  }),
});
