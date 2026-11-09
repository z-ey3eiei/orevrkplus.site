import { Plus } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What do I need installed?",
    answer: "Node.js 18.18 or newer is all you need. Run npx create-onext-app@latest and the CLI sets up routing, styling and the project structure for you.",
  },
  {
    question: "Where does the server side run?",
    answer: "Server functions and route handlers run on the edge by default, close to your visitors. Nothing to provision or scale yourself.",
  },
  {
    question: "How are API keys handled?",
    answer: "Keys live in the app's secrets store and are only readable inside server code. They are never exposed to the browser bundle.",
  },
  {
    question: "Can I keep my own domain?",
    answer: "Yes. Connect any domain you own and the app serves from it with automatic HTTPS — no DNS expertise required.",
  },
];

export default function FaqSection() {
  return (
    <section className="bg-background py-24 sm:py-32 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">FAQ</p>

        <Accordion type="single" collapsible className="mt-8 border-t border-border/60">
          {faqs.map((f) => (
            <AccordionItem key={f.question} value={f.question} className="border-border/60">
              <AccordionTrigger className="group py-6 hover:no-underline [&>svg]:hidden">
                <span className="text-[16px] sm:text-[18px] font-semibold tracking-tight text-foreground pr-6">
                  {f.question}
                </span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-primary transition-transform duration-300 group-data-[state=open]:rotate-45">
                  <Plus className="h-5 w-5" strokeWidth={2} />
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pr-12">
                <p className="text-[15px] text-foreground/60 leading-relaxed font-medium">{f.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}