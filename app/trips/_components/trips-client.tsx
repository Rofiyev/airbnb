"use client";

import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Listings, Reservations, User } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import Container from "@/components/container";
import Heading from "@/components/heading";
import ListingCard from "@/components/listings/listing-card";

interface Props {
  reservations: (Reservations & {
    listings: Listings | null;
  })[];
}

const TripsClient: FC<Props> = ({ reservations }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservations cancelled successfully!");
          router.refresh();
        })
        .catch((error: any) => toast.error(error?.response?.data?.error))
        .finally(() => setDeletingId(""));
    },
    [router]
  );

  return (
    <Container>
      <div className="pt-32 pb-10">
        <Heading
          title="Trips"
          subtitle="Where you have been and where are you going"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {reservations.map((reservation) => {
            if (reservation.listings)
              return (
                <ListingCard
                  key={reservation.id}
                  data={reservation.listings}
                  reservation={reservation}
                  actionId={reservation.id}
                  onAction={onCancel}
                  disabled={deletingId === reservation.id}
                  actionLabel="Cancel reservation"
                />
              );
          })}
        </div>
      </div>
    </Container>
  );
};

export default TripsClient;
