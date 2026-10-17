import Image from "next/image";

export default function CarLoader({ label }: { label: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div className="drive-idle">
        <Image
          src="/icon-car-transparent.png"
          alt=""
          width={179}
          height={37}
          priority
          className="h-12 w-auto"
        />
      </div>
      <p className="font-condensed text-xs uppercase tracking-wider opacity-50">{label}</p>
    </div>
  );
}
