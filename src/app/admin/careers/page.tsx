
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { CareerForm } from '@/components/admin/career-form';
import { getCareers, createCareer, updateCareer, deleteCareer } from '@/lib/firestore';
import { type Career } from '@/lib/mock-data';

export default function AdminCareersPage() {
    const [careers, setCareers] = useState<Career[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCareer, setEditingCareer] = useState<Career | null>(null);

    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        setIsLoading(true);
        const fetchedCareers = await getCareers();
        setCareers(fetchedCareers);
        setIsLoading(false);
    };

    const handleAddCareer = () => {
        setEditingCareer(null);
        setIsDialogOpen(true);
    };

    const handleEditCareer = (career: Career) => {
        setEditingCareer(career);
        setIsDialogOpen(true);
    };

    const handleDeleteCareer = async (id: string) => {
        await deleteCareer(id);
        fetchCareers();
    };

    const handleFormSubmit = async (data: Omit<Career, 'id'>) => {
        if (editingCareer) {
            await updateCareer(editingCareer.id, data);
        } else {
            await createCareer(data);
        }
        fetchCareers();
        setIsDialogOpen(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-headline">Manage Careers</h1>
                <Button onClick={handleAddCareer}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Position
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Job Openings</CardTitle>
                    <CardDescription>Add, edit, or remove job positions.</CardDescription>
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
                                <TableHead>Title</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {careers.map((career) => (
                                <TableRow key={career.id}>
                                    <TableCell className="font-medium">{career.title}</TableCell>
                                    <TableCell>{career.location}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{career.type}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEditCareer(career)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteCareer(career.id)}>
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
                        <DialogTitle>{editingCareer ? 'Edit Position' : 'Add New Position'}</DialogTitle>
                    </DialogHeader>
                    <CareerForm onSubmit={handleFormSubmit} defaultValues={editingCareer} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
