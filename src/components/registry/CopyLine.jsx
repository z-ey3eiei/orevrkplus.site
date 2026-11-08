import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

export function useRegistryOrigin() {
  const [origin, setOrigin] = useState("https://captured-nextjsorg-922617b3.base44.app");
  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);
  return origin;
}

export default function CopyLine({ command, label }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    try {
      navigator.clipboard?.writeText(command);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="flex items-center gap-2 overflow-hidden rounded-lg border border-border/80 bg-background/70 px-3 py-2">
      {label ? (
        <span className="shrink-0 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
      ) : null}
      <code className="min-w-0 flex-1 truncate font-mono text-[11.5px] text-foreground/85">{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy command"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}