import { db } from "@/lib/db";

export const GET = async () => {
  try {
    const works = await db.work.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(works));
  } catch {
    return new Response(null, { status: 500 });
  }
};
