
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, Calendar, MapPin, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EventForm } from '@/components/admin/event-form';
import { type Event } from '@/lib/mock-data';
import { getEvents, createEvent, updateEvent, deleteEvent } from '@/lib/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

     useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setIsLoading(true);
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
        setIsLoading(false);
    };

    const handleAddEvent = () => {
        setEditingEvent(null);
        setIsDialogOpen(true);
    };

    const handleEditEvent = (event: Event) => {
        setEditingEvent(event);
        setIsDialogOpen(true);
    };

    const handleDeleteEvent = async (id: string) => {
        await deleteEvent(id);
        fetchEvents();
    };

    const handleFormSubmit = async (data: Omit<Event, 'id'>) => {
        if (editingEvent) {
            await updateEvent(editingEvent.id, data);
        } else {
            await createEvent(data);
        }
        fetchEvents();
        setIsDialogOpen(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-headline">Manage Events</h1>
                <Button onClick={handleAddEvent}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Event
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Your Events</CardTitle>
                    <CardDescription>Add, edit, or remove events.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                         <div className="space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    ) : (
                   <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell className="font-medium">{event.title}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground"/>
                                            {event.date}
                                        </div>
                                    </TableCell>
                                     <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground"/>
                                            {event.time}
                                        </div>
                                    </TableCell>
                                     <TableCell>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground"/>
                                            {event.location}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEditEvent(event)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    )}
                </CardContent>
            </Card>

             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
                    </DialogHeader>
                    <EventForm onSubmit={handleFormSubmit} defaultValues={editingEvent} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
