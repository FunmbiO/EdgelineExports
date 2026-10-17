import CarLoader from "@/components/ui/CarLoader";

export default function AdminLoading() {
  return (
    <div className="bg-edgeline-black text-edgeline-white">
      <CarLoader label="Loading" />
    </div>
  );
}
