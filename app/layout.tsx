import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SceneProvider } from "@/components/providers/SceneProvider";
import { ScrollProvider } from "@/components/providers/ScrollProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Archon Solutions",
  description:
    "Archon is a global technology ecosystem for mentorship, internships, consulting, products and outcome-driven learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SceneProvider>
          <ScrollProvider>{children}</ScrollProvider>
        </SceneProvider>
      </body>
    </html>
  );
}