import prisma from "@/lib/prisma";

export const GET = async () => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });
  return new Response(JSON.stringify(posts));
};

export const POST = async (req: Request) => {
  try {
    const { title, content, authorId } = await req.json();

    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { id: authorId } },
      },
      include: { author: true },
    });

    return new Response(JSON.stringify(post));
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Nie udało się dodać posta" }),
      { status: 500 },
    );
  }
};
