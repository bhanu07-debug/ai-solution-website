'use server';

/**
 * @fileOverview A real-time AI chatbot flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Part } from '@genkit-ai/googleai';

// Define the schema for a single chat message
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

// Define the input schema for the chat flow.
const ChatInputSchema = z.object({
  history: z.array(ChatMessageSchema).describe('The conversation history.'),
  message: z.string().describe('The latest user message.'),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;

// Define the output schema for the chat flow.
const ChatOutputSchema = z.object({
  response: z.string().describe('The AI-generated response.'),
});

export type ChatOutput = z.infer<typeof ChatOutputSchema>;

const chatFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const { history, message } = input;

    const filteredHistory = history.length > 0 && history[0].role !== 'user'
        ? history.slice(1)
        : history;

    const geminiHistory = filteredHistory.map(
      (msg): Part => ({
        role: msg.role,
        text: msg.content,
      })
    );

    const { text } = await ai.generate({
      system: `You are a friendly and helpful AI assistant for a company named "AI Solution". 
      Your goal is to answer user questions about the company, its services, projects, and how to get in touch.

      Here is some key information about the AI Solution website:
      - Company Name: AI Solution
      - Website Purpose: We build intelligent systems that unlock new possibilities and drive business growth. We make AI accessible, practical, and impactful.
      - Contact Email: contact@aisolution.com
      - Contact Phone: (123) 456-7890
      - Location: 123 AI Avenue, Tech City, CA 94000
      - Core Services Offered:
        1.  AI-Powered Automation: Streamline business processes.
        2.  Predictive Analytics: Leverage data to forecast trends and make smarter decisions.
        3.  Natural Language Processing (NLP): Build applications that understand human language (like chatbots!).
        4.  Computer Vision: Enable systems to interpret images and videos.
        5.  AI Consulting & Strategy: Develop a roadmap to integrate AI into your business.

      When a user asks a question, use this information to provide a helpful and relevant response.
      - If they ask for contact info, provide the email and phone number above.
      - If they ask about services, summarize the core services listed.
      - If you don't know the answer, politely say that you don't have that information but can help with other questions about the company's services or how to get in touch.
      - Keep your answers concise and friendly.
      `,
      prompt: message,
      history: geminiHistory,
    });

    return { response: text };
  }
);


export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}
