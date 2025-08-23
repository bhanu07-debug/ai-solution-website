
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const applicationSchema = z.object({
  fullName: z.string().min(3, 'Full name is required.'),
  email: z.string().email('Please enter a valid email address.'),
  coverLetter: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
  jobTitle: string;
  recipientEmail: string;
}

export function ApplicationForm({ jobTitle, recipientEmail }: ApplicationFormProps) {
  const { toast } = useToast();
  
  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      coverLetter: '',
    },
  });

  function handleFormSubmit(data: ApplicationFormData) {
    const subject = `Application for ${jobTitle} - ${data.fullName}`;
    const body = `
Dear Hiring Manager,

Please consider my application for the ${jobTitle} position.

Name: ${data.fullName}
Email: ${data.email}

Cover Letter:
${data.coverLetter || 'No cover letter provided.'}

I have attached my CV for your review.

Sincerely,
${data.fullName}
    `;

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;

    toast({
        title: "Your email app is opening!",
        description: "Please attach your CV and send the email to complete your application.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., John Doe" {...field} />
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
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="e.g., john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Letter (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us why you're a great fit for this role..." {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Attach Your CV</AlertTitle>
            <AlertDescription>
                After clicking Apply, your email client will open. Please remember to manually attach your CV to the email before sending.
            </AlertDescription>
        </Alert>
        <Button type="submit" className="w-full font-bold">
          Apply
        </Button>
      </form>
    </Form>
  );
}

