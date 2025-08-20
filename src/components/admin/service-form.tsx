
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
  imageUrl: z.string().url('Image URL must be a valid URL.'),
  imageHint: z.string().min(1, 'Image hint is required.'),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  onSubmit: (data: Omit<Service, 'id'>) => void;
  defaultValues?: Service | null;
}

export function ServiceForm({ onSubmit, defaultValues }: ServiceFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      imageUrl: '',
      imageHint: '',
    },
  });

  async function handleFormSubmit(data: ServiceFormData) {
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
              <FormLabel>Service Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., AI Automation" {...field} />
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
                <Textarea placeholder="Describe the service..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://placehold.co/600x400.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageHint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Hint</FormLabel>
              <FormControl>
                <Input placeholder="e.g., abstract technology" {...field} />
              </FormControl>
               <p className="text-xs text-muted-foreground">
                One or two keywords for image generation.
              </p>
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
