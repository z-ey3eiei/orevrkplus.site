import { useEffect, useRef, useState } from "react";
import { Check, Copy, Paperclip } from "lucide-react";

function Reveal({ text }) {
  const [shown, setShown] = useState("");
  const timer = useRef(null);

  useEffect(() => {
    if (!text) return;
    let index = 0;
    const step = Math.max(2, Math.round(text.length / 80));
    timer.current = setInterval(() => {
      index = Math.min(text.length, index + step);
      setShown(text.slice(0, index));
      if (index >= text.length) clearInterval(timer.current);
    }, 16);
    return () => clearInterval(timer.current);
  }, [text]);

  const streaming = shown.length < text.length;

  return (
    <p className="whitespace-pre-wrap text-[15px] leading-relaxed tracking-[-0.012em] text-foreground/85">
      {shown}
      {streaming && <span className="ai-caret" aria-hidden="true" />}
    </p>
  );
}

function Thinking() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="ai-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="text-[13.5px] text-muted-foreground">Thinking…</span>
    </div>
  );
}

function CopyButton({ text }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      /* clipboard may be blocked */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1.5 text-[12px] font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-95"
    >
      {done ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {done ? "Copied" : "Copy"}
    </button>
  );
}

export default function ChatThread({ messages }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-5 px-4 py-5 sm:px-6 sm:py-6">
      {messages.map((message) =>
        message.role === "user" ? (
          <div key={message.id} className="ai-rise flex flex-col items-end">
            <div className="max-w-[92%] rounded-2xl rounded-br-md border border-border/70 bg-muted px-4 py-3">
              <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-foreground">{message.content}</p>
              {message.attachments?.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {message.attachments.map((name) => (
                    <span
                      key={name}
                      className="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-2.5 py-1 text-[11.5px] text-muted-foreground"
                    >
                      <Paperclip className="h-3 w-3" />
                      <span className="max-w-[38vw] truncate">{name}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div key={message.id} className="ai-rise flex flex-col items-start">
            {message.status === "thinking" ? (
              <Thinking />
            ) : (
              <>
                <Reveal text={message.content} />
                <div className="mt-2.5">
                  <CopyButton text={message.content} />
                </div>
              </>
            )}
          </div>
        )
      )}
      <div ref={endRef} />
    </div>
  );
}