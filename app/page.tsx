import getListings, { IListingsParams } from "@/actions/getListings";
import { Listings } from "@prisma/client";
import Container from "@/components/container";
import EmptyState from "@/components/empty-state";
import ClientOnly from "@/components/client-only";
import ListingCard from "@/components/listings/listing-card";
import getCurrentUser from "@/actions/getCurrentUser";

export const dynamic = "force-static"; // 'auto' | 'force-dynamic' | 'error' | 'force-static';

interface Props {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: Props) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) return <EmptyState showReset />;

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: Listings) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
