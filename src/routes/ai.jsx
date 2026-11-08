import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { askAssistant } from "@/lib/server-fns";
import AiComposer from "@/components/chat/AiComposer";
import ChatThread from "@/components/chat/ChatThread";
import { useActivity } from "@/components/system/ActivityProvider";

const SUGGESTIONS = [
  "How do I add a server function in ONENEXT?",
  "Explain file-based routing in two lines",
  "Why is ONENEXT fast on mobile?",
];

function AiPage() {
  const ask = useServerFn(askAssistant);
  const { record } = useActivity();
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);
  const counter = useRef(0);

  const nextId = () => {
    counter.current += 1;
    return `m${counter.current}`;
  };

  const send = async ({ text, files }) => {
    if (busy) return;
    const question = (text || "Summarise the attached file.").slice(0, 1500);
    const history = messages
      .filter((message) => message.content)
      .slice(-6)
      .map(({ role, content }) => ({ role, content: content.slice(0, 1500) }));
    const assistantId = nextId();

    setBusy(true);
    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: "user", content: question, attachments: files.map((file) => file.name) },
      { id: assistantId, role: "assistant", content: "", status: "thinking" },
    ]);
    record("ai_message_sent", `Asked the assistant: ${question.slice(0, 42)}`);

    try {
      const fileUrls = [];
      for (const file of files.slice(0, 3)) {
        const { file_uri } = await base44.integrations.Core.UploadPrivateFile({ file });
        const { signed_url } = await base44.integrations.Core.CreateFileSignedUrl({ file_uri, expires_in: 300 });
        fileUrls.push(signed_url);
      }

      const result = await ask({ data: { message: question, history, fileUrls } });
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantId
            ? {
                ...message,
                status: "done",
                content: result.reply || "I could not find an answer for that. Try rephrasing it.",
              }
            : message
        )
      );
      record("ai_reply_received", "Assistant replied");
    } catch {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantId
            ? { ...message, status: "done", content: "The assistant is unavailable right now. Please try again in a moment." }
            : message
        )
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-background">
      <div className="ai-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-28 left-1/2 h-[420px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          ONENEXT Assistant
        </span>
        <h1 className="mt-4 max-w-xl text-[34px] font-semibold leading-[1.06] tracking-tighter text-foreground sm:text-[44px]">
          Ask the framework anything
        </h1>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-foreground/70">
          Routing, data fetching, rendering or deployment — the assistant answers from the ONENEXT docs, and you can
          attach a file for context.
        </p>

        {messages.length === 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => send({ text: suggestion, files: [] })}
                className="group inline-flex items-center gap-1.5 rounded-full border border-border/80 px-4 py-2 text-[12.5px] font-medium text-foreground/70 transition-all duration-200 hover:border-primary/40 hover:text-foreground active:scale-95"
              >
                {suggestion}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
        )}

        <div className="mt-8 overflow-hidden rounded-3xl border border-border/80 bg-background/70 backdrop-blur-sm">
          {messages.length > 0 && (
            <div className="max-h-[46vh] overflow-y-auto">
              <ChatThread messages={messages} />
            </div>
          )}
          <div className="border-t border-border/70 p-4 sm:p-5">
            <AiComposer onSend={send} busy={busy} />
          </div>
        </div>

        <p className="mt-3 text-center text-[11.5px] text-muted-foreground">
          Attachments are stored privately and shared with the assistant for this answer only. AI can make mistakes.
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/ai")({
  component: AiPage,
  ssr: false,
  head: () => ({
    meta: [
      { title: "ONENEXT Assistant" },
      { name: "description", content: "Ask the ONENEXT assistant about routing, data fetching, rendering and deployment." },
    ],
  }),
});