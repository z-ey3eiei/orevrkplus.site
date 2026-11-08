import { useState } from "react";
import { Activity, ArrowUp, Wifi, WifiOff } from "lucide-react";
import { useActivity } from "./ActivityProvider";

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export default function StatusBar() {
  const { events, record, progress, online } = useActivity();
  const [open, setOpen] = useState(false);
  const latest = events[0];

  const toggle = () => {
    setOpen((prev) => {
      if (!prev) record("status_bar_open", "Opened activity log");
      return !prev;
    });
  };

  const toTop = () => {
    record("status_bar_top", "Returned to top");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      {open && (
        <div className="border-t border-border/80 bg-background/95 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 max-h-[42vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Live activity
              </span>
              <span className="text-[11px] tabular-nums text-muted-foreground">{Math.round(progress * 100)}%</span>
            </div>
            {events.length === 0 ? (
              <p className="py-3 text-sm text-muted-foreground">Waiting for the first interaction.</p>
            ) : (
              <ul className="divide-y divide-border/60">
                {events.map((event) => (
                  <li key={event.id} className="flex items-center justify-between gap-4 py-2.5">
                    <span className="text-sm text-foreground/85 truncate">{event.label}</span>
                    <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{formatTime(event.at)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="relative border-t border-border/80 bg-background/80 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
        <div className="absolute inset-x-0 top-0 h-px bg-border/70">
          <div
            className="h-px bg-primary transition-[width] duration-150 ease-out"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        <div className="mx-auto flex h-12 max-w-7xl items-center gap-3 px-4 sm:px-6">
          <span
            className={`relative flex h-2 w-2 shrink-0 rounded-full ${online ? "bg-primary" : "bg-muted-foreground"}`}
          >
            {online && (
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" aria-hidden="true" />
            )}
          </span>
          <p className="min-w-0 truncate text-[12.5px] text-foreground/70">
            {latest ? latest.label : "Ready"}
          </p>

          <div className="ml-auto flex items-center gap-1">
            <span className="hidden items-center gap-1.5 pr-2 text-[11px] font-medium text-muted-foreground sm:flex">
              {online ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
              {online ? "Online" : "Offline"}
            </span>
            <button
              type="button"
              onClick={toggle}
              aria-pressed={open}
              aria-label={open ? "Hide activity" : "Show activity"}
              className={`inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-[12px] font-medium transition-all duration-200 active:scale-95 ${
                open ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted hover:text-foreground"
              }`}
            >
              <Activity className="h-4 w-4" />
              <span>Activity</span>
            </button>
            <button
              type="button"
              onClick={toTop}
              aria-label="Back to top"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-95"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}