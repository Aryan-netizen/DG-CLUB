import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DG Club — India's #1 Gaming Platform",
    template: "%s | DG Club",
  },
  description:
    "Play Lottery, Aviator, Slots and Sports on India's most trusted gaming platform. Claim your ₹500 welcome bonus today.",
  keywords: ["gaming", "lottery", "aviator", "slots", "sports betting", "India"],
  metadataBase: new URL("https://dgclub.in"),
  openGraph: {
    title: "DG Club — India's #1 Gaming Platform",
    description: "Play and win on India's most trusted gaming platform.",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#05070f] text-[#f1f5f9]">{children}</body>
    </html>
  );
}
