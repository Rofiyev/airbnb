import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";

const nunitoFont = Nunito({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
  icons: [{ url: "/airbnb.ico", href: "/airbnb.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunitoFont.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
