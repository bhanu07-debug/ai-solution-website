
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/lib/firestore";
import type { Article } from '@/lib/mock-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

const categories = ['All', 'Generative AI', 'Ethics', 'Machine Learning', 'Tutorials'];

export default function BlogPage() {
    const [posts, setPosts] = useState<Article[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            const fetchedPosts = await getArticles();
            setPosts(fetchedPosts);
            setFilteredPosts(fetchedPosts);
            setIsLoading(false);
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        let newFilteredPosts = posts;

        if (activeCategory !== 'All') {
            newFilteredPosts = newFilteredPosts.filter(post => 
                post.title.includes(activeCategory.replace('AI','').trim()) || 
                post.excerpt.includes(activeCategory.replace('AI','').trim())
            );
        }

        if (searchTerm) {
            newFilteredPosts = newFilteredPosts.filter(post => 
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredPosts(newFilteredPosts);
    }, [searchTerm, activeCategory, posts]);


  return (
    <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">From the Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground">Insights and news from the world of AI.</p>
      </div>

       <div className="grid lg:grid-cols-4 gap-8 items-start">
            <div className="lg:col-span-1">
                <Card className="shadow-lg sticky top-24">
                    <CardHeader>
                        <CardTitle className="font-headline">Filters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input 
                                placeholder="Search articles..." 
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Categories</h4>
                            <div className="flex flex-col items-start gap-1">
                                {categories.map(cat => (
                                    <Button 
                                        key={cat} 
                                        variant={activeCategory === cat ? 'secondary' : 'ghost'}
                                        className="w-full justify-start"
                                        onClick={() => setActiveCategory(cat)}
                                    >
                                        {cat}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-3 grid md:grid-cols-2 gap-8">
                 {isLoading ? (
                    [...Array(6)].map((_, i) => (
                        <Card key={i}><CardContent className="p-6"><Skeleton className="h-80 w-full" /></CardContent></Card>
                    ))
                ) : filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <Card key={post.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
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
                                    <Link href={`/blog/${post.id}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                 ) : (
                    <div className="md:col-span-2 text-center py-16">
                        <p className="text-lg font-semibold">No articles found</p>
                        <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                    </div>
                )}
            </div>
      </div>
    </div>
  );
}
