"use client";

import { FC } from "react";
import { Listings } from "@prisma/client";
import Container from "@/components/container";
import Heading from "@/components/heading";
import ListingCard from "@/components/listings/listing-card";

interface Props {
  listings: Listings[];
}

const FavouritesClient: FC<Props> = ({ listings }) => {
  return (
    <Container>
      <Heading
        title="Favourites"
        subtitle="List of places you have favourited!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard key={listing.id} data={listing} />
        ))}
      </div>
    </Container>
  );
};

export default FavouritesClient;
