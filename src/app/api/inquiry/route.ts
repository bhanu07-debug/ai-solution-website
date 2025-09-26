
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createInquiry } from '@/lib/firestore';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  company: z.string().min(1, 'Company is required.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
  country: z.string().optional(),
  phone: z.string().optional(),
  inquireDepartment: z.string().optional(),
  localAddress: z.string().optional(),
  pinCode: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = inquirySchema.parse(json);

    const newInquiry = await createInquiry(data);
    
    return NextResponse.json({ success: true, inquiry: newInquiry }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    console.error('Inquiry API Error:', error);
    return NextResponse.json({ success: false, message: 'An internal error occurred.' }, { status: 500 });
  }
}
