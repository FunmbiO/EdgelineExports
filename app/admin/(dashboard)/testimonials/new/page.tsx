import TestimonialForm from "@/components/admin/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-edgeline-white">Add Testimonial</h1>
      <div className="mt-8 max-w-2xl">
        <TestimonialForm />
      </div>
    </div>
  );
}
