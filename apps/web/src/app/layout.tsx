import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dr. Md. Mehedi Hassan | Veterinarian in Chattogram, Bangladesh',
  description:
    'Dr. Md. Mehedi Hassan, DVM (HSTU), C.T. (MSU, Thailand) — BVC-registered veterinarian and Pet & Companion Animal Specialist in Chattogram, Bangladesh.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
