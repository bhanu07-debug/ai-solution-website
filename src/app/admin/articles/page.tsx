
'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArticleForm } from '@/components/admin/article-form';
import Image from 'next/image';
import { articles as mockArticles, Article } from '@/lib/mock-data';


export default function AdminArticlesPage() {
    const [articles, setArticles] = useState<Article[]>(mockArticles);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);

    const handleAddArticle = () => {
        setEditingArticle(null);
        setIsDialogOpen(true);
    };

    const handleEditArticle = (article: Article) => {
        setEditingArticle(article);
        setIsDialogOpen(true);
    };

    const handleDeleteArticle = (id: string) => {
        setArticles(prev => prev.filter(article => article.id !== id));
    };

    const handleFormSubmit = (data: Omit<Article, 'id'>) => {
        if (editingArticle) {
            setArticles(prev => prev.map(s => s.id === editingArticle.id ? { ...data, id: s.id } : s));
        } else {
            setArticles(prev => [...prev, { ...data, id: `a${prev.length + 1}` }]);
        }
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
