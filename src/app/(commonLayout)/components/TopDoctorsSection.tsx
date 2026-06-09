import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ArrowRight } from "lucide-react";

const doctors = [
  {
    name: "Dr. Rafiq Uddin",
    specialty: "Cardiologist",
    degree: "MBBS, MD (Cardiology)",
    hospital: "Square Hospital, Dhaka",
    rating: 4.9,
    reviews: 312,
    fee: "৳ 800",
    available: true,
    emoji: "👨‍⚕️",
    href: "/doctors/rafiq-uddin",
  },
  {
    name: "Dr. Sabrina Islam",
    specialty: "Gynecologist",
    degree: "MBBS, FCPS (Obs & Gynae)",
    hospital: "Evercare Hospital, Dhaka",
    rating: 4.8,
    reviews: 278,
    fee: "৳ 1,000",
    available: true,
    emoji: "👩‍⚕️",
    href: "/doctors/sabrina-islam",
  },
  {
    name: "Dr. Tanvir Hossain",
    specialty: "Neurologist",
    degree: "MBBS, MD (Neurology)",
    hospital: "BIRDEM General, Dhaka",
    rating: 4.7,
    reviews: 195,
    fee: "৳ 900",
    available: false,
    emoji: "👨‍⚕️",
    href: "/doctors/tanvir-hossain",
  },
  {
    name: "Dr. Nadia Chowdhury",
    specialty: "Dermatologist",
    degree: "MBBS, DDV",
    hospital: "City Hospital, Chattogram",
    rating: 4.9,
    reviews: 241,
    fee: "৳ 700",
    available: true,
    emoji: "👩‍⚕️",
    href: "/doctors/nadia-chowdhury",
  },
];

export default function TopDoctorsSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-2">
              Top rated
            </p>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Meet our doctors
            </h2>
            <p className="mt-2 text-gray-500">
              Every doctor is verified, credentialed, and reviewed by real patients.
            </p>
          </div>
          <Button asChild variant="outline" className="self-start sm:self-auto border-emerald-200 text-emerald-700 hover:bg-emerald-50 gap-1 flex-shrink-0">
            <Link href="/doctors">
              All doctors <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doc) => (
            <div
              key={doc.name}
              className="group rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* Top strip */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-5 pt-6 pb-4 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-white shadow-sm flex items-center justify-center text-3xl mb-3">
                  {doc.emoji}
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">
                  {doc.name}
                </h3>
                <p className="text-xs text-emerald-600 font-medium mt-0.5">{doc.specialty}</p>
                <p className="text-xs text-gray-400 mt-0.5">{doc.degree}</p>
              </div>

              {/* Body */}
              <div className="px-5 py-4 flex flex-col gap-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <MapPin className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                  {doc.hospital}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-gray-800">{doc.rating}</span>
                    <span className="text-gray-400 text-xs">({doc.reviews})</span>
                  </div>
                  <Badge
                    className={`text-xs border-0 ${
                      doc.available
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {doc.available ? "Available" : "Busy"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                  <span className="text-sm font-semibold text-gray-800">
                    {doc.fee} <span className="text-xs font-normal text-gray-400">/ visit</span>
                  </span>
                  <Button
                    asChild
                    size="sm"
                    disabled={!doc.available}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs disabled:opacity-50"
                  >
                    <Link href={doc.href}>Book Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
