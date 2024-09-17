import EmptyState from "@/components/empty-state";
import getReservations from "@/actions/getReservations";
import ReservationsClient from "./_components/reservations-client";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth/next";

export const dynamic = "force-static";

export default async function ReservationPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user)
    return <EmptyState title="Unauthorized" subtitle="Plase login" />;

  const reservations = await getReservations({
    authorId: session.user.id,
  });

  if (reservations.length === 0)
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties"
      />
    );

  return <ReservationsClient reservations={reservations} />;
}
