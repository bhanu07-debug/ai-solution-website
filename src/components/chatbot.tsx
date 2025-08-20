
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { chatbot, type ChatbotInput } from '@/ai/flows/chatbot';
import { Bot, Send, User, X, CornerDownLeft } from 'lucide-react';
import { ChatbotIcon } from './icons/chatbot-icon';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
             viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatInput: ChatbotInput = {
        history: messages,
        message: input,
      };
      const response = await chatbot(chatInput);
      const modelMessage: Message = { role: 'model', content: response };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        role: 'model',
        content: "I'm sorry, I seem to be having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
  };


  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full w-16 h-16 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-8 w-8" /> : <ChatbotIcon className="h-8 w-8" />}
          <span className="sr-only">Toggle Chat</span>
        </Button>
      </div>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-[350px] h-[500px] shadow-2xl flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
                 <Bot className="h-6 w-6 text-primary" />
                 <CardTitle className="text-xl font-headline">AI Assistant</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col p-0">
            <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 border">
                        <AvatarFallback><Bot size={20}/></AvatarFallback>
                    </Avatar>
                    <div className="bg-secondary p-3 rounded-lg max-w-xs">
                        <p className="text-sm">Hello! How can I help you today?</p>
                    </div>
                </div>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn('flex items-start gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                  >
                    {msg.role === 'model' && (
                         <Avatar className="h-8 w-8 border">
                            <AvatarFallback><Bot size={20}/></AvatarFallback>
                        </Avatar>
                    )}
                    <div
                      className={cn(
                        'p-3 rounded-lg max-w-xs',
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary'
                      )}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    {msg.role === 'user' && (
                         <Avatar className="h-8 w-8 border">
                            <AvatarFallback><User size={20}/></AvatarFallback>
                        </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                   <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 border">
                            <AvatarFallback><Bot size={20}/></AvatarFallback>
                        </Avatar>
                        <div className="bg-secondary p-3 rounded-lg max-w-xs">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-0" />
                                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-150" />
                                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-300" />
                            </div>
                        </div>
                    </div>
                )}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
               <div className="relative">
                 <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a question..."
                    className="pr-12"
                    disabled={isLoading}
                />
                 <Button
                    type="submit"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-10"
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                </Button>
               </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    Press <CornerDownLeft className="h-3 w-3" /> to send
                </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
