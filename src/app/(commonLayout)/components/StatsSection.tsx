import { Users, Stethoscope, Building2, Star } from "lucide-react";

const stats = [
  { icon: <Users className="h-6 w-6 text-emerald-600" />, value: "50,000+", label: "Patients Served" },
  { icon: <Stethoscope className="h-6 w-6 text-emerald-600" />, value: "200+", label: "Verified Doctors" },
  { icon: <Building2 className="h-6 w-6 text-emerald-600" />, value: "30+", label: "Partner Hospitals" },
  { icon: <Star className="h-6 w-6 text-emerald-600" />, value: "4.9/5", label: "Average Rating" },
];

export default function StatsSection() {
  return (
    <section className="bg-white py-12 border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 rounded-xl p-5 text-center hover:bg-emerald-50 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                {stat.icon}
              </div>
              <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
