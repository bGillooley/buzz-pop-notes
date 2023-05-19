import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const currentCats = await prisma.category.findMany();

  return NextResponse.json({ currentCats });
}
