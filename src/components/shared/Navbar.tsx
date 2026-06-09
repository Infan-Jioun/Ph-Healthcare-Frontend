"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
    Menu,
    Heart,
    Phone,
    ChevronDown,
    Stethoscope,
    Calendar,
    FlaskConical,
    Pill,
    Ambulance,
    User,
    LogOut,
    Settings,
    Bell,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface NavService {
    title: string;
    href: string;
    description: string;
    icon: React.ReactNode;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const services: NavService[] = [
    {
        title: "Find Doctors",
        href: "/doctors",
        description: "Book appointments with verified specialists near you.",
        icon: <Stethoscope className="h-4 w-4 text-emerald-600" />,
    },
    {
        title: "Appointments",
        href: "/appointments",
        description: "Manage and track your upcoming consultations.",
        icon: <Calendar className="h-4 w-4 text-emerald-600" />,
    },
    {
        title: "Lab Tests",
        href: "/lab-tests",
        description: "Order diagnostic tests and view results online.",
        icon: <FlaskConical className="h-4 w-4 text-emerald-600" />,
    },
    {
        title: "Pharmacy",
        href: "/pharmacy",
        description: "Order medicines with fast home delivery.",
        icon: <Pill className="h-4 w-4 text-emerald-600" />,
    },
    {
        title: "Emergency",
        href: "/emergency",
        description: "24/7 ambulance and critical care services.",
        icon: <Ambulance className="h-4 w-4 text-red-500" />,
    },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const ServiceListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { icon: React.ReactNode; title: string }
>(({ className, title, children, icon, ...props }, ref) => (
    <li>
        <NavigationMenuLink asChild>
            <a
                ref={ref}
                className={cn(
                    "flex select-none gap-3 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                    "hover:bg-emerald-50 hover:text-emerald-900 focus:bg-emerald-50 focus:text-emerald-900",
                    className
                )}
                {...props}
            >
                <div className="mt-0.5 flex-shrink-0">{icon}</div>
                <div className="space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-800">
                        {title}
                    </p>
                    <p className="line-clamp-2 text-xs leading-snug text-gray-500">
                        {children}
                    </p>
                </div>
            </a>
        </NavigationMenuLink>
    </li>
));
ServiceListItem.displayName = "ServiceListItem";

// ─── Main Navbar ─────────────────────────────────────────────────────────────

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    // Simulate auth state — swap with real auth hook
    const isLoggedIn = false;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-emerald-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
            {/* ── Top strip ── */}
            <div className="bg-emerald-700 px-4 py-1.5 text-center text-xs text-emerald-50 hidden sm:block">
                <span className="inline-flex items-center gap-1.5">
                    <Phone className="h-3 w-3" />
                    24/7 Helpline:{" "}
                    <a href="tel:16789" className="font-semibold underline-offset-2 hover:underline">
                        16789
                    </a>
                    <span className="mx-2 opacity-40">|</span>
                    Emergency ambulance available nationwide
                </span>
            </div>

            {/* ── Main nav bar ── */}
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600">
                        <Heart className="h-5 w-5 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="hidden sm:block">
                        <span className="text-lg font-bold text-emerald-700 leading-none tracking-tight">
                            Ph-Healthcare
                        </span>
                        <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">
                            Patient First
                        </p>
                    </div>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden lg:flex items-center">
                    <NavigationMenu>
                        <NavigationMenuList className="gap-1">

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                    className={cn(navigationMenuTriggerStyle(), "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50")}
                                >
                                    <Link href="/">Home</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 data-[state=open]:bg-emerald-50 data-[state=open]:text-emerald-700">
                                    Services
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[480px] grid-cols-2 gap-1 p-3">
                                        {services.map((service) => (
                                            <ServiceListItem
                                                key={service.title}
                                                title={service.title}
                                                href={service.href}
                                                icon={service.icon}
                                            >
                                                {service.description}
                                            </ServiceListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                    className={cn(navigationMenuTriggerStyle(), "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50")}
                                >
                                    <Link href="/doctors">Doctors</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                    className={cn(navigationMenuTriggerStyle(), "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50")}
                                >
                                    <Link href="/about">About</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                    className={cn(navigationMenuTriggerStyle(), "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50")}
                                >
                                    <Link href="/contact">Contact</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-2">

                    {/* Emergency badge */}
                    <Badge
                        variant="destructive"
                        className="hidden md:inline-flex gap-1 text-xs px-2 py-0.5 cursor-pointer"
                    >
                        <Ambulance className="h-3 w-3" />
                        Emergency
                    </Badge>

                    {isLoggedIn ? (
                        <>
                            {/* Notification bell */}
                            <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-emerald-700 hover:bg-emerald-50">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500" />
                            </Button>

                            {/* User dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-emerald-50">
                                        <Avatar className="h-8 w-8 border-2 border-emerald-200">
                                            <AvatarImage src="/avatar.jpg" />
                                            <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs font-semibold">IJ</AvatarFallback>
                                        </Avatar>
                                        <ChevronDown className="h-3.5 w-3.5 text-gray-500 hidden sm:block" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuLabel className="font-normal">
                                        <p className="text-sm font-medium">Infan Rahman</p>
                                        <p className="text-xs text-gray-500">infan@email.com</p>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard" className="flex gap-2">
                                            <User className="h-4 w-4" /> My Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings" className="flex gap-2">
                                            <Settings className="h-4 w-4" /> Settings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600 flex gap-2 cursor-pointer">
                                        <LogOut className="h-4 w-4" /> Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="ghost"
                                asChild
                                className="hidden sm:inline-flex text-gray-700 hover:text-emerald-700 hover:bg-emerald-50"
                            >
                                <Link href="/login">Sign In</Link>
                            </Button>
                            <Button
                                asChild
                                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                            >
                                <Link href="/register">Get Started</Link>
                            </Button>
                        </>
                    )}

                    {/* Mobile hamburger */}
                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden text-gray-600 hover:text-emerald-700 hover:bg-emerald-50"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-72 p-0">
                            <SheetHeader className="px-5 pt-5 pb-4 border-b border-emerald-100 bg-emerald-50">
                                <SheetTitle className="flex items-center gap-2 text-left">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                                        <Heart className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-emerald-700 font-bold">Ph-Healthcare</span>
                                </SheetTitle>
                            </SheetHeader>

                            <nav className="flex flex-col gap-1 p-4">
                                {[
                                    { label: "Home", href: "/" },
                                    { label: "Doctors", href: "/doctors" },
                                    { label: "Appointments", href: "/appointments" },
                                    { label: "Lab Tests", href: "/lab-tests" },
                                    { label: "Pharmacy", href: "/pharmacy" },
                                    { label: "About", href: "/about" },
                                    { label: "Contact", href: "/contact" },
                                ].map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                                    <Button variant="outline" asChild className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                                        <Link href="/login" onClick={() => setMobileOpen(false)}>Sign In</Link>
                                    </Button>
                                    <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                                        <Link href="/register" onClick={() => setMobileOpen(false)}>Get Started</Link>
                                    </Button>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <a
                                        href="tel:16789"
                                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 font-medium hover:bg-red-50 transition-colors"
                                    >
                                        <Ambulance className="h-4 w-4" />
                                        Emergency: 16789
                                    </a>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>

                </div>
            </div>
        </header>
    );
}