"use client";

import { FC } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface Props {
  onClick: () => void;
  label: string;
  className?: string;
  icon?: IconType;
}

const MenuItem: FC<Props> = ({ label, onClick, className, icon: Icon }) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "px-4 py-3 hover:bg-neutral-100 transition font-semibold flex items-center gap-2",
        className
      )}
    >
      {Icon && <Icon size={20} className="inline-block text-inherit" />}
      {label}
    </div>
  );
};

export default MenuItem;
