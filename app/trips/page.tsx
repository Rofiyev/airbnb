import EmptyState from "@/components/empty-state";
import getReservations from "@/actions/getReservations";
import TripsClient from "./_components/trips-client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/authOptions";

export const dynamic = "force-dynamic";

export default async function TripsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user)
    return <EmptyState title="Unauthorized" subtitle="Plase login" />;

  const reservations = await getReservations({
    userId: session.user?.id,
  });

  if (reservations.length === 0)
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you have not reserved any trips."
      />
    );

  return <TripsClient reservations={reservations} />;
}
