"use client";

import { Listings, User } from "@prisma/client";
import { FC } from "react";
import Container from "../_components/container";
import Heading from "../_components/heading";
import ListingCard from "../_components/listings/listing-card";

interface Props {
  listings: Listings[];
  currentUser?: User | null;
}

const FavouritesClient: FC<Props> = ({ listings, currentUser }) => {
  return (
    <Container>
      <Heading
        title="Favourites"
        subtitle="List of places you have favourited!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavouritesClient;
