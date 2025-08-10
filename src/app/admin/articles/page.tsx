
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArticleForm } from '@/components/admin/article-form';
import Image from 'next/image';
import { type Article } from '@/lib/mock-data';
import { getArticles, createArticle, updateArticle, deleteArticle } from '@/lib/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);

     useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        setIsLoading(true);
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
        setIsLoading(false);
    };

    const handleAddArticle = () => {
        setEditingArticle(null);
        setIsDialogOpen(true);
    };

    const handleEditArticle = (article: Article) => {
        setEditingArticle(article);
        setIsDialogOpen(true);
    };

    const handleDeleteArticle = async (id: string) => {
        await deleteArticle(id);
        fetchArticles();
    };

    const handleFormSubmit = async (data: Omit<Article, 'id'>) => {
        if (editingArticle) {
            await updateArticle(editingArticle.id, data);
        } else {
            await createArticle(data);
        }
        fetchArticles();
        setIsDialogOpen(false);
    };

    return (
        <div className="space-y-8">
             <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-headline">Manage Articles</h1>
                <Button onClick={handleAddArticle}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Article
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Your Articles</CardTitle>
                    <CardDescription>Write, edit, or publish articles.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                         <div className="space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Excerpt</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {articles.map((article) => (
                                <TableRow key={article.id}>
                                    <TableCell>
                                        <Image src={article.imageUrl} alt={article.title} width={80} height={45} className="rounded-md object-cover"/>
                                    </TableCell>
                                    <TableCell className="font-medium">{article.title}</TableCell>
                                    <TableCell className="max-w-xs truncate">{article.excerpt}</TableCell>
                                    <TableCell>{article.date}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEditArticle(article)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteArticle(article.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    )}
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingArticle ? 'Edit Article' : 'Add New Article'}</DialogTitle>
                    </DialogHeader>
                    <ArticleForm onSubmit={handleFormSubmit} defaultValues={editingArticle} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
