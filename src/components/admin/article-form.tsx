
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Article } from '@/lib/mock-data';

const articleSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters.'),
  date: z.string().min(1, 'Date is required.'),
  imageUrl: z.string().url('Image URL must be a valid URL.'),
  imageHint: z.string().min(1, 'Image hint is required.'),
});

type ArticleFormData = z.infer<typeof articleSchema>;

interface ArticleFormProps {
  onSubmit: (data: Omit<Article, 'id'>) => void;
  defaultValues?: Article | null;
}

export function ArticleForm({ onSubmit, defaultValues }: ArticleFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: defaultValues || {
      title: '',
      excerpt: '',
      date: new Date().toISOString().split('T')[0], // Today's date
      imageUrl: '',
      imageHint: '',
    },
  });

  async function handleFormSubmit(data: ArticleFormData) {
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
              <FormLabel>Article Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., The Future of AI" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea placeholder="A short summary of the article..." {...field} />
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
                <FormLabel>Publication Date</FormLabel>
                <FormControl>
                    <Input type="date" {...field} />
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
        </div>
         <FormField
            control={form.control}
            name="imageHint"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Image Hint</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., abstract technology" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        <Button type="submit" className="w-full font-bold" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Article'}
        </Button>
      </form>
    </Form>
  );
}
