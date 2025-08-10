
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const galleryItemSchema = z.object({
  src: z.string().url('Image URL must be a valid URL.'),
  alt: z.string().min(1, 'Alt text is required.'),
  hint: z.string().min(1, 'AI Hint is required.'),
});

type GalleryItemFormData = z.infer<typeof galleryItemSchema>;

interface GalleryItemFormProps {
  onSubmit: (data: GalleryItemFormData) => void;
  defaultValues?: GalleryItemFormData | null;
}

export function GalleryItemForm({ onSubmit, defaultValues }: GalleryItemFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<GalleryItemFormData>({
    resolver: zodResolver(galleryItemSchema),
    defaultValues: defaultValues || {
      src: '',
      alt: '',
      hint: '',
    },
  });

  async function handleFormSubmit(data: GalleryItemFormData) {
    setIsLoading(true);
    await onSubmit(data);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="src"
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
          name="alt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alt Text</FormLabel>
              <FormControl>
                <Input placeholder="e.g., AI Generated Art" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI Hint</FormLabel>
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
          {isLoading ? 'Saving...' : 'Save Image'}
        </Button>
      </form>
    </Form>
  );
}
