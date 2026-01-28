import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json({ error: "Nieprawidłowy email" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return Response.json({ error: "Nieprawidłowe hasło" }, { status: 401 });
    }

    const { password: _, ...safeUser } = user;

    return Response.json({
      user: safeUser,
    });
  } catch {
    return Response.json({ error: "Błąd logowania" }, { status: 500 });
  }
}
