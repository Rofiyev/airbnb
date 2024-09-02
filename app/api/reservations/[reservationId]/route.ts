import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string")
    throw new Error("Invalid ID");

  const reservation = await prisma.reservations.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id },
        { listings: { userId: currentUser.id } },
      ],
    },
  });

  return NextResponse.json(reservation);
}
