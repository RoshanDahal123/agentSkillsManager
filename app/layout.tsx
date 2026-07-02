import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Headers from "../components/Headers";
import { Providers } from "../components/Providers";
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
  title: "Agent Skills Manager",
  description:
    "Create, manage, and share AI agent skills. A Next.js demo showcasing SSG, SSR, ISR, and CSR patterns with Prisma and DaisyUI.",
  openGraph: {
    title: "Agent Skills Manager",
    description: "Create, manage, and share AI agent skills publicly",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased min-h-screen`}
    >
      <body >
       <Providers>
        <Headers/>
       <main className="flex-1">{children}</main>
        
       </Providers>
      
      </body>
    </html>
  );
}
