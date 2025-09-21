
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { type Feedback } from '@/lib/types';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  company: z.string().optional(),
  email: z.string().email('A valid email is required.'),
  country: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type FeedbackFormData = Omit<z.infer<typeof feedbackSchema>, 'rating'>;

interface FeedbackFormProps {
  onSubmit: (data: Omit<Feedback, 'id' | 'status' | 'createdAt' | 'rating'>) => Promise<void>;
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      country: '',
      message: '',
    },
  });

  async function handleFormSubmit(data: FeedbackFormData) {
    setIsLoading(true);
    await onSubmit(data);
    setIsLoading(false);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                    <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Company (Optional)</FormLabel>
                    <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Country (Optional)</FormLabel>
                    <FormControl>
                    <Input placeholder="e.g. USA" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about your experience..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-bold" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>
    </Form>
  );
}
