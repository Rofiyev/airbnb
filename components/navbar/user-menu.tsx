"use client";

import { FC, useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoHomeOutline, IoExitOutline } from "react-icons/io5";
import Avatar from "../avatar";
import MenuItem from "./menu-item";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import useRentModal from "@/hooks/useRentModal";
import { useRouter } from "next/navigation";
import { menuItems } from "@/constants";
import { TMenuItem } from "@/types";
import useCurrentUser from "@/hooks/useCurrentUser";

const UserMenu = () => {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState<boolean>();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {
            onRent();
            setIsOpen(false);
          }}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                {menuItems.map((item: TMenuItem) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => {
                      router.push(item.route);
                      setIsOpen(false);
                    }}
                    label={item.label}
                    icon={item.icon}
                  />
                ))}
                <MenuItem
                  onClick={() => {
                    rentModal.onOpen();
                    setIsOpen(false);
                  }}
                  label="Airbnb my home"
                  icon={IoHomeOutline}
                />
                <hr />
                <MenuItem
                  onClick={signOut}
                  label="Logout"
                  className="hover:bg-red-500 hover:text-white transition"
                  icon={IoExitOutline}
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    loginModal.onOpen();
                    setIsOpen(false);
                  }}
                  label="Login"
                />
                <MenuItem
                  onClick={() => {
                    registerModal.onOpen();
                    setIsOpen(false);
                  }}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
