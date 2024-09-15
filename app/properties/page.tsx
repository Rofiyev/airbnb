import EmptyState from "@/components/empty-state";
import getListings from "@/actions/getListings";
import PropertiesClient from "./_components/properties-client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/authOptions";

export default async function PropertiesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user)
    return <EmptyState title="Unauthorized" subtitle="Plase login" />;

  const listings = await getListings({
    userId: session.user?.id,
  });

  if (listings.length === 0)
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have not properties."
      />
    );

  return <PropertiesClient listings={listings} />;
}
