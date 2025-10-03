
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Search, Clock, ArrowRight, Award } from "lucide-react";
import { getEvents } from "@/lib/firestore";
import type { Event } from '@/lib/mock-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { isPast, parse } from 'date-fns';

export default function EventsPage() {
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [promotionalEvent, setPromotionalEvent] = useState<Event | null>(null);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [pastEvents, setPastEvents] = useState<Event[]>([]);
    const [filteredUpcoming, setFilteredUpcoming] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [locations, setLocations] = useState<string[]>([]);
    const [activeLocation, setActiveLocation] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            const fetchedEvents = await getEvents();
            const now = new Date();

            const upcoming: Event[] = [];
            const past: Event[] = [];
            let promo: Event | null = null;

            fetchedEvents.forEach(event => {
                if (event.isPromotional) {
                    promo = event;
                }
                
                try {
                    // Attempt to parse dates like "November 12-14, 2024" by taking the first part.
                    const dateString = event.date.split('-')[0].trim();
                    const eventDate = parse(dateString, 'MMMM d, yyyy', new Date());

                    if (!isNaN(eventDate.getTime()) && isPast(eventDate)) {
                         past.push(event);
                    } else {
                         upcoming.push(event);
                    }
                } catch (e) {
                    // If parsing fails, assume it's an upcoming event
                    upcoming.push(event);
                }
            });
            
            // If a promotional event is also in the upcoming list, remove it to avoid duplication.
            if (promo) {
                const promoIndex = upcoming.findIndex(e => e.id === promo!.id);
                if (promoIndex > -1) {
                    upcoming.splice(promoIndex, 1);
                }
            }


            setAllEvents(fetchedEvents);
            setPromotionalEvent(promo);
            setUpcomingEvents(upcoming);
            setPastEvents(past.sort((a,b) => b.date.localeCompare(a.date))); // Show most recent past events first
            setFilteredUpcoming(upcoming);

            const allLocations = fetchedEvents.map(e => e.location);
            const uniqueLocations = ['All', ...Array.from(new Set(allLocations))];
            setLocations(uniqueLocations);
            setIsLoading(false);
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        let newFilteredEvents = upcomingEvents;

        if (activeLocation !== 'All') {
            newFilteredEvents = newFilteredEvents.filter(event => event.location === activeLocation);
        }

        if (searchTerm) {
            newFilteredEvents = newFilteredEvents.filter(event => 
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredUpcoming(newFilteredEvents);
    }, [searchTerm, activeLocation, upcomingEvents]);

    const EventCard = ({ event }: { event: Event }) => (
        <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
            <Image 
                src={event.imageUrl || "https://placehold.co/600x400.png"}
                alt={event.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
                data-ai-hint={event.imageHint}
            />
            <CardHeader>
                <CardTitle className="font-headline">{event.title}</CardTitle>
                 <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground pt-2">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
               <CardDescription>{event.description}</CardDescription>
               <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{event.location}</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild variant="outline" className="w-full">
                    <Link href={`/events/${event.id}`}>View Details <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </CardFooter>
        </Card>
    );
    
    const FilterSidebar = () => (
        <Card className="shadow-lg sticky top-24">
            <CardHeader>
                <CardTitle className="font-headline">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Search events..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Locations</h4>
                    <div className="flex flex-col items-start gap-1">
                        {locations.map(loc => (
                            <Button 
                                key={loc} 
                                variant={activeLocation === loc ? 'secondary' : 'ghost'}
                                className="w-full justify-start text-left h-auto py-2"
                                onClick={() => setActiveLocation(loc)}
                            >
                                <span className="truncate">{loc}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
            {isLoading ? <Skeleton className="h-24 w-1/2 mx-auto mb-12" /> : (
                <div className="text-center mb-12">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">Events</h1>
                    <p className="mt-2 text-lg text-muted-foreground">Connect with us at these industry events.</p>
                </div>
            )}
            
            {/* Main Content Area */}
            <div className="grid lg:grid-cols-4 gap-12 items-start">
                {/* Left Column: Featured Event or Filters */}
                <div className="lg:col-span-3">
                    {promotionalEvent && (
                        <section className="mb-12">
                            <h2 className="font-headline text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                                <Award className="h-8 w-8 text-primary" />
                                Featured Event
                            </h2>
                            <div className="max-w-3xl mx-auto lg:max-w-none">
                                <EventCard event={promotionalEvent} />
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column: Filters */}
                <div className="lg:col-span-1">
                   {!promotionalEvent ? null : <FilterSidebar />}
                </div>
            </div>

            {/* Upcoming Events */}
            <section className="mb-20">
                <h2 className="font-headline text-3xl font-bold text-center mb-8">Upcoming Events</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        [...Array(3)].map((_, i) => (
                            <Card key={i}><CardContent className="p-6"><Skeleton className="h-80 w-full" /></CardContent></Card>
                        ))
                    ) : filteredUpcoming.length > 0 ? (
                        filteredUpcoming.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <div className="md:col-span-2 lg:col-span-3 text-center py-16">
                            <p className="text-lg font-semibold">No upcoming events found</p>
                            <p className="text-muted-foreground">Try adjusting your search criteria or check back soon!</p>
                        </div>
                    )}
                </div>
            </section>

             {/* Past Events */}
            {pastEvents.length > 0 && (
                <section>
                    <h2 className="font-headline text-3xl font-bold text-center mb-8">Past Events</h2>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {isLoading ? (
                            [...Array(3)].map((_, i) => (
                                <Card key={i}><CardContent className="p-6"><Skeleton className="h-80 w-full" /></CardContent></Card>
                            ))
                        ) : (
                            pastEvents.map((event) => (
                                <div key={event.id} className="opacity-70">
                                    <EventCard event={event} />
                                </div>
                            ))
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}
