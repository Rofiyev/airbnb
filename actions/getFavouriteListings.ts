import prisma from "@/libs/prismadb";
import { getSession } from "next-auth/react";

export default async function getFavouriteListings() {
  try {
    const session = await getSession();

    if (!session?.user) return [];

    const currentUser = await prisma.user.findUnique({
      where: {
        // @ts-ignore
        id: session.user.id as string,
      },
    });

    if (!currentUser) return [];

    const favourites = await prisma.listings.findMany({
      where: {
        id: { in: [...(currentUser.favoriteIds || [])] },
      },
    });

    return favourites;
  } catch (error: any) {
    throw new Error(error);
  }
}
