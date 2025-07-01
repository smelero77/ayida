import { VerifyEmail } from "@/components/auth/verify-email";
import { getDictionary } from "@/lib/get-dictionary";
import type { LocaleType } from "@/types";

interface PageProps {
  params: {
    lang: LocaleType;
  };
}

export default async function VerifyEmailPage({ params }: PageProps) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  return <VerifyEmail dictionary={dictionary} />;
}

export function generateStaticParams() {
  return ["en", "ar", "es"].map((loc) => ({ lang: loc }));
} 