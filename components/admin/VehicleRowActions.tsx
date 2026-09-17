"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { VehicleStatus } from "@/types/vehicle";

export default function VehicleRowActions({
  id,
  status,
}: {
  id: string;
  status: VehicleStatus;
}) {
  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);

  const togglePublish = async () => {
    setIsBusy(true);
    const nextStatus = status === "available" ? "draft" : "available";
    await fetch(`/api/admin/vehicles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    setIsBusy(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this vehicle? This can't be undone.")) return;
    setIsBusy(true);
    await fetch(`/api/admin/vehicles/${id}`, { method: "DELETE" });
    setIsBusy(false);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-end gap-4 font-condensed text-xs uppercase tracking-wider">
      <Link href={`/admin/inventory/${id}/edit`} className="text-edgeline-white/70 hover:text-edgeline-red">
        Edit
      </Link>
      <button
        type="button"
        onClick={togglePublish}
        disabled={isBusy}
        className="text-edgeline-white/70 hover:text-edgeline-red disabled:opacity-40"
      >
        {status === "available" ? "Unpublish" : "Publish"}
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
