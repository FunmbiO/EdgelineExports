export default function InventoryLoading() {
  return (
    <div className="bg-edgeline-black">
      <div className="border-b border-edgeline-border px-4 py-16 text-center md:px-8 md:py-24">
        <div className="mx-auto h-4 w-24 animate-pulse bg-edgeline-white/10" />
        <div className="mx-auto mt-4 h-10 w-64 animate-pulse bg-edgeline-white/10" />
      </div>

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 md:px-8">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 w-24 animate-pulse bg-edgeline-white/10" />
          ))}
        </div>

        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-edgeline-border">
              <div className="aspect-[4/3] animate-pulse bg-edgeline-white/10" />
              <div className="space-y-3 p-5">
                <div className="h-6 w-3/4 animate-pulse bg-edgeline-white/10" />
                <div className="h-4 w-1/2 animate-pulse bg-edgeline-white/10" />
                <div className="h-5 w-1/3 animate-pulse bg-edgeline-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
