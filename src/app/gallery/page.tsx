
'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { getGalleryItems } from "@/lib/firestore";
import type { GalleryItem } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [filteredImages, setFilteredImages] = useState<GalleryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hints, setHints] = useState<string[]>([]);
    const [activeHint, setActiveHint] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            setIsLoading(true);
            const fetchedImages = await getGalleryItems();
            setImages(fetchedImages);
            setFilteredImages(fetchedImages);
            
            const allHints = fetchedImages.map(i => i.hint);
            const uniqueHints = ['All', ...Array.from(new Set(allHints))];
            setHints(uniqueHints);
            setIsLoading(false);
        };
        fetchImages();
    }, []);

    useEffect(() => {
        let newFilteredImages = images;

        if (activeHint !== 'All') {
            newFilteredImages = newFilteredImages.filter(image => image.hint === activeHint);
        }

        if (searchTerm) {
            newFilteredImages = newFilteredImages.filter(image => 
                image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                image.hint.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredImages(newFilteredImages);
    }, [searchTerm, activeHint, images]);

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Gallery</h1>
        <p className="mt-2 text-lg text-muted-foreground">A showcase of AI-generated imagery and concepts.</p>
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
                                placeholder="Search images..." 
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Categories</h4>
                            <div className="flex flex-wrap gap-2">
                                {hints.map(hint => (
                                    <Button 
                                        key={hint} 
                                        variant={activeHint === hint ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setActiveHint(hint)}
                                        className="capitalize"
                                    >
                                        {hint}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-3">
                {isLoading ? (
                    <div className="columns-2 md:columns-3 gap-4 space-y-4">
                        {[...Array(6)].map((_,i) => <Skeleton key={i} className="h-64 w-full" />)}
                    </div>
                ) : filteredImages.length > 0 ? (
                     <div className="columns-2 md:columns-3 gap-4 space-y-4">
                        {filteredImages.map((image, index) => (
                        <div key={index} className="break-inside-avoid">
                            <Image
                            src={image.src}
                            alt={image.alt}
                            width={600}
                            height={600}
                            className="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                            data-ai-hint={image.hint}
                            />
                        </div>
                        ))}
                    </div>
                 ) : (
                    <div className="text-center py-16">
                        <p className="text-lg font-semibold">No images found</p>
                        <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
