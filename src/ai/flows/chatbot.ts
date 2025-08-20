
'use server';
/**
 * @fileOverview A simple chatbot flow for AISolutions Hub.
 *
 * This file defines the AI logic for a chatbot that can answer user questions
 * about the company, its services, and general AI topics.
 *
 * - chatbot - The main async function that handles the chat logic.
 * - ChatbotInput - The type for the chatbot input.
 * - ChatbotOutput - The type for the chatbot output.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ChatbotInputSchema = z.object({
  history: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.string(),
    })
  ).describe('The history of the conversation.'),
  message: z.string().describe('The new message from the user.'),
});

export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;
export type ChatbotOutput = string;

const chatbotPrompt = ai.definePrompt({
    name: 'chatbotPrompt',
    input: { schema: ChatbotInputSchema },
    prompt: `
You are a friendly and helpful AI assistant for a company called AISolutions Hub.
Your purpose is to assist users by answering their questions about the company, its services, projects, events, and general AI topics.
Keep your answers helpful, friendly, and concise.
If the user's message is a simple greeting like "hello" or "hi", respond with a friendly greeting and ask how you can help.

Here is the conversation history so far:
{{#each history}}
- {{role}}: {{{content}}}
{{/each}}

And here is the new message from the user:
- user: {{{message}}}

Your response:
`,
});

export const chatbot = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const { output } = await chatbotPrompt(input);
    if (!output) {
        if (input.message.toLowerCase().trim() === 'hello' || input.message.toLowerCase().trim() === 'hi') {
            return "Hello! How can I help you today?";
        }
        return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
    }
    return output;
  }
);
