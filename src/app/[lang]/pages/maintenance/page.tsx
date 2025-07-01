import { Maintenance } from "@/components-shadboard/pages/maintenance";
import { i18n } from "@/configs-shadboard-new/i18n";
import type { LocaleType } from "@/types";

interface PageProps {
  params: {
    lang: LocaleType;
  };
}

export default function MaintenancePage({ params }: PageProps) {
  const { lang } = params;
  return <Maintenance />;
}

export function generateStaticParams() {
  return i18n.locales.map((loc) => ({ lang: loc }));
} 