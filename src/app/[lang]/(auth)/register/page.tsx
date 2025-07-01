import { redirect } from "next/navigation";
import type { LocaleType } from "@/types";

interface PageProps {
  params: {
    lang: LocaleType;
  };
}

export default async function RegisterPage({ params }: PageProps) {
  const { lang } = params;
  redirect(`/${lang}/signup`);
} 