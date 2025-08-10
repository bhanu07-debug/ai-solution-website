import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
    const posts = [
        {
            title: "The Future of AI in Business",
            date: "October 26, 2023",
            excerpt: "Discover how AI is reshaping industries and what it means for your business.",
            imageUrl: "https://placehold.co/600x400.png",
            imageHint: "future technology",
        },
        {
            title: "Getting Started with Machine Learning",
            date: "October 20, 2023",
            excerpt: "A beginner-friendly guide to the core concepts of machine learning.",
            imageUrl: "https://placehold.co/600x400.png",
            imageHint: "machine learning",
        },
        {
            title: "Ethical Considerations in AI",
            date: "October 15, 2023",
            excerpt: "Navigating the complex ethical landscape of artificial intelligence.",
            imageUrl: "https://placehold.co/600x400.png",
            imageHint: "ai ethics",
        },
    ];

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">From the Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground">Insights and news from the world of AI.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                <Image 
                    src={post.imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    data-ai-hint={post.imageHint}
                />
                <CardHeader>
                    <CardTitle className="font-headline">{post.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                    <CardDescription>{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button asChild variant="link" className="p-0 h-auto">
                        <Link href="#">Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
