import { NewPassword } from "@/components/auth/new-passward";
import { getDictionary } from "@/lib/get-dictionary";
import type { LocaleType } from "@/types";

interface PageProps {
  params: {
    lang: LocaleType;
  };
}

export default async function NewPasswordPage({ params }: PageProps) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  return <NewPassword dictionary={dictionary} />;
}

export function generateStaticParams() {
  return ["en", "ar", "es"].map((loc) => ({ lang: loc }));
} 