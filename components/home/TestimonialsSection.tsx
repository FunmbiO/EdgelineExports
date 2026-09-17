import type { Testimonial } from "@/types/testimonial";

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-edgeline-gray-light px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-center font-condensed text-sm uppercase tracking-[0.3em] text-edgeline-red">
          Testimonials
        </p>
        <h2 className="mt-3 text-center font-display text-4xl text-edgeline-black">
          What Clients Say
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-edgeline-white p-8">
              <span className="font-display text-5xl leading-none text-edgeline-red">&ldquo;</span>
              <p className="mt-2 font-body text-edgeline-black/70">{testimonial.quote}</p>
              <p className="mt-6 font-condensed text-sm uppercase tracking-wider text-edgeline-black">
                {testimonial.name}
                {testimonial.location && (
                  <span className="text-edgeline-black/40"> — {testimonial.location}</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
