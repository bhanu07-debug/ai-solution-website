
"use client";

import { useState } from 'react';
import { ContactForm } from '@/components/contact-form';
import { type Inquiry } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();

  const handleContactSubmit = async (data: Omit<Inquiry, 'id' | 'createdAt'>) => {
     try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        const errorMessage = result.errors ? result.errors[0].message : 'An unknown error occurred.';
        throw new Error(errorMessage);
      }

      if (result.success) {
        toast({
          title: "Inquiry Submitted!",
          description: "Thank you for your message. We will get back to you shortly.",
        });
      } else {
        throw new Error(result.message || 'Failed to submit your message.');
      }
    } catch (error: any) {
      console.error('Contact form submission error:', error);
      toast({
        variant: 'destructive',
        title: "Submission Failed",
        description: error.message || "There was a problem submitting your message. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Contact Us</h1>
        <p className="mt-2 text-lg text-muted-foreground">We'd love to hear from you. Get in touch with us.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6 text-primary" />
                        <a href="mailto:contact@aisolutionshub.com" className="text-lg hover:underline">contact@aisolutionshub.com</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-primary" />
                        <span className="text-lg">(123) 456-7890</span>
                    </div>
                     <div className="flex items-center gap-4">
                        <MapPin className="h-6 w-6 text-primary" />
                        <span className="text-lg">123 AI Avenue, Tech City, 12345</span>
                    </div>
                </CardContent>
            </Card>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Send a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm onSubmit={handleContactSubmit} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
