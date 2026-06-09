import Link from "next/link";
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const footerLinks = {
    Services: [
        { label: "Find Doctors", href: "/doctors" },
        { label: "Video Consultation", href: "/video-consult" },
        { label: "Lab Tests", href: "/lab-tests" },
        { label: "Pharmacy", href: "/pharmacy" },
        { label: "Emergency Care", href: "/emergency" },
    ],
    Company: [
        { label: "About Us", href: "/about" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Blog", href: "/blog" },
    ],
    Support: [
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Refund Policy", href: "/refund" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main footer */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">

                    {/* Brand col */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600">
                                <Heart className="h-5 w-5 text-white" strokeWidth={2.5} />
                            </div>
                            <span className="text-lg font-bold text-white">Ph-Healthcare</span>
                        </Link>

                        <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                            Bangladesh&apos;s trusted digital health platform — connecting patients to verified doctors, labs, and pharmacies since 2022.
                        </p>

                        {/* Contact */}
                        <div className="mt-6 space-y-2.5 text-sm">
                            <a href="tel:16789" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                                <Phone className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                Helpline: 16789 (24/7)
                            </a>
                            <a href="mailto:support@ph-healthcare.com.bd" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                                <Mail className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                support@ph-healthcare.com.bd
                            </a>
                            <p className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                House 12, Road 4, Agrabad, Chattogram, Bangladesh
                            </p>
                        </div>

                        {/* Social */}
                        <div className="mt-6 flex gap-3">
                            {[
                                { Icon: Facebook, href: "#", label: "Facebook" },
                                { Icon: Twitter, href: "#", label: "Twitter" },
                                { Icon: Instagram, href: "#", label: "Instagram" },
                                { Icon: Youtube, href: "#", label: "YouTube" },
                            ].map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-emerald-600 hover:text-white transition-colors"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([heading, links]) => (
                        <div key={heading}>
                            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
                                {heading}
                            </h4>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Emergency strip */}
            <div className="border-t border-gray-800 bg-red-900/20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
                    <span className="flex items-center gap-2 text-red-400 font-medium">
                        🚑 Medical Emergency? Call{" "}
                        <a href="tel:999" className="font-bold text-white hover:text-red-300 transition-colors">
                            999
                        </a>{" "}
                        or our helpline{" "}
                        <a href="tel:16789" className="font-bold text-white hover:text-red-300 transition-colors">
                            16789
                        </a>
                    </span>
                    <span className="text-gray-600 text-xs">Available 24 hours, 7 days a week</span>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} Ph-Healthcare. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
                        <Link href="/refund" className="hover:text-gray-300 transition-colors">Refund</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}