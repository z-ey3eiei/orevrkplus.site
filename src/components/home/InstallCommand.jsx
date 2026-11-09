import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import brand from "@/lib/brand.config";

export default function InstallCommand() {
  const [status, setStatus] = useState("idle");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(brand.command);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    timer.current = setTimeout(() => setStatus("idle"), 3000);
  };
  return (
    <div>
      <div className="flex min-w-0 items-center gap-3 rounded-lg border border-border bg-card p-3 sm:p-4">
        <span className="text-muted-foreground" aria-hidden="true">$</span>
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap py-1 text-xs sm:text-sm">{brand.command}</code>
        <button type="button" onClick={copy} aria-label={status === "copied" ? "Install command copied" : "Copy install command"} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          {status === "copied" ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
      <p role="status" className="mt-2 min-h-5 text-xs text-muted-foreground">{status === "copied" ? "Command copied." : status === "error" ? "Could not copy. Select the command and copy it manually." : "Run this in your terminal to create my-app."}</p>
    </div>
  );
}
