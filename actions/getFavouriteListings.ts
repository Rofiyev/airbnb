import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavouriteListings() {
  try {
    const currentUser = await getCurrentUser();

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
