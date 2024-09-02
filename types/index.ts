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
