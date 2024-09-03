"use client";

import { FC } from "react";
import { User } from "@prisma/client";
import Container from "../container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";
import Categories from "./categories";

interface Props {
  currentUser?: User | null;
}

const Navbar: FC<Props> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white shadow-sm z-10">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
