import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AP Vision Care – Government of Andhra Pradesh",
  description:
    "Andhra Pradesh Digital Vision Program – Comprehensive eye care management platform for patients, screening teams, nodal officers, tele-ophthalmologists, and administrators.",
  keywords:
    "AP Vision Care, Andhra Pradesh, eye care, vision screening, tele-ophthalmology, government health",
  icons: {
    icon: [
      { url: "/apvision.png", type: "image/png", sizes: "any" },
      { url: "/apvision.png", type: "image/png", sizes: "32x32" },
      { url: "/apvision.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apvision.png", type: "image/png" }],
    shortcut: ["/apvision.png"],
  },
  openGraph: {
    title: "AP Vision Care – Government of Andhra Pradesh",
    description:
      "Andhra Pradesh Digital Vision Program – statewide digital vision care platform.",
    images: [{ url: "/apvision.png", alt: "Andhra Pradesh Vision Care" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/apvision.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/apvision.png" />
      </head>
      <body className="min-h-screen bg-bg-app font-sans text-grey-900 antialiased">
        {children}
      </body>
    </html>
  );
}
