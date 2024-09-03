import getFavouriteListings from "@/actions/getFavouriteListings";
import EmptyState from "@/components/empty-state";
import getCurrentUser from "@/actions/getCurrentUser";
import FavouritesClient from "./_components/favourites-client";

export default async function FavouritesPage() {
  const listings = await getFavouriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0)
    return (
      <EmptyState
        title="No favourites found"
        subtitle="Looks like you have no favourite listings."
      />
    );

  return <FavouritesClient listings={listings} currentUser={currentUser} />;
}
