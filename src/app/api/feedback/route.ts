
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createFeedback } from '@/lib/firestore';

const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  company: z.string().min(1, 'Company is required.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
  // Make these fields optional to accommodate both forms
  country: z.string().optional(),
  phone: z.string().optional(),
  inquireDepartment: z.string().optional(),
  localAddress: z.string().optional(),
  pinCode: z.string().optional(),
  rating: z.number().optional(),
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
    console.error('Feedback API Error:', error);
    return NextResponse.json({ success: false, message: 'An internal error occurred.' }, { status: 500 });
  }
}
