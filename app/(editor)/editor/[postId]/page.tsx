import { forbidden, notFound, unauthorized } from "next/navigation";

import { db } from "@/lib/db";
import Editor from "@/components/editor";
import { auth } from "@/auth";

interface EditorPageProps {
  params: Promise<{ postId: string }>;
}

const EditorPage = async ({ params }: EditorPageProps) => {
  const session = await auth();
  const { postId } = await params;

  if (!session?.user) {
    unauthorized();
  }

  if (session.user.role !== "ADMIN") {
    forbidden();
  }

  const post = await db.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <Editor
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
      }}
    />
  );
};

export default EditorPage;
