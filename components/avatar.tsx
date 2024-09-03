"use client";

import { FC } from "react";
import Image from "next/image";

interface Props {
  src: string | null | undefined;
}

const Avatar: FC<Props> = ({ src }) => {
  return (
    <Image
      src={src || "/placeholder.png"}
      className="rounded-full"
      height="30"
      width="30"
      alt="avatar"
    />
  );
};

export default Avatar;
