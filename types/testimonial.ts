export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  location: string | null;
}

// Admin views need `featured` to control homepage/About visibility —
// public queries never select it since they're already pre-filtered.
export interface AdminTestimonial extends Testimonial {
  featured: boolean;
  createdAt: string;
}
