import getListingById from "@/actions/getListingById";
import ClientOnly from "@/components/client-only";
import EmptyState from "@/components/empty-state";
import getReservations from "@/actions/getReservations";
import ListingClient from "../_components/listing-client";

export const dynamic = "force-dynamic";

interface IParams {
  listingId: string;
}

export default async function ListingIdPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);

  if (!listing) return <EmptyState />;

  return (
    <ClientOnly>
      <ListingClient listing={listing} reservations={reservations} />
    </ClientOnly>
  );
}
