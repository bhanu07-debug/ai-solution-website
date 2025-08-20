
"use client";

import { useState, useEffect } from 'react';
import { FeedbackForm } from '@/components/feedback-form';
import { type Feedback } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getFeedback } from '@/lib/firestore';

export default function FeedbackPage() {
  const [pendingFeedback, setPendingFeedback] = useState<Omit<Feedback, 'status' | 'id'>[]>([]);
  const [approvedTestimonials, setApprovedTestimonials] = useState<Feedback[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTestimonials = async () => {
        const allFeedback = await getFeedback();
        const approved = allFeedback
            .filter(fb => fb.status === 'approved')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setApprovedTestimonials(approved);
    };
    fetchTestimonials();
  }, []);

  const handleFeedbackSubmit = async (data: Omit<Feedback, 'status' | 'id' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (result.success) {
        setPendingFeedback(prev => [result.feedback, ...prev]);
        toast({
          title: "Feedback Submitted!",
          description: "Thank you for your feedback. It is now pending review.",
        });
      } else {
        throw new Error(result.message || 'Failed to submit feedback.');
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      toast({
        variant: 'destructive',
        title: "Submission Failed",
        description: "There was a problem submitting your feedback. Please try again.",
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
          <h2 className="font-headline text-2xl font-bold text-center md:text-left">Pending Review</h2>
          {pendingFeedback.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
              {pendingFeedback.map((feedback, index) => (
                <Card key={index} className="bg-secondary/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback>{feedback.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{feedback.name}</p>
                        <p className="text-sm text-muted-foreground">{feedback.message}</p>
                        <div className="mt-2">
                          <StarRating rating={feedback.rating} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center md:text-left">Your submitted feedback will appear here for preview.</p>
          )}
        </div>
      </div>

      <div className="mt-24">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold">What Our Clients Say</h2>
          <p className="mt-2 text-lg text-muted-foreground">Words from our happy partners.</p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {approvedTestimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col justify-between shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                         <StarRating rating={testimonial.rating} />
                      </div>
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
                                <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                            </div>
                        </div>
                    </CardHeader>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
