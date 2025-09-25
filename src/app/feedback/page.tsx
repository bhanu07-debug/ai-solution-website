
"use client";

import { useState, useEffect } from 'react';
import { FeedbackForm } from '@/components/feedback-form';
import { type Feedback } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getFeedback } from '@/lib/firestore';

export default function FeedbackPage() {
  const [approvedTestimonials, setApprovedTestimonials] = useState<Feedback[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTestimonials = async () => {
        const allFeedback = await getFeedback();
        const approved = allFeedback
            .filter(fb => fb.status === 'approved')
            .sort((a, b) => new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime());
        setApprovedTestimonials(approved);
    };
    fetchTestimonials();
  }, []);

  const handleFeedbackSubmit = async (data: Omit<Feedback, 'id' | 'status' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/feedback', {
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
          title: "Feedback Submitted!",
          description: "Thank you for your feedback. It is now pending review.",
        });
      } else {
        throw new Error(result.message || 'Failed to submit feedback.');
      }
    } catch (error: any) {
      console.error('Feedback submission error:', error);
      toast({
        variant: 'destructive',
        title: "Submission Failed",
        description: error.message || "There was a problem submitting your feedback. Please try again.",
      });
    }
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
      ))}
    </div>
  );

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Share Your Experience</h1>
        <p className="mt-2 text-lg text-muted-foreground">We value your feedback to help us improve.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Submit Your Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <FeedbackForm onSubmit={handleFeedbackSubmit} />
          </CardContent>
        </Card>

        <div className="space-y-8">
            <div className="text-center md:text-left">
                 <h2 className="font-headline text-3xl font-bold">What Our Clients Say</h2>
                 <p className="mt-2 text-muted-foreground">Words from our happy partners.</p>
            </div>
          {approvedTestimonials.length > 0 ? (
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4">
              {approvedTestimonials.map((testimonial) => (
                 <Card key={testimonial.id} className="shadow-md">
                    <CardContent className="p-6">
                      {testimonial.rating && (
                        <div className="flex items-center gap-2 mb-4">
                          <StarRating rating={testimonial.rating} />
                        </div>
                      )}
                      <p className="text-muted-foreground italic">"{testimonial.message}"</p>
                    </CardContent>
                    <CardHeader className="pt-0">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={`https://placehold.co/40x40.png`} alt={testimonial.name} data-ai-hint="person face"/>
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold">{testimonial.name}</p>
                                {testimonial.company && <p className="text-sm text-muted-foreground">{testimonial.company}</p>}
                            </div>
                        </div>
                    </CardHeader>
                  </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center md:text-left">No testimonials have been approved yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
