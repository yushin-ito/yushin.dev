"use client";

import { useEffect } from "react";
import { load } from "@fingerprintjs/fingerprintjs";

interface TrackerProps {
  postId: string;
}

const Tracker = ({ postId }: TrackerProps) => {
  useEffect(() => {
    (async () => {
      const fp = await load();
      const result = await fp.get();

      await fetch(`/api/posts/${postId}/view`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId: result.visitorId }),
      });
    })();
  }, [postId]);

  return null;
};

export default Tracker;
