import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, ShieldCheck, Clock, Star } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16 sm:py-20 lg:py-28">
            {/* Soft background blobs */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-teal-100/50 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                    {/* Left — copy */}
                    <div className="text-center lg:text-left">
                        <Badge className="mb-5 inline-flex gap-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 px-3 py-1 text-xs font-medium">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Trusted by 50,000+ patients across Bangladesh
                        </Badge>

                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            Your health,{" "}
                            <span className="text-emerald-600">our priority</span>
                            <br />— every single day.
                        </h1>

                        <p className="mt-5 text-lg text-gray-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Book doctors, order medicines, get lab tests done — all from one
                            place. Ph-Healthcare makes quality care simple and accessible.
                        </p>

                        {/* Search bar */}
                        <div className="mt-8 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-md max-w-lg mx-auto lg:mx-0 focus-within:ring-2 focus-within:ring-emerald-400 focus-within:border-transparent transition">
                            <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Search doctors, specialties, services…"
                                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                            />
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white flex-shrink-0">
                                Search
                            </Button>
                        </div>

                        {/* CTA buttons */}
                        <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                                <Link href="/doctors">
                                    Book an Appointment <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                                <Link href="/about">How it works</Link>
                            </Button>
                        </div>

                        {/* Trust signals */}
                        <div className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-emerald-500" /> 24/7 Available
                            </span>
                            <span className="flex items-center gap-1.5">
                                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Verified Doctors
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Star className="h-4 w-4 text-emerald-500" /> 4.9 Avg. Rating
                            </span>
                        </div>
                    </div>

                    {/* Right — visual card cluster */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-sm">
                            {/* Main card */}
                            <div className="rounded-2xl bg-white shadow-xl p-6 border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-xl">👨‍⚕️</div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Dr. Rafiq Uddin</p>
                                        <p className="text-xs text-gray-500">Cardiologist · MBBS, MD</p>
                                    </div>
                                    <Badge className="ml-auto bg-emerald-50 text-emerald-600 border-0 text-xs">Available</Badge>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {["Mon", "Wed", "Fri"].map((d) => (
                                        <span key={d} className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">{d}</span>
                                    ))}
                                </div>
                                <Button className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm">
                                    Book Slot — 10:00 AM
                                </Button>
                            </div>

                            {/* Floating stat pills */}
                            <div className="absolute -top-4 -left-6 rounded-xl bg-white shadow-lg px-4 py-2 border border-gray-100 flex items-center gap-2 text-sm">
                                <span className="text-2xl">⭐</span>
                                <div>
                                    <p className="font-bold text-gray-800 leading-none">4.9/5</p>
                                    <p className="text-xs text-gray-400">Patient rating</p>
                                </div>
                            </div>
                            <div className="absolute -bottom-4 -right-6 rounded-xl bg-emerald-600 shadow-lg px-4 py-2 flex items-center gap-2 text-sm text-white">
                                <span className="text-xl">🏥</span>
                                <div>
                                    <p className="font-bold leading-none">200+</p>
                                    <p className="text-xs opacity-80">Specialist doctors</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}