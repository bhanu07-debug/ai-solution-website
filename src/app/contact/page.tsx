
"use client";

import { useState } from 'react';
import { FeedbackForm } from '@/components/feedback-form';
import { type Feedback } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [pendingFeedback, setPendingFeedback] = useState<Omit<Feedback, 'status' | 'id'>[]>([]);

  const handleFeedbackSubmit = (data: Omit<Feedback, 'status' | 'id'>) => {
    setPendingFeedback(prev => [data, ...prev]);
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
            <FeedbackForm onSubmit={handleFeedbackSubmit} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
