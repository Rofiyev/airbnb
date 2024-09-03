import getCurrentUser from "@/actions/getCurrentUser";
import EmptyState from "../_components/empty-state";
import getReservations from "@/actions/getReservations";
import TripsClient from "./_components/trips-client";

export default async function TripsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Plase login" />;

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0)
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you have not reserved any trips."
      />
    );

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
}
