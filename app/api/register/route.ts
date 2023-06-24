import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;
    if (!email || !name || !password) {
      return new Response("Please fill valid values", { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (err: any) {
    return new Response("User creation failed", { status: 500 });
  }
}
