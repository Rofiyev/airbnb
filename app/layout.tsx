import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import getCurrentUser from "@/actions/getCurrentUser";
import Navbar from "@/components/navbar/navbar";
import RegisterModal from "@/components/modals/register-modal";
import LoginModal from "@/components/modals/login-modal";
import RentModal from "@/components/modals/rent-modal";
import SearchModal from "@/components/modals/search-modal";
import Loader from "@/components/loader";
import { Suspense } from "react";

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
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunitoFont.className}>
        <Suspense fallback={<Loader />}>
          <Navbar currentUser={currentUser} />
          <Toaster position="top-center" reverseOrder={true} />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <div className="pt-28 pb-20">{children}</div>
        </Suspense>
      </body>
    </html>
  );
}
