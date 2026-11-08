import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const COMMAND = "npx create-onenex-app@latest";

const LINES = [
  { kind: "cmd", text: COMMAND },
  { kind: "ok", text: "✔ Framework detected            react" },
  { kind: "ok", text: "✔ Generated 12 routes from app/" },
  { kind: "ok", text: "✔ Created 3 server functions" },
  { kind: "out", text: "Preview      http://localhost:3000" },
  { kind: "out", text: "Deployment   ready in 4.2s" },
];

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(LINES.length);
      return;
    }
    const id = setInterval(() => {
      setVisible((count) => {
        if (count >= LINES.length) {
          clearInterval(id);
          return count;
        }
        return count + 1;
      });
    }, 420);
    return () => clearInterval(id);
  }, []);

  const copy = () => {
    try {
      navigator.clipboard?.writeText(COMMAND);
    } catch {
      /* clipboard may be blocked */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background">
      <div className="vgrid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[600px] -translate-x-1/2 rounded-full bg-primary/12 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-24">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3 py-1 text-[11px] font-medium tracking-wide text-muted-foreground backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Solutions · Design engineering
          </span>

          <h1 className="mt-6 text-[40px] font-semibold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-[64px] lg:text-[76px]">
            Design, meet <span className="text-muted-foreground">Engineering.</span>
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            orevrkplus gives design engineers the whole stack — file-based routing, server functions and preview
            deployments — so the moment of inspiration ships without waiting on configuration.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              asChild
              className="h-11 rounded-full bg-primary px-6 text-[14px] font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90"
            >
              <a href="#features">
                Start building
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-border/80 bg-background px-6 text-[14px] font-semibold text-foreground transition-all hover:scale-[1.02] hover:bg-secondary"
            >
              <Link to="/ai">Ask the assistant</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto mt-12 max-w-3xl sm:mt-16">
          <div className="overflow-hidden rounded-2xl border border-border/80 bg-card/70 shadow-[0_50px_120px_-50px_hsl(var(--primary)/0.45)] backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-border/70 bg-muted/40 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="ml-2 truncate font-mono text-[11px] text-muted-foreground">~/my-app</span>
              <button
                type="button"
                onClick={copy}
                aria-label="Copy install command"
                className="ml-auto flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>

            <div className="overflow-x-auto px-4 py-4 font-mono text-[11.5px] leading-6 sm:px-5 sm:py-5 sm:text-[12.5px]">
              {LINES.slice(0, visible).map((line) => (
                <p key={line.text} className="whitespace-pre">
                  {line.kind === "cmd" ? (
                    <>
                      <span className="text-primary">$ </span>
                      <span className="text-foreground">{line.text}</span>
                    </>
                  ) : (
                    <span className={line.kind === "ok" ? "text-foreground/80" : "text-muted-foreground"}>
                      {line.text}
                    </span>
                  )}
                </p>
              ))}
              {visible >= LINES.length && <span className="ai-caret" aria-hidden="true" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}