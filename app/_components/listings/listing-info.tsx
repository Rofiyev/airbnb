"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import { User } from "@prisma/client";
import { TCategory } from "@/types";
import useCountries from "@/hooks/useCountries";
import Avatar from "../avatar";
import ListingCategory from "./listing-category";

const Map = dynamic(() => import("@/app/_components/map"), { ssr: false });

interface Props {
  user: User | null;
  description: string;
  category: TCategory | undefined;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: FC<Props> = ({
  bathroomCount,
  category,
  description,
  guestCount,
  locationValue,
  roomCount,
  user,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <span>Hosted by {user?.name}</span>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <p>{guestCount} guests</p>
          <p>{roomCount} rooms</p>
          <p>{bathroomCount} bathrooms</p>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500 whitespace-pre-line">
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
