
import { NextResponse } from 'next/server';
import { z } from 'zod';

const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  company: z.string().optional(),
  role: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
  rating: z.number().min(1, 'Please provide a rating.').max(5),
  createdAt: z.string().datetime(),
});

// In a real application, you would save this to a database.
// For now, we'll just log it to the console.
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = feedbackSchema.parse(json);

    console.log('New feedback received:', data);

    // Here you would typically save the data to a database.
    // e.g., await db.collection('feedback').add(data);
    
    // We'll return a success response with the submitted data.
    return NextResponse.json({ success: true, feedback: data }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ success: false, message: 'An internal error occurred.' }, { status: 500 });
  }
}
