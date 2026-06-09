"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Mail } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-14 bg-emerald-50 border-y border-emerald-100">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <Mail className="h-6 w-6 text-emerald-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Health tips, delivered to your inbox
        </h2>
        <p className="mt-3 text-gray-500 text-sm sm:text-base">
          Join 12,000+ readers who get weekly advice from verified doctors — no spam, unsubscribe anytime.
        </p>

        {submitted ? (
          <div className="mt-8 flex flex-col items-center gap-3">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            <p className="text-emerald-700 font-semibold">You're subscribed! Check your inbox.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 border-emerald-200 focus-visible:ring-emerald-400"
            />
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex-shrink-0"
            >
              Subscribe
            </Button>
          </form>
        )}

        <p className="mt-4 text-xs text-gray-400">
          We respect your privacy. No spam — only real health guidance.
        </p>
      </div>
    </section>
  );
}
