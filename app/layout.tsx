import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AP Vision Care – Government of Andhra Pradesh",
  description:
    "Andhra Pradesh Digital Vision Program – Comprehensive eye care management platform for patients, screening teams, nodal officers, tele-ophthalmologists, and administrators.",
  keywords:
    "AP Vision Care, Andhra Pradesh, eye care, vision screening, tele-ophthalmology, government health",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-grey-50 font-sans text-grey-900 antialiased">
        {children}
      </body>
    </html>
  );
}
