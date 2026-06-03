import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Iran Virtual Clinic',
  description: 'Telemedicine + EHR Platform',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
