import NextAuth, { DefaultSession } from "next-auth";
import { IconType } from "react-icons";

export type TCategory = {
  label: string;
  icon: IconType;
  description: string;
};

export type TMenuItem = {
  label: string;
  icon: IconType;
  route: string;
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
