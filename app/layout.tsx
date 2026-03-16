import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ApiKeyProvider } from "@/app/context/api-key-context";
import { ThemeProvider } from "@/app/context/theme-context";
import { ToastProvider } from "@/app/context/toast-context";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://adaptive-gtm.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Enterprise GTM | Adaptive Security — George Trosley",
  description:
    "How I'd use a GTM war room to generate pipeline and close deals on five enterprise accounts (ADP, DuPont, St. Luke's, Tower Health, Penn State Health) for Adaptive Security. Built for recruiters & hiring managers.",
  icons: {
    icon: "/adaptive-logo-dark.png",
    apple: "/adaptive-logo-dark.png",
  },
  openGraph: {
    title: "Enterprise GTM | Adaptive Security — George Trosley",
    description:
      "How I'd use a GTM war room to generate pipeline and close deals on five enterprise accounts for Adaptive Security.",
    url: "/",
    siteName: "Adaptive Security GTM",
    images: [
      {
        url: "/adaptive-logo-dark.png",
        width: 512,
        height: 512,
        alt: "Adaptive Security",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Enterprise GTM | Adaptive Security — George Trosley",
    description:
      "How I'd use a GTM war room to generate pipeline and close deals on five enterprise accounts for Adaptive Security.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    (() => {
      try {
        var s = localStorage.getItem("adaptive-gtm-theme");
        var theme = (s === "light" || s === "dark") ? s : "dark";
        document.documentElement.dataset.theme = theme;
        document.documentElement.classList.toggle("dark", theme === "dark");
        document.documentElement.classList.toggle("light", theme === "light");
      } catch {}
    })();
  `;

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <ApiKeyProvider>
            <ToastProvider>{children}</ToastProvider>
          </ApiKeyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
