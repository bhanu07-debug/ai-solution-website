
import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Linkedin, Twitter, Github, Youtube, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

const footerLinks = {
    services: [
        { label: "Machine Learning", href: "/services" },
        { label: "Natural Language Processing", href: "/services" },
        { label: "Computer Vision", href: "/services" },
        { label: "AI Consulting", href: "/services" },
    ],
    company: [
        { label: "About Us", href: "/contact" },
        { label: "Our Projects", href: "/projects" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
    ],
    resources: [
        { label: "Gallery", href: "/gallery" },
        { label: "Events", href: "/events" },
        { label: "Feedback", href: "/feedback" },
        { label: "Contact Us", href: "/contact" },
    ],
};


export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border/40 bg-secondary/50 text-foreground">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {/* Company Info */}
            <div className="flex flex-col gap-4">
                 <Link href="/" className="flex items-center gap-2 mb-2">
                    <Logo className="h-8 w-8 text-primary" />
                    <span className="font-bold font-headline text-xl">AISolutions Hub</span>
                </Link>
                <p className="text-muted-foreground text-sm max-w-xs">
                    Transforming businesses with cutting-edge artificial intelligence solutions. We make AI accessible, practical, and impactful.
                </p>
                <div className="space-y-3 mt-2 text-sm">
                    <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground"/>
                        <a href="mailto:contact@aisolutionshub.com" className="hover:text-primary">contact@aisolutionshub.com</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground"/>
                        <span>(123) 456-7890</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground"/>
                        <span>123 AI Avenue, Tech City, CA 94000</span>
                    </div>
                </div>
            </div>

            {/* Links Sections */}
            <FooterLinkSection title="Services" links={footerLinks.services} />
            <FooterLinkSection title="Company" links={footerLinks.company} />
            <FooterLinkSection title="Resources" links={footerLinks.resources} />
        </div>

        <div className="border-t border-border/40 mt-12 pt-8">
            <div className="grid gap-8 md:grid-cols-2">
                <div>
                    <h3 className="font-headline font-semibold text-lg">Stay Updated with AI Insights</h3>
                    <p className="text-muted-foreground text-sm mt-1">Get the latest AI trends, case studies, and industry insights delivered to your inbox.</p>
                </div>
                <form className="flex items-center gap-2">
                    <Input type="email" placeholder="Enter your email" className="bg-background"/>
                    <Button type="submit">Subscribe</Button>
                </form>
            </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
           <p className="text-muted-foreground">&copy; {new Date().getFullYear()} AISolutions Hub. All rights reserved.</p>
           <div className="flex items-center gap-4 text-muted-foreground">
                <Link href="#" className="hover:text-primary">Privacy Policy</Link>
                <Link href="#" className="hover:text-primary">Terms of Service</Link>
                 <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="#"><Linkedin className="h-5 w-5"/></Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="#"><Twitter className="h-5 w-5"/></Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="#"><Github className="h-5 w-5"/></Link>
                    </Button>
                     <Button variant="ghost" size="icon" asChild>
                        <Link href="#"><Youtube className="h-5 w-5"/></Link>
                    </Button>
                </div>
           </div>
        </div>
      </div>
    </footer>
  );
}


const FooterLinkSection = ({title, links}: {title: string, links: {label: string, href: string}[]}) => (
    <div>
        <h4 className="font-headline font-semibold mb-4">{title}</h4>
        <ul className="space-y-3">
            {links.map(link => (
                <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
)
