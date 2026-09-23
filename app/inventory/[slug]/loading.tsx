export default function VehicleDetailLoading() {
  return (
    <div className="bg-edgeline-black">
      <div className="border-b border-edgeline-border px-4 py-16 text-center md:px-8 md:py-24">
        <div className="mx-auto h-4 w-20 animate-pulse bg-edgeline-white/10" />
        <div className="mx-auto mt-4 h-10 w-80 animate-pulse bg-edgeline-white/10" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-[4/3] animate-pulse bg-edgeline-white/10" />

          <div className="space-y-4">
            <div className="h-4 w-40 animate-pulse bg-edgeline-white/10" />
            <div className="h-10 w-32 animate-pulse bg-edgeline-white/10" />
            <div className="grid grid-cols-2 gap-4 border-t border-edgeline-border pt-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-16 animate-pulse bg-edgeline-white/10" />
                  <div className="h-4 w-24 animate-pulse bg-edgeline-white/10" />
                </div>
              ))}
            </div>
            <div className="flex gap-4 pt-4">
              <div className="h-14 w-40 animate-pulse bg-edgeline-white/10" />
              <div className="h-14 w-40 animate-pulse bg-edgeline-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
