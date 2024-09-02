import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import getCurrentUser from "@/actions/getCurrentUser";
import Navbar from "./_components/navbar/navbar";
import RegisterModal from "./_components/modals/register-modal";
import LoginModal from "./_components/modals/login-modal";
import RentModal from "./_components/modals/rent-modal";
import SearchModal from "./_components/modals/search-modal";

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
        <Navbar currentUser={currentUser} />
        <Toaster position="top-center" reverseOrder={true} />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <div className="pt-28 pb-20">{children}</div>
      </body>
    </html>
  );
}
