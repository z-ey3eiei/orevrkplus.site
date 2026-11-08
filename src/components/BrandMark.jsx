import brand from "@/lib/brand.config";

export default function BrandMark({ className = "w-6 h-6" }) {
  return <img src="/orevrkplus-mark.svg" className={className} alt={brand.name} />;
}
