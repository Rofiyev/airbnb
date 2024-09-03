"use client";

import { FC } from "react";
import { User } from "@prisma/client";
import useCountries from "@/hooks/useCountries";
import Heading from "../heading";
import Image from "next/image";
import HeartButton from "../heart-button";

interface Props {
  id: string;
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser?: User | null;
}

const ListingHead: FC<Props> = ({
  id,
  imageSrc,
  locationValue,
  title,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-lg relative">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
