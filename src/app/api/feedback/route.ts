
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createFeedback } from '@/lib/firestore';

const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  company: z.string().min(1, 'Company is required.'),
  email: z.string().email('Please enter a valid email address.'),
  country: z.string().min(1, 'Country is required.'),
  phone: z.string().min(5, 'A valid phone number is required.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
  rating: z.number().min(1).max(5),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = feedbackSchema.parse(json);

    const feedbackData = {
        ...data,
        createdAt: new Date(), // Set timestamp on the server
    };

    const newFeedback = await createFeedback(feedbackData);
    
    return NextResponse.json({ success: true, feedback: newFeedback }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'An internal error occurred.' }, { status: 500 });
  }
}
