"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TestimonialRowActions({
  id,
  featured,
}: {
  id: string;
  featured: boolean;
}) {
  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);

  const toggleFeatured = async () => {
    setIsBusy(true);
    await fetch(`/api/admin/testimonials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !featured }),
    });
    setIsBusy(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this testimonial? This can't be undone.")) return;
    setIsBusy(true);
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    setIsBusy(false);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-end gap-4 font-condensed text-xs uppercase tracking-wider">
      <Link href={`/admin/testimonials/${id}/edit`} className="text-edgeline-white/70 hover:text-edgeline-red">
        Edit
      </Link>
      <button
        type="button"
        onClick={toggleFeatured}
        disabled={isBusy}
        className="text-edgeline-white/70 hover:text-edgeline-red disabled:opacity-40"
      >
        {featured ? "Unpublish" : "Publish"}
      </button>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isBusy}
        className="text-edgeline-red/70 hover:text-edgeline-red disabled:opacity-40"
      >
        Delete
      </button>
    </div>
  );
}
