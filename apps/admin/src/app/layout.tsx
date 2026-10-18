import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Admin | Dr. Md. Mehedi Hassan',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
