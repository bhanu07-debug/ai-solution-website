
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Search, Clock, ArrowRight } from "lucide-react";
import { getEvents } from "@/lib/firestore";
import type { Event } from '@/lib/mock-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [locations, setLocations] = useState<string[]>([]);
    const [activeLocation, setActiveLocation] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            const fetchedEvents = await getEvents();
            setEvents(fetchedEvents);
            setFilteredEvents(fetchedEvents);

            const allLocations = fetchedEvents.map(e => e.location);
            const uniqueLocations = ['All', ...Array.from(new Set(allLocations))];
            setLocations(uniqueLocations);
            setIsLoading(false);
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        let newFilteredEvents = events;

        if (activeLocation !== 'All') {
            newFilteredEvents = newFilteredEvents.filter(event => event.location === activeLocation);
        }

        if (searchTerm) {
            newFilteredEvents = newFilteredEvents.filter(event => 
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredEvents(newFilteredEvents);
    }, [searchTerm, activeLocation, events]);

    return (
        <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
            <div className="text-center mb-12">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">Upcoming Events</h1>
                <p className="mt-2 text-lg text-muted-foreground">Connect with us at these industry events.</p>
            </div>
            <div className="grid lg:grid-cols-4 gap-8 items-start">
                <div className="lg:col-span-1">
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
                                            className="w-full justify-start"
                                            onClick={() => setActiveLocation(loc)}
                                        >
                                            {loc}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-3 grid md:grid-cols-2 gap-8">
                     {isLoading ? (
                        [...Array(2)].map((_, i) => (
                            <Card key={i}><CardContent className="p-6"><Skeleton className="h-80 w-full" /></CardContent></Card>
                        ))
                    ) : filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <Card key={event.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                                <Image 
                                    src={event.imageUrl}
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
                                        <span>{event.location}</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant="outline" className="w-full">
                                        <Link href={`/events/${event.id}`}>View Details <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div className="md:col-span-2 text-center py-16">
                            <p className="text-lg font-semibold">No events found</p>
                            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
