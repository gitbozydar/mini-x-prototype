import prisma from "@/lib/prisma";

export const GET = async () => {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return new Response(JSON.stringify(posts));
};

export const POST = async (req: Request) => {
  try {
    const { author, content } = await req.json();
    const post = await prisma.post.create({
      data: { author, content },
    });
    return new Response(JSON.stringify(post));
  } catch (error) {
    return new Response(JSON.stringify({ error: error }));
  }
};
