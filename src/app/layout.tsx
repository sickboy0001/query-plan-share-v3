import React from "react";
import SupabaseListener from "./components/Organisms/Common/SupabaseListener";
import "./globals.css";

// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "iikoto-mittu",
  description: "iikoto-mittu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      {/* <body className={inter.className}> */}
      <body>
        <div className=""></div>

        <div className="flex flex-col min-h-screen max-w-screen-2xl mx-auto">
          <SupabaseListener />

          <main className="flex-1 container  px-1 py-5">{children}</main>

          <footer className="py-5">
            <div className="text-center text-sm">
              Copyright © All rights reserved | Sickboy
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
