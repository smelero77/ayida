import { ForgotPassword } from "@/components/auth/forgot-password";
import { getDictionary } from "@/lib/get-dictionary";
import type { LocaleType } from "@/types";

interface PageProps {
  params: {
    lang: LocaleType;
  };
}

export default async function ForgotPasswordPage({ params }: PageProps) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  return <ForgotPassword dictionary={dictionary} />;
}

export function generateStaticParams() {
  return ["en", "ar", "es"].map((loc) => ({ lang: loc }));
} 