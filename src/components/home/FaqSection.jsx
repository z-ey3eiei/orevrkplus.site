import { Plus } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  { question: "What do I need installed?", answer: "Node.js 20 or newer. Run npx create-ovk-app@latest my-app, then cd my-app, npm install, and npm run dev." },
  { question: "Is this a React or Next.js framework?", answer: "No. create-ovk-app generates a Vite-powered static website starter with JavaScript and CSS. It does not include React Server Components, server functions, or a managed backend." },
  { question: "Which files do I edit?", answer: "Edit src/main.js and src/style.css. Place static assets in public/. npm run build writes the finished website to dist/." },
  { question: "How do I publish my website?", answer: "Upload the generated dist/ folder to your static host. npm run export creates a ZIP for handoff. For Cloudflare, authenticate Wrangler with your account and run npm run deploy:cloudflare." },
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