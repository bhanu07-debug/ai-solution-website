import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

export default function EventsPage() {
    const events = [
        {
            title: "AI & The Future of Work Summit",
            date: "November 15, 2023",
            location: "Virtual",
            description: "Join industry leaders to discuss the impact of AI on the workforce and how to prepare for the future.",
        },
        {
            title: "Advanced Machine Learning Workshop",
            date: "December 5, 2023",
            location: "San Francisco, CA",
            description: "A hands-on workshop for developers looking to deepen their ML skills.",
        },
        {
            title: "AI in Healthcare Conference",
            date: "January 20, 2024",
            location: "Boston, MA",
            description: "Exploring the latest innovations in AI for patient care, diagnostics, and research.",
        },
    ];

    return (
        <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
            <div className="text-center mb-12">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">Upcoming Events</h1>
                <p className="mt-2 text-lg text-muted-foreground">Connect with us at these industry events.</p>
            </div>
            <div className="space-y-8 max-w-3xl mx-auto">
                {events.map((event, index) => (
                    <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="font-headline">{event.title}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4" />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{event.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button>Register Now</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
