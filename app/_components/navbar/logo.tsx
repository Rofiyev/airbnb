"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  const handleRoute = () => router.push("/");

  return (
    <Image
      onClick={handleRoute}
      src="/logo.png"
      alt="Logo"
      width="100"
      height="100"
      className="hidden md:block cursor-pointer"
    />
  );
};

export default Logo;
