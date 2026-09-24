"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function ProjectLikeButton({
  slug,
  initialCount,
}: {
  slug: string;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount ?? 0);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setLiked(localStorage.getItem(`unomasuno-like:${slug}`) === "1");
  }, [slug]);

  async function likeProject() {
    if (liked || busy) return;

    setBusy(true);

    const supabase = createClient();
    const { data, error } = await supabase.rpc("like_project", {
      project_slug: slug,
    });

    if (!error && typeof data === "number") {
      setCount(data);
      setLiked(true);
      localStorage.setItem(`unomasuno-like:${slug}`, "1");
    } else if (error) {
      console.error("No se pudo registrar el Me gusta:", error);
    }

    setBusy(false);
  }

  return (
    <button
      type="button"
      className={`project-love ${liked ? "is-liked" : ""}`}
      onClick={likeProject}
      disabled={liked || busy}
      aria-label={liked ? "Ya te gusta este proyecto" : "Me gusta"}
      title={liked ? "Ya te gusta este proyecto" : "Me gusta"}
    >
      <span className="project-love-heart">{liked ? "♥" : "♡"}</span>
      <span className="project-love-count">{count}</span>
    </button>
  );
}
