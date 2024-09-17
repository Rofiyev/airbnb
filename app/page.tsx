import getListings, { IListingsParams } from "@/actions/getListings";
import { Listings } from "@prisma/client";
import Container from "@/components/container";
import EmptyState from "@/components/empty-state";
import ClientOnly from "@/components/client-only";
import ListingCard from "@/components/listings/listing-card";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: Props) {
  const listings = await getListings(searchParams);

  if (listings.length === 0) return <EmptyState showReset />;

  return (
    <ClientOnly>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 pt-48 pb-10">
          {listings.map((listing: Listings) => (
            <ListingCard key={listing.id} data={listing} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
