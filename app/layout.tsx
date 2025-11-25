// app/layout.tsx (Modifikasi)

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/app/globals.css';
import Sidebar from "@/components/ui/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Filling Dosen",
  description: "Sistem E-Filling Data Dosen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <div className="flex">
          {/* Sidebar akan selalu ada di semua halaman */}
          <Sidebar />

          {/* Konten Utama */}
          <main className="flex-1 p-8 bg-gray-50 min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}