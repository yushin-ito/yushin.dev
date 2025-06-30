"use client";

import { useCallback, useEffect, useState } from "react";
import { load } from "@fingerprintjs/fingerprintjs";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Icons from "@/components/icons";

interface LikeButtonProps {
  postId: string;
}

const LikeButton = ({ postId }: LikeButtonProps) => {
  const router = useRouter();
  const [visitorId, setVisitorId] = useState<string>();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    (async () => {
      const fp = await load();
      const result = await fp.get();

      setVisitorId(result.visitorId);
    })();
  }, []);

  useEffect(() => {
    if (!visitorId) {
      return;
    }

    (async () => {
      const response = await fetch(
        `/api/posts/${postId}/like?visitorId=${encodeURIComponent(visitorId)}`,
        { method: "GET" }
      );

      if (response.ok) {
        setLiked(true);
      }
    })();
  }, [visitorId, postId]);

  const onClick = useCallback(async () => {
    if (!visitorId) {
      return;
    }

    const response = await fetch(`/api/posts/${postId}/like`, {
      method: liked ? "DELETE" : "POST",
      body: JSON.stringify({ visitorId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setLiked(!liked);

      router.refresh();
    }
  }, [visitorId, postId, liked, router]);

  return (
    <Button
      variant="ghost"
      className="size-12 rounded-full border bg-background [&_svg]:size-5"
      onClick={onClick}
    >
      <Icons.heart
        className={`${
          liked ? "fill-red-400 text-red-400" : "fill-zinc-300 text-zinc-300"
        } transition-colors duration-200 ease-in-out`}
      />
    </Button>
  );
};

export default LikeButton;
