import getCurrentUser from "@/actions/getCurrentUser";
import EmptyState from "../_components/empty-state";
import getListings from "@/actions/getListings";
import PropertiesClient from "./properties-client";

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Plase login" />;

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0)
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have not properties."
      />
    );

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
}
