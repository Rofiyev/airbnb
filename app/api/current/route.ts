import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { authOptions } from "@/libs/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser)
      return NextResponse.json({ error: "User not found!" }, { status: 404 });

    return NextResponse.json(currentUser);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Serverda xatolik" }, { status: 500 });
  }
}