"use client";

import { ReactNode } from "react";
import LoginModal from "@/components/modals/login-modal";
import RegisterModal from "@/components/modals/register-modal";
import RentModal from "@/components/modals/rent-modal";
import SearchModal from "@/components/modals/search-modal";
import Navbar from "@/components/navbar/navbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Navbar />
      <Toaster position="top-center" reverseOrder={true} />
      <RegisterModal />
      <LoginModal />
      <RentModal />
      <SearchModal />
      {children}
    </SessionProvider>
  );
}
