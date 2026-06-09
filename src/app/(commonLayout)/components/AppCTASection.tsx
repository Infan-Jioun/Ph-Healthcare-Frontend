import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Smartphone, CheckCircle2 } from "lucide-react";

const perks = [
  "Book appointments in under 2 minutes",
  "Get reminders and prescription updates",
  "Access your full health history anytime",
  "Video calls with doctors from your phone",
];

export default function AppCTASection() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-700 to-teal-600 overflow-hidden">
          <div className="grid lg:grid-cols-2 items-center gap-8 px-8 py-12 sm:px-12 sm:py-16">

            {/* Left — copy */}
            <div className="text-white">
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200 mb-3">
                Ph-Healthcare App
              </p>
              <h2 className="text-3xl font-bold sm:text-4xl leading-tight">
                Your health in your pocket — always
              </h2>
              <p className="mt-4 text-emerald-100 leading-relaxed">
                Download the free app and manage every aspect of your healthcare from anywhere in Bangladesh.
              </p>

              <ul className="mt-6 space-y-2.5">
                {perks.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm text-emerald-50">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold gap-2"
                >
                  <Link href="#">
                    <Smartphone className="h-4 w-4" />
                    Download for Android
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 gap-2"
                >
                  <Link href="#">
                    <Smartphone className="h-4 w-4" />
                    Download for iOS
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right — phone mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-52 h-96 rounded-[2.5rem] border-4 border-white/30 bg-white/10 backdrop-blur shadow-2xl flex flex-col items-center justify-center gap-3 overflow-hidden">
                {/* Status bar */}
                <div className="absolute top-3 left-0 right-0 flex justify-center">
                  <div className="h-1.5 w-16 rounded-full bg-white/40" />
                </div>

                {/* App screen mockup */}
                <div className="mt-6 w-full px-4 flex flex-col gap-3">
                  <div className="rounded-xl bg-white/20 p-3 text-center">
                    <p className="text-white text-xs font-semibold">Ph-Healthcare</p>
                    <p className="text-white/70 text-[10px]">Your next appointment</p>
                    <div className="mt-2 rounded-lg bg-white/20 p-2">
                      <p className="text-white text-sm font-bold">Dr. Rafiq</p>
                      <p className="text-white/70 text-[10px]">Tomorrow · 10:00 AM</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["Doctors 👨‍⚕️", "Lab 🧪", "Pharmacy 💊", "Emergency 🚑"].map((item) => (
                      <div key={item} className="rounded-lg bg-white/15 p-2 text-center">
                        <p className="text-white text-[10px] font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Home bar */}
                <div className="absolute bottom-3">
                  <div className="h-1 w-20 rounded-full bg-white/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
