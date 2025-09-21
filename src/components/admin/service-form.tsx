
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Service } from '@/lib/mock-data';

const serviceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  benefits: z.string().min(3, 'Please list at least one benefit.'),
  price: z.string().min(1, 'Price is required.'),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  onSubmit: (data: Omit<Service, 'id'|'benefits'> & {benefits: string[]}) => void;
  defaultValues?: Service | null;
}

export function ServiceForm({ onSubmit, defaultValues }: ServiceFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
      benefits: defaultValues?.benefits.join(', ') || '',
      price: defaultValues?.price || '',
    },
  });

  async function handleFormSubmit(data: ServiceFormData) {
    setIsLoading(true);
    const benefits = data.benefits.split(',').map(b => b.trim());
    await onSubmit({...data, benefits});
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
              <FormLabel>Service Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., AI-Powered Automation" {...field} />
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
              <FormLabel>Service Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the service..." {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="benefits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Benefits</FormLabel>
              <FormControl>
                <Textarea placeholder="Benefit 1, Benefit 2, Benefit 3" {...field} rows={3} />
              </FormControl>
               <p className="text-xs text-muted-foreground">
                Enter benefits separated by commas.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Starting Price</FormLabel>
              <FormControl>
                <Input placeholder="$5000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-bold" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Service'}
        </Button>
      </form>
    </Form>
  );
}
