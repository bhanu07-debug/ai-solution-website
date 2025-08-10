import { Logo } from "@/components/icons/logo";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">AISolutions Hub</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AISolutions Hub. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6 text-sm">
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
