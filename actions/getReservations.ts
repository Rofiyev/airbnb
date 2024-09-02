import prisma from "@/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, authorId, userId } = params;

    const query: any = {};

    if (listingId) query.listingId = listingId;
    if (userId) query.userId = userId;
    if (authorId) query.listings = { userId: authorId };

    const reservations = await prisma.reservations.findMany({
      where: query,
      include: { listings: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
