
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Project } from '@/lib/mock-data';

const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  technologies: z.string().min(1, 'Please list at least one technology.'),
  imageUrl: z.string().url('Image URL must be a valid URL.'),
  imageHint: z.string().min(1, 'Image hint is required.'),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  onSubmit: (data: Omit<Project, 'id' | 'technologies'> & { technologies: string[] }) => void;
  defaultValues?: Project | null;
}

export function ProjectForm({ onSubmit, defaultValues }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
      technologies: defaultValues?.technologies.join(', ') || '',
      imageUrl: defaultValues?.imageUrl || '',
      imageHint: defaultValues?.imageHint || '',
    },
  });

  async function handleFormSubmit(data: ProjectFormData) {
    setIsLoading(true);
    const technologies = data.technologies.split(',').map(tech => tech.trim());
    await onSubmit({ ...data, technologies });
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
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., E-commerce Recommendation Engine" {...field} />
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
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the project..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies</FormLabel>
              <FormControl>
                <Input placeholder="e.g., React, Next.js, Python" {...field} />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Enter technologies separated by commas.
              </p>
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-bold" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Project'}
        </Button>
      </form>
    </Form>
  );
}
