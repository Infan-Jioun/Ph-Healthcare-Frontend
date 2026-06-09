import { Search, CalendarCheck, HeartPulse } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-7 w-7 text-emerald-600" />,
    step: "Step 1",
    title: "Search for a doctor",
    desc: "Filter by specialty, location, or availability. Read patient reviews to find the right fit.",
  },
  {
    icon: <CalendarCheck className="h-7 w-7 text-emerald-600" />,
    step: "Step 2",
    title: "Book your slot",
    desc: "Pick a time that works for you — in-person or video. Instant confirmation, no calls needed.",
  },
  {
    icon: <HeartPulse className="h-7 w-7 text-emerald-600" />,
    step: "Step 3",
    title: "Get the care you need",
    desc: "Attend your appointment, receive prescriptions online, and track follow-ups from your dashboard.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 sm:py-20 bg-emerald-700 overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-emerald-600/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-teal-700/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200 mb-2">
            Simple process
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Getting care takes 3 steps
          </h2>
          <p className="mt-3 text-emerald-200 max-w-lg mx-auto">
            We removed the friction from healthcare so you can focus on what actually matters — feeling better.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 relative">
          {/* Connector line — desktop only */}
          <div className="hidden sm:block absolute top-10 left-1/6 right-1/6 h-px bg-emerald-500/40" />

          {steps.map((s, i) => (
            <div key={s.title} className="relative flex flex-col items-center text-center gap-4">
              {/* Step number ring */}
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  {s.icon}
                </div>
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-xs font-bold text-emerald-900">
                  {i + 1}
                </span>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300 mb-1">
                  {s.step}
                </p>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-emerald-200 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
