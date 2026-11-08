import { useEffect, useRef, useState } from "react";
import { Plus, ArrowUp, X } from "lucide-react";

const PHRASE = "Ask about routing, deployment or performance";

export default function AiComposer({ onSend, busy = false }) {
  const [value, setValue] = useState("");
  const [files, setFiles] = useState([]);
  const [focused, setFocused] = useState(false);
  const [typed, setTyped] = useState("");
  const textareaRef = useRef(null);
  const fileRef = useRef(null);

  const hasContent = value.trim().length > 0 || files.length > 0;

  // auto-grow the textarea, capped like the original
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [value]);

  // typewriter placeholder
  useEffect(() => {
    if (focused || value) return;
    let index = 0;
    let direction = 1;
    let timer;
    const tick = () => {
      index += direction;
      setTyped(PHRASE.slice(0, index));
      if (index >= PHRASE.length) {
        direction = -1;
        timer = setTimeout(tick, 1800);
        return;
      }
      if (index <= 0) {
        direction = 1;
        timer = setTimeout(tick, 600);
        return;
      }
      timer = setTimeout(tick, direction > 0 ? 60 : 28);
    };
    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
  }, [focused, value]);

  const submit = () => {
    if (!hasContent || busy) return;
    onSend({ text: value.trim(), files });
    setValue("");
    setFiles([]);
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  const addFiles = (event) => {
    const picked = Array.from(event.target.files ?? []).slice(0, 3);
    setFiles((prev) => [...prev, ...picked].slice(0, 3));
    event.target.value = "";
  };

  return (
    <div className="relative">
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {files.map((file, index) => (
            <span
              key={`${file.name}-${index}`}
              className="ai-rise inline-flex items-center gap-2 rounded-full bg-muted py-1.5 pl-3.5 pr-1.5 text-[12.5px] text-foreground"
            >
              <span className="max-w-[42vw] truncate">{file.name}</span>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}
                className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="ai-ring rounded-[26px] p-px">
        <div className="relative overflow-hidden rounded-[25px] bg-secondary px-4 pb-3 pt-3.5 shadow-[inset_0_1px_0_hsl(var(--foreground)/0.05)] sm:px-5">
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={focused || value ? "" : typed}
            aria-label="Message the orevrkplus assistant"
            className="block w-full resize-none border-0 bg-transparent pr-1 text-[15px] leading-relaxed tracking-[-0.012em] text-foreground outline-none placeholder:text-muted-foreground/70"
          />

          <div className="mt-3 flex items-end justify-between">
            <input
              ref={fileRef}
              type="file"
              multiple
              onChange={addFiles}
              className="pointer-events-none absolute h-px w-px opacity-0"
              tabIndex={-1}
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              aria-label="Add attachment"
              className="-ml-2 flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-all duration-200 hover:text-foreground active:scale-90"
            >
              <Plus className="h-[18px] w-[18px]" />
            </button>

            <button
              type="button"
              onClick={submit}
              aria-label="Send message"
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 active:scale-95 ${
                hasContent
                  ? "bg-primary text-primary-foreground shadow-[0_0_24px_-4px_hsl(var(--primary)/0.65)]"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              <ArrowUp className="h-[18px] w-[18px]" strokeWidth={1.9} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}