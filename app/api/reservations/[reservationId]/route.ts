import { authOptions } from "@/libs/authOptions";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

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
