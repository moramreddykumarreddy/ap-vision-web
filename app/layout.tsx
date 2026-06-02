import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AP Vision Care – Government of Andhra Pradesh',
  description: 'Andhra Pradesh Digital Vision Program – Comprehensive eye care management platform for patients, screening teams, nodal officers, tele-ophthalmologists, vendors, and administrators.',
  keywords: 'AP Vision Care, Andhra Pradesh, eye care, vision screening, tele-ophthalmology, government health',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
