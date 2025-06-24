import { Inter, Sora } from "next/font/google";
import "~/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({ 
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "ZÉTIKA - La plataforma tecnológica más completa para subvenciones en España",
  description: "Más de 47.000 ayudas públicas al alcance de tu mano. Busca, gestiona y solicita con tecnología de vanguardia e inteligencia artificial.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${sora.variable}`}>
      <body className={inter.className}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
