"use client";

import { FC } from "react";
import { IconType } from "react-icons";

interface Props {
  onClick: (value: string) => void;
  label: string;
  selected: boolean;
  icon: IconType;
}

const CategoryInput: FC<Props> = ({ icon: Icon, label, onClick, selected }) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer
        ${selected ? "border-black" : "border-neutral-200"}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
