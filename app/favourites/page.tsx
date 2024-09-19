import getFavouriteListings from "@/actions/getFavouriteListings";
import EmptyState from "@/components/empty-state";
import FavouritesClient from "./_components/favourites-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

export const dynamic = "force-dynamic";

export default async function FavouritesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user)
    return <EmptyState title="Unauthorized" subtitle="Plase login" />;

  const listings = await getFavouriteListings();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favourites found"
        subtitle="Looks like you have no favourite listings."
      />
    );
  }

  return <FavouritesClient listings={listings} />;
}
