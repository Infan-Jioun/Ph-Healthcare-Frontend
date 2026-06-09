import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Tahmina Akter",
    location: "Dhaka",
    text: "I booked a cardiologist within 10 minutes. The doctor was punctual, the app was smooth — I've recommended it to my entire family.",
    rating: 5,
    emoji: "👩",
    service: "Cardiology",
  },
  {
    name: "Rakib Hossain",
    location: "Chattogram",
    text: "Ordered lab tests at 11 PM and got my blood report online the next morning. Absolutely hassle-free experience.",
    rating: 5,
    emoji: "👨",
    service: "Lab Tests",
  },
  {
    name: "Nasrin Begum",
    location: "Sylhet",
    text: "The video consultation feature is a blessing. I'm elderly and can't travel often — now I consult my doctor from home.",
    rating: 5,
    emoji: "👵",
    service: "Video Consultation",
  },
  {
    name: "Shahriar Ahmed",
    location: "Rajshahi",
    text: "Pharmacy delivery was fast and the medicine was genuine. Price was clearly listed — no hidden charges.",
    rating: 4,
    emoji: "👨",
    service: "Pharmacy",
  },
  {
    name: "Lamia Sultana",
    location: "Khulna",
    text: "The mental health counseling service gave me a safe space. The therapist was professional and understanding.",
    rating: 5,
    emoji: "👩",
    service: "Mental Health",
  },
  {
    name: "Mizanur Rahman",
    location: "Cumilla",
    text: "Emergency ambulance arrived in 18 minutes. In a critical moment, Ph-Healthcare truly delivered.",
    rating: 5,
    emoji: "👨",
    service: "Emergency",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-2">
            Patient stories
          </p>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Real people, real results
          </h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">
            Over 50,000 patients have shared their experiences. Here's what a few of them said.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              {/* Quote icon */}
              <Quote className="h-5 w-5 text-emerald-200" />

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1">{t.text}</p>

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < t.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-xl">
                  {t.emoji}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location} · {t.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
