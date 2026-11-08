const FEED_URL = "https://community.openai.com/latest.rss";
const CACHE_MS = 10 * 60 * 1000;
const LIMIT = 4;

const FALLBACK = [
  {
    title: "ChatGPT Desktop Companion Robot: A Friendly AI on Your Desk",
    link: "https://community.openai.com/t/chatgpt-desktop-companion-robot-a-friendly-ai-on-your-desk/1412882",
    category: "Feature requests",
    author: "Ahmad Fahham",
    pubDate: "2026-11-04T22:25:19+00:00",
  },
  {
    title: "Research Collaboration Proposal: Context-Aware Proactive Engagement in ChatGPT",
    link: "https://community.openai.com/t/research-collaboration-proposal-context-aware-proactive-engagement-in-chatgpt/1412881",
    category: "Feature requests",
    author: "Samaneh Abolkheirian",
    pubDate: "2026-11-04T22:23:52+00:00",
  },
  {
    title: "A Global Collective Intelligence Network",
    link: "https://community.openai.com/t/imagine-a-world-in-which-different-artificial-intelligence-systems-could-collaborate-through-a-shared-global-knowledge-network/1412880",
    category: "Community",
    author: "Jiří Novotný",
    pubDate: "2026-11-04T22:21:11+00:00",
  },
];

let cache = { at: 0, items: [] };

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decode(value = "") {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match)
    .replace(/\s+/g, " ")
    .trim();
}

function pick(chunk, tag) {
  const match = chunk.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? decode(match[1]) : "";
}

function parseFeed(xml) {
  const blocks = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  return blocks
    .map((chunk) => ({
      title: pick(chunk, "title"),
      link: pick(chunk, "link"),
      category: pick(chunk, "category") || "Community",
      author: pick(chunk, "dc:creator"),
      pubDate: pick(chunk, "pubDate"),
    }))
    .filter((item) => item.title && item.link)
    .slice(0, LIMIT);
}

export async function fetchCommunityNews() {
  if (cache.items.length && Date.now() - cache.at < CACHE_MS) return cache.items;

  try {
    const response = await fetch(FEED_URL, {
      headers: { accept: "application/rss+xml, application/xml;q=0.9", "user-agent": "ONENEXT-News/1.0" },
    });
    if (!response.ok) throw new Error(`Feed responded ${response.status}`);

    const items = parseFeed(await response.text());
    if (!items.length) throw new Error("Feed contained no topics");

    cache = { at: Date.now(), items };
    return items;
  } catch {
    return cache.items.length ? cache.items : FALLBACK;
  }
}