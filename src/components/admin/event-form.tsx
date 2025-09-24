
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { type Event } from '@/lib/mock-data';

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  date: z.string().min(1, 'Date is required.'),
  time: z.string().min(1, 'Time is required.'),
  location: z.string().min(1, 'Location is required.'),
});

type EventFormData = z.infer<typeof eventSchema>;

interface EventFormProps {
  onSubmit: (data: Omit<Event, 'id'>) => void;
  defaultValues?: Event | null;
}

export function EventForm({ onSubmit, defaultValues }: EventFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
    },
  });

  async function handleFormSubmit(data: EventFormData) {
    setIsLoading(true);
    await onSubmit(data);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., AI Summit 2024" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the event..." {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Event Date</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., November 15, 2024" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Event Time</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., 9:00 AM PST" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
         <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Event Location</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Virtual or San Francisco, CA" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        <Button type="submit" className="w-full font-bold" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Event'}
        </Button>
      </form>
    </Form>
  );
}
