import brand from "@/lib/brand.config";

// The ONENEXT mark: a chevron pair reading as "< >" around the wordmark.
export default function BrandMark({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" role="img" aria-label={brand.name}>
      <path d="M12 6 4 16l8 10" stroke="hsl(var(--foreground))" strokeWidth="3" strokeLinecap="square" />
      <path d="M20 6l8 10-8 10" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="square" />
    </svg>
  );
}