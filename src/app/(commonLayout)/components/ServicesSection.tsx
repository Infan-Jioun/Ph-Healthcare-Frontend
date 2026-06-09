import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  FlaskConical,
  Pill,
  Ambulance,
  Video,
  Baby,
  Heart,
  Brain,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: <Stethoscope className="h-6 w-6" />,
    title: "Find a Doctor",
    desc: "Browse and book from 200+ verified specialists in all major fields.",
    href: "/doctors",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: <Video className="h-6 w-6" />,
    title: "Video Consultation",
    desc: "Consult with doctors from home — no travel, no wait.",
    href: "/video-consult",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: <FlaskConical className="h-6 w-6" />,
    title: "Lab Tests",
    desc: "Order blood work, X-rays, and diagnostics. Results delivered online.",
    href: "/lab-tests",
    color: "bg-violet-100 text-violet-700",
  },
  {
    icon: <Pill className="h-6 w-6" />,
    title: "Pharmacy",
    desc: "Order genuine medicines with doorstep delivery in Dhaka & Chattogram.",
    href: "/pharmacy",
    color: "bg-orange-100 text-orange-700",
  },
  {
    icon: <Ambulance className="h-6 w-6" />,
    title: "Emergency Care",
    desc: "24/7 ambulance dispatching and hospital coordination.",
    href: "/emergency",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: <Baby className="h-6 w-6" />,
    title: "Mother & Child",
    desc: "Pregnancy care, pediatrics, and postnatal health support.",
    href: "/mother-child",
    color: "bg-pink-100 text-pink-700",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Cardiology",
    desc: "Specialist heart check-ups, ECG, and cardiac care packages.",
    href: "/cardiology",
    color: "bg-rose-100 text-rose-700",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "Mental Health",
    desc: "Talk to licensed therapists and psychiatrists — confidentially.",
    href: "/mental-health",
    color: "bg-teal-100 text-teal-700",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-2">
            What we offer
          </p>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything health, in one place
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            From a routine check-up to an emergency — Ph-Healthcare covers every
            step of your care journey.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col gap-4"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.color}`}>
                {s.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
              <span className="mt-auto flex items-center gap-1 text-sm font-medium text-emerald-600 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
            <Link href="/services">View all services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
