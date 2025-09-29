
import { getEvent } from '@/lib/firestore';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
        <div className="mb-8">
            <Button asChild variant="ghost">
                <Link href="/events" className="flex items-center gap-2 text-muted-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Events
                </Link>
            </Button>
        </div>
        <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
                <Card className="overflow-hidden shadow-lg">
                    <Image
                        src={event.imageUrl || "https://placehold.co/1200x675.png"}
                        alt={event.title}
                        width={1200}
                        height={675}
                        className="w-full object-cover"
                        data-ai-hint={event.imageHint}
                        priority
                    />
                </Card>
                 <article>
                    <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-4">{event.title}</h1>
                    <div 
                        className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground"
                    >
                        <p>{event.description}</p>
                    </div>
                </article>
            </div>
            <div className="lg:col-span-1">
                <Card className="shadow-lg sticky top-24">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Event Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Calendar className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h4 className="font-semibold">Date</h4>
                                <p className="text-muted-foreground">{event.date}</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Clock className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h4 className="font-semibold">Time</h4>
                                <p className="text-muted-foreground">{event.time}</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h4 className="font-semibold">Location</h4>
                                <p className="text-muted-foreground">{event.location}</p>
                            </div>
                        </div>
                        <Button asChild size="lg" className="w-full font-bold">
                            <Link href="/contact">Register or Inquire</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
