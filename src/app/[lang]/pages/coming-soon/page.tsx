import { ComingSoon } from "@/components-shadboard/pages/coming-soon";
import { i18n } from "@/configs-shadboard-new/i18n";
import type { LocaleType } from "@/types";

interface PageProps {
  params: {
    lang: LocaleType;
  };
}

export default function ComingSoonPage({ params }: PageProps) {
  // Fijamos una fecha objetivo para el contador (1 de enero de 2025)
  const targetDate = new Date("2025-01-01T00:00:00Z");
  return <ComingSoon targetDate={targetDate} />;
}

export function generateStaticParams() {
  return i18n.locales.map((loc) => ({ lang: loc }));
} 