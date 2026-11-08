import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { fetchCommunityNews } from "@/lib/community-news.server";

export const getServerInfo = createServerFn({ method: "GET" }).handler(async () => ({
  renderedAt: new Date().toISOString(),
}));

export const getCommunityNews = createServerFn({ method: "GET" }).handler(() => fetchCommunityNews());

export const listRegistryPackages = createServerFn({ method: "GET" }).handler(async ({ context }) => {
  const base44 = context.getBase44();
  const [packages, counts] = await Promise.all([
    base44.entities.NpmPackage.list("-created_date", 100),
    base44.entities.NpmVersion.aggregate({ query: {}, groupBy: "package_name" }),
  ]);
  const countsByName = Object.fromEntries((counts.rows || []).map((row) => [row.package_name, row.count]));
  return packages.map((pkg) => ({
    name: pkg.name,
    description: pkg.description || "",
    latest_version: pkg.latest_version || "",
    keywords: pkg.keywords || [],
    version_count: countsByName[pkg.name] || 0,
  }));
});

const AskInput = z.object({
  message: z.string().min(1).max(1500),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(1500) }))
    .max(8)
    .optional(),
  fileUrls: z.array(z.string().max(2000)).max(3).optional(),
});

const ASSISTANT_BRIEF = `You are the orevrkplus assistant, a documentation helper for orevrkplus — a full-stack React framework with file-based routing, server functions and streaming built in.
Answer only about orevrkplus, React, app architecture, deployment and web performance. If a question is off topic, say briefly that you cover orevrkplus and framework topics.
Keep answers under 120 words, plain text, no markdown headings or code fences; short lines starting with "- " are fine.`;

export const askAssistant = createServerFn({ method: "POST" })
  .validator(AskInput)
  .handler(async ({ data, context }) => {
    const history = (data.history ?? [])
      .map((turn) => `${turn.role === "user" ? "User" : "Assistant"}: ${turn.content}`)
      .join("\n");

    const prompt = [
      ASSISTANT_BRIEF,
      history ? `Conversation so far:\n${history}` : null,
      `User: ${data.message}`,
      "Assistant:",
    ]
      .filter(Boolean)
      .join("\n\n");

    const reply = await context.getBase44().asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      ...(data.fileUrls?.length ? { file_urls: data.fileUrls } : {}),
    });

    return { reply: String(reply ?? "").trim() };
  });