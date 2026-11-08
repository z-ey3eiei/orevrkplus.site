import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, MessagesSquare } from "lucide-react";
import { getCommunityNews } from "@/lib/server-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { track } from "@/lib/tracking";

const COMMUNITY_URL = "https://community.openai.com/latest";

function timeAgo(value) {
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) return "";
  const minutes = Math.max(1, Math.round((Date.now() - time) / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(time).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

export default function CommunityNews() {
  const fetchNews = useServerFn(getCommunityNews);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchNews()
      .then((result) => alive && setItems(Array.isArray(result) ? result : []))
      .catch(() => alive && setItems([]))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [fetchNews]);

  return (
    <section id="community" className="bg-background py-24 sm:py-28 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <MessagesSquare className="h-3.5 w-3.5 text-primary" />
              OpenAI Community
            </span>
            <h2 className="mt-4 max-w-xl text-[32px] font-semibold leading-[1.08] tracking-tighter text-foreground sm:text-[40px]">
              Latest from the developer community
            </h2>
          </div>
          <a
            href={COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("community_visit", { source: "news_section" })}
            className="inline-flex h-11 w-fit items-center gap-1.5 rounded-full border border-border/80 px-5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:border-primary/40 hover:text-foreground active:scale-95"
          >
            Visit community <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="rounded-xl border border-border/70 bg-card/40 p-5">
                  <Skeleton className="h-5 w-4/5" />
                  <Skeleton className="mt-3 h-3 w-1/3" />
                </div>
              ))
            : items.map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("community_topic_open", { topic: item.title.slice(0, 60) })}
                  className="group flex flex-col justify-between gap-5 rounded-xl border border-border/70 bg-card/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-card active:scale-[0.995] sm:p-6"
                >
                  <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-foreground/90 transition-colors group-hover:text-foreground">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11.5px] text-muted-foreground">
                    <span className="rounded-full border border-border/70 px-2 py-0.5">{item.category}</span>
                    {item.pubDate && <span className="tabular-nums">{timeAgo(item.pubDate)}</span>}
                    <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </div>
                </a>
              ))}
        </div>

        {!loading && items.length === 0 && (
          <p className="mt-8 text-sm text-muted-foreground">
            Community topics are unavailable right now —{" "}
            <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
              open the community
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}