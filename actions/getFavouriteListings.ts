import { authOptions } from "@/libs/authOptions";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";

export default async function getFavouriteListings() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) return [];

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!currentUser) return [];

    const favourites = await prisma.listings.findMany({
      where: {
        id: { in: [...(currentUser.favoriteIds || [])] },
      },
    });

    return favourites;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
