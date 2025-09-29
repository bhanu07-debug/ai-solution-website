
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Logo } from "@/components/icons/logo";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/gallery", label: "Gallery" },
    { href: "/events", label: "Events" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
    { href: "/feedback", label: "Feedback" },
];

export function SiteHeader() {
    const pathname = usePathname();

    const NavLink = ({ href, label }: { href: string, label: string }) => (
        <Link
            href={href}
            className={cn(
                "transition-colors hover:text-primary",
                pathname === href ? "text-primary font-semibold" : "text-muted-foreground"
            )}
        >
            {label}
        </Link>
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Logo className="h-8 w-8 text-primary" />
                    <span className="font-bold font-headline text-lg">AI Solution</span>
                </Link>

                <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
                    {navLinks.map(link => <NavLink key={link.href} {...link} />)}
                </nav>

                <div className="flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <nav className="grid gap-6 text-lg font-medium mt-10">
                                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                                    <Logo className="h-6 w-6 text-primary" />
                                    <span>AI Solution</span>
                                </Link>
                                {navLinks.map(link => (
                                    <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-primary">
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
