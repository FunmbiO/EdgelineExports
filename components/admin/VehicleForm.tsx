"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Vehicle, VehicleImage, VehicleStatus } from "@/types/vehicle";

const STATUS_OPTIONS: { value: VehicleStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
  { value: "sold", label: "Sold" },
];

const BADGE_OPTIONS = [
  { value: "", label: "None" },
  { value: "Featured", label: "Featured" },
  { value: "Rare", label: "Rare" },
];

const inputClass =
  "mt-2 w-full border border-edgeline-border bg-edgeline-black px-4 py-3 font-body text-edgeline-white placeholder:text-edgeline-white/30 focus:border-edgeline-red focus:outline-none";
const labelClass = "block font-condensed text-xs uppercase tracking-wider text-edgeline-white/70";

export default function VehicleForm({ vehicle }: { vehicle?: Vehicle }) {
  const router = useRouter();
  const isEditing = Boolean(vehicle);

  const [make, setMake] = useState(vehicle?.make ?? "");
  const [model, setModel] = useState(vehicle?.model ?? "");
  const [year, setYear] = useState(vehicle?.year?.toString() ?? "");
  const [price, setPrice] = useState(vehicle?.price?.toString() ?? "");
  const [mileage, setMileage] = useState(vehicle?.mileage?.toString() ?? "");
  const [color, setColor] = useState(vehicle?.color ?? "");
  const [status, setStatus] = useState<VehicleStatus>(vehicle?.status ?? "draft");
  const [badge, setBadge] = useState(vehicle?.badge ?? "");
  const [description, setDescription] = useState(vehicle?.description ?? "");
  const [engine, setEngine] = useState(vehicle?.specs.engine ?? "");
  const [transmission, setTransmission] = useState(vehicle?.specs.transmission ?? "");
  const [drivetrain, setDrivetrain] = useState(vehicle?.specs.drivetrain ?? "");
  const [zeroSixty, setZeroSixty] = useState(vehicle?.specs["0-60"] ?? "");
  const [images, setImages] = useState<VehicleImage[]>(vehicle?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ done: number; total: number } | null>(
    null,
  );
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileList = Array.from(files);
    setUploading(true);
    setUploadProgress({ done: 0, total: fileList.length });
    setError(null);
    const supabase = createClient();

    try {
      const uploaded: VehicleImage[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const path = `${crypto.randomUUID()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("vehicle-images")
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("vehicle-images").getPublicUrl(path);
        uploaded.push({ url: data.publicUrl, alt: `${make} ${model}`.trim() });
        setUploadProgress({ done: i + 1, total: fileList.length });
      }
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const removeImage = (url: string) => {
    setImages((prev) => prev.filter((img) => img.url !== url));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload = {
      make,
      model,
      year: Number(year),
      price: Number(price),
      mileage: Number(mileage),
      color: color || undefined,
      status,
      badge: badge || undefined,
      description: description || undefined,
      specs: {
        engine: engine || undefined,
        transmission: transmission || undefined,
        drivetrain: drivetrain || undefined,
        "0-60": zeroSixty || undefined,
      },
      images,
    };

    try {
      const res = await fetch(
        isEditing ? `/api/admin/vehicles/${vehicle!.id}` : "/api/admin/vehicles",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const json = await res.json();
      if (!res.ok) {
        throw new Error(typeof json.error === "string" ? json.error : "Something went wrong.");
      }

      router.push("/admin/inventory");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-10 border border-edgeline-border bg-edgeline-black p-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className={labelClass} htmlFor="make">Make</label>
          <input id="make" required value={make} onChange={(e) => setMake(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="model">Model</label>
          <input id="model" required value={model} onChange={(e) => setModel(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="year">Year</label>
          <input id="year" type="number" required value={year} onChange={(e) => setYear(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="price">Price (USD)</label>
          <input id="price" type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="mileage">Mileage</label>
          <input id="mileage" type="number" required value={mileage} onChange={(e) => setMileage(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="color">Color</label>
          <input id="color" value={color} onChange={(e) => setColor(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="status">Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value as VehicleStatus)} className={inputClass}>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="badge">Badge</label>
          <select id="badge" value={badge} onChange={(e) => setBadge(e.target.value)} className={inputClass}>
            {BADGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <h3 className="font-condensed text-sm uppercase tracking-wider text-edgeline-red">Specs</h3>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className={labelClass} htmlFor="engine">Engine</label>
            <input id="engine" value={engine} onChange={(e) => setEngine(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="transmission">Transmission</label>
            <input id="transmission" value={transmission} onChange={(e) => setTransmission(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="drivetrain">Drivetrain</label>
            <input id="drivetrain" value={drivetrain} onChange={(e) => setDrivetrain(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="zero-sixty">0–60 mph</label>
            <input id="zero-sixty" value={zeroSixty} onChange={(e) => setZeroSixty(e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <h3 className="font-condensed text-sm uppercase tracking-wider text-edgeline-red">Photos</h3>

        {images.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {images.map((img) => (
              <div key={img.url} className="relative h-24 w-32 overflow-hidden border border-edgeline-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.alt ?? ""} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(img.url)}
                  className="absolute right-1 top-1 bg-edgeline-black/80 px-1.5 py-0.5 text-xs text-edgeline-white hover:text-edgeline-red"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <label
          htmlFor="photo-upload"
          onDragOver={(e) => {
            e.preventDefault();
            setIsDraggingOver(true);
          }}
          onDragLeave={() => setIsDraggingOver(false)}
          onDrop={handleDrop}
          className={`mt-4 flex cursor-pointer flex-col items-center justify-center border-2 border-dashed px-6 py-10 text-center transition-colors ${
            isDraggingOver ? "border-edgeline-red bg-edgeline-red/5" : "border-edgeline-border"
          } ${uploading ? "pointer-events-none opacity-50" : ""}`}
        >
          <p className="font-condensed text-sm uppercase tracking-wider text-edgeline-white/70">
            Drag photos here or click to browse
          </p>
          <p className="mt-1 font-body text-xs text-edgeline-white/40">
            You can select multiple photos at once
          </p>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            multiple
            disabled={uploading}
            onChange={(e) => handleImageUpload(e.target.files)}
            className="hidden"
          />
        </label>

        {uploadProgress && (
          <p className="mt-2 text-xs text-edgeline-white/50">
            Uploading {uploadProgress.done} of {uploadProgress.total}...
          </p>
        )}
      </div>

      {error && <p className="text-sm text-edgeline-red">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting || uploading}
        className="bg-edgeline-red px-8 py-4 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-red-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Create Vehicle"}
      </button>
    </form>
  );
}
