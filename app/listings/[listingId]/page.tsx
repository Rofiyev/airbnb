import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import ClientOnly from "@/app/_components/client-only";
import EmptyState from "@/app/_components/empty-state";
import getReservations from "@/actions/getReservations";
import ListingClient from "../_components/listing-client";

interface IParams {
  listingId: string;
}

export default async function ListingIdPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) return <EmptyState />;

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
}
