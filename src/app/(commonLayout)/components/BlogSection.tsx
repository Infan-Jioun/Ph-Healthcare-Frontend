import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";

const articles = [
  {
    category: "Heart Health",
    categoryColor: "bg-rose-100 text-rose-600",
    title: "7 daily habits that keep your heart strong after 40",
    excerpt:
      "Small lifestyle adjustments — from morning walks to cutting processed salt — can dramatically reduce cardiac risk over time.",
    readTime: "5 min read",
    date: "June 2, 2025",
    emoji: "❤️",
    href: "/blog/heart-health-habits",
  },
  {
    category: "Diabetes",
    categoryColor: "bg-amber-100 text-amber-700",
    title: "Understanding blood sugar spikes: what you eat matters",
    excerpt:
      "Glycemic index isn't just for diabetics. Learn how different foods affect your energy and long-term metabolic health.",
    readTime: "4 min read",
    date: "May 28, 2025",
    emoji: "🩸",
    href: "/blog/blood-sugar-diet",
  },
  {
    category: "Mental Health",
    categoryColor: "bg-teal-100 text-teal-700",
    title: "Anxiety or stress? How to tell the difference and what to do",
    excerpt:
      "Both feel overwhelming, but they need different responses. A Dhaka-based therapist explains the key signs to watch for.",
    readTime: "6 min read",
    date: "May 20, 2025",
    emoji: "🧠",
    href: "/blog/anxiety-vs-stress",
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-2">
              Health knowledge
            </p>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Articles worth reading
            </h2>
            <p className="mt-2 text-gray-500">
              Written by verified doctors and health professionals.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="self-start sm:self-auto border-emerald-200 text-emerald-700 hover:bg-emerald-50 gap-1 flex-shrink-0"
          >
            <Link href="/blog">
              All articles <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link
              key={a.title}
              href={a.href}
              className="group rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col"
            >
              {/* Image placeholder */}
              <div className="h-40 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center text-6xl">
                {a.emoji}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <Badge className={`w-fit text-xs border-0 ${a.categoryColor}`}>
                  {a.category}
                </Badge>
                <h3 className="font-semibold text-gray-800 leading-snug group-hover:text-emerald-700 transition-colors">
                  {a.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{a.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 border-t border-gray-100">
                  <Clock className="h-3.5 w-3.5" />
                  {a.readTime}
                  <span className="ml-auto">{a.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
