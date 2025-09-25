
import { getArticle } from '@/lib/firestore';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <article>
          <header className="mb-8">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-4">{article.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person face" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <span>Admin</span>
                </div>
                <span className="text-muted-foreground/50">|</span>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>5 min read</span>
                </div>
            </div>
          </header>

          <Card className="overflow-hidden mb-8 shadow-lg">
            <Image
              src={article.imageUrl}
              alt={article.title}
              width={1200}
              height={675}
              className="w-full object-cover"
              data-ai-hint={article.imageHint}
              priority
            />
          </Card>
          
          <div 
            className="prose prose-lg dark:prose-invert max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />

        </article>
      </div>
    </div>
  );
}
