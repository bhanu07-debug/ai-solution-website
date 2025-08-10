
'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, Calendar, MapPin } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EventForm } from '@/components/admin/event-form';

type Event = {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
};

const mockEvents: Event[] = [
    { id: 'e1', title: "AI & The Future of Work Summit", date: "November 15, 2023", location: "Virtual", description: "Join industry leaders to discuss the impact of AI on the workforce and how to prepare for the future." },
    { id: 'e2', title: "Advanced Machine Learning Workshop", date: "December 5, 2023", location: "San Francisco, CA", description: "A hands-on workshop for developers looking to deepen their ML skills." },
    { id: 'e3', title: "AI in Healthcare Conference", date: "January 20, 2024", location: "Boston, MA", description: "Exploring the latest innovations in AI for patient care, diagnostics, and research." },
];

export default function AdminEventsPage() {
    const [events, setEvents] = useState<Event[]>(mockEvents);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    const handleAddEvent = () => {
        setEditingEvent(null);
        setIsDialogOpen(true);
    };

    const handleEditEvent = (event: Event) => {
        setEditingEvent(event);
        setIsDialogOpen(true);
    };

    const handleDeleteEvent = (id: string) => {
        setEvents(prev => prev.filter(event => event.id !== id));
    };

    const handleFormSubmit = (data: Omit<Event, 'id'>) => {
        if (editingEvent) {
            setEvents(prev => prev.map(s => s.id === editingEvent.id ? { ...data, id: s.id } : s));
        } else {
            setEvents(prev => [...prev, { ...data, id: `e${prev.length + 1}` }]);
        }
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
                   <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Date</TableHead>
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
