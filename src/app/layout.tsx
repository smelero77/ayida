import { Inter, Sora } from "next/font/google";
import { Rubik } from "next/font/google";
import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "~/components/ui/toast-provider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({ 
  subsets: ["latin"],
  variable: "--font-sora",
});

const rubik = Rubik({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "ZÉTIKA - La plataforma tecnológica más completa para subvenciones en España",
  description: "Más de 47.000 ayudas públicas al alcance de tu mano. Busca, gestiona y solicita con tecnología de vanguardia e inteligencia artificial.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${sora.variable} ${rubik.variable}`}>
      <body suppressHydrationWarning={true}>
        <SessionProvider>
          <TRPCReactProvider>
            {children}
            <ToastProvider />
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
