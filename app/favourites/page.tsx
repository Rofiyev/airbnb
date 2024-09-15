import getFavouriteListings from "@/actions/getFavouriteListings";
import EmptyState from "@/components/empty-state";
import FavouritesClient from "./_components/favourites-client";

export const dynamic = "force-static"; // 'auto' | 'force-dynamic' | 'error' | 'force-static';

export default async function FavouritesPage() {
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
