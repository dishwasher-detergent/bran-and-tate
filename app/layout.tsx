import type { Metadata } from "next";
import { Figtree, IBM_Plex_Mono, Vollkorn } from "next/font/google";
import { Toaster } from "sonner";

import { cn } from "@/lib/utils";
import { SessionProvider } from "@/providers/session-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const vollkorn = Vollkorn({ subsets: ["latin"], variable: "--font-serif" });
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bran & Tate",
  description:
    "Bran & Tate is a premium candle company specializing in handcrafted, aromatic candles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        figtree.variable,
        vollkorn.variable,
        ibmPlexMono.variable,
        figtree.variable
      )}
    >
      <body className={`min-h-dvh overflow-x-hidden antialiased flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            {children}
            <Toaster />
            <div id="modal-root" />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
