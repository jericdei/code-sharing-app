import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const reqBody = await req.json();

  const { value, language } = reqBody;

  const { id } = await prisma.code.create({
    data: {
      value,
      language,
    },
    select: {
      id: true,
    },
  });

  return new NextResponse(
    JSON.stringify({
      message: "Success!",
      id,
    })
  );
}
