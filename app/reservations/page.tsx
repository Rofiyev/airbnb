import getCurrentUser from "@/actions/getCurrentUser";
import EmptyState from "@/components/empty-state";
import getReservations from "@/actions/getReservations";
import ReservationsClient from "./_components/reservations-client";

export default async function ReservationPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Plase login" />;

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0)
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties"
      />
    );

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
}
