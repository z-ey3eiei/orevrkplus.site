import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { track } from "@/lib/tracking";

const ActivityContext = createContext(null);
const MAX_EVENTS = 8;
const DEPTHS = [25, 50, 75, 100];

const emptyActivity = { events: [], record: () => {}, progress: 0, online: true };

export function useActivity() {
  return useContext(ActivityContext) ?? emptyActivity;
}

/**
 * Watches what the visitor does (route changes, scroll depth, taps) and keeps a
 * small live feed of those events so the interface can react to them.
 */
export default function ActivityProvider({ children }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [events, setEvents] = useState([]);
  const [progress, setProgress] = useState(0);
  const [online, setOnline] = useState(true);
  const depthsFired = useRef(new Set());

  const record = useCallback((name, label, properties = {}) => {
    track(name, properties);
    setEvents((prev) =>
      [{ id: `${Date.now()}-${name}`, name, label, at: Date.now() }, ...prev].slice(0, MAX_EVENTS)
    );
  }, []);

  // Connection state
  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  // Route views
  useEffect(() => {
    depthsFired.current = new Set();
    record("page_view", `Viewed ${pathname}`, { path: pathname });
  }, [pathname, record]);

  // Scroll progress + depth milestones, sampled on animation frames
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const root = document.documentElement;
      const max = root.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(ratio);
      DEPTHS.forEach((depth) => {
        if (!depthsFired.current.has(depth) && ratio * 100 >= depth) {
          depthsFired.current.add(depth);
          record("scroll_depth", `Scrolled ${depth}%`, { depth });
        }
      });
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [record]);

  const value = useMemo(() => ({ events, record, progress, online }), [events, record, progress, online]);

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
}