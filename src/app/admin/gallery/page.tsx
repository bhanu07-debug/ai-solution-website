
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { GalleryItemForm } from '@/components/admin/gallery-item-form';
import { type GalleryItem } from '@/lib/mock-data';
import { getGalleryItems, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '@/lib/firestore';
import { Skeleton } from '@/components/ui/skeleton';


export default function AdminGalleryPage() {
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

    useEffect(() => {
        fetchGalleryItems();
    }, []);

    const fetchGalleryItems = async () => {
        setIsLoading(true);
        const items = await getGalleryItems();
        setGallery(items);
        setIsLoading(false);
    };

    const handleAddItem = () => {
        setEditingItem(null);
        setIsDialogOpen(true);
    };

    const handleEditItem = (item: GalleryItem) => {
        setEditingItem(item);
        setIsDialogOpen(true);
    };

    const handleDeleteItem = async (id: string) => {
        await deleteGalleryItem(id);
        fetchGalleryItems();
    };

    const handleFormSubmit = async (data: Omit<GalleryItem, 'id'>) => {
        if (editingItem) {
            await updateGalleryItem(editingItem.id, data);
        } else {
            await createGalleryItem(data);
        }
        fetchGalleryItems();
        setIsDialogOpen(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-headline">Manage Gallery</h1>
                <Button onClick={handleAddItem}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Image
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Your Gallery</CardTitle>
                    <CardDescription>Add or remove gallery images.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {[...Array(4)].map((_, i) => <Skeleton key={i} className="rounded-lg aspect-square" />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {gallery.map(item => (
                                <div key={item.id} className="relative group">
                                    <Image 
                                        src={item.src}
                                        alt={item.alt}
                                        width={400}
                                        height={400}
                                        className="rounded-lg object-cover aspect-square"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Button variant="outline" size="icon" onClick={() => handleEditItem(item)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => handleDeleteItem(item.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}</DialogTitle>
                    </DialogHeader>
                    <GalleryItemForm onSubmit={handleFormSubmit} defaultValues={editingItem} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
