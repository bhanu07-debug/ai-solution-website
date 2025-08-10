
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createFeedback } from '@/lib/firestore';

const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  company: z.string().optional(),
  role: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
  rating: z.number().min(1, 'Please provide a rating.').max(5),
  createdAt: z.string().datetime(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = feedbackSchema.parse(json);

    const newFeedback = await createFeedback(data);
    
    return NextResponse.json({ success: true, feedback: newFeedback }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ success: false, message: 'An internal error occurred.' }, { status: 500 });
  }
}
