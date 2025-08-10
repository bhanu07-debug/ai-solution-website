
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ServiceForm } from '@/components/admin/service-form';
import { type Service } from '@/lib/mock-data';
import { getServices, createService, updateService, deleteService } from '@/lib/firestore';
import { Skeleton } from '@/components/ui/skeleton';


export default function AdminServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setIsLoading(true);
        const fetchedServices = await getServices();
        setServices(fetchedServices);
        setIsLoading(false);
    };

    const handleAddService = () => {
        setEditingService(null);
        setIsDialogOpen(true);
    };

    const handleEditService = (service: Service) => {
        setEditingService(service);
        setIsDialogOpen(true);
    };

    const handleDeleteService = async (id: string) => {
        await deleteService(id);
        fetchServices();
    };

    const handleFormSubmit = async (data: Omit<Service, 'id'>) => {
        if (editingService) {
            await updateService(editingService.id, data);
        } else {
            await createService(data);
        }
        fetchServices();
        setIsDialogOpen(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-headline">Manage Services</h1>
                <Button onClick={handleAddService}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Service
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Your Services</CardTitle>
                    <CardDescription>Add, edit, or remove services offered.</CardDescription>
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
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {services.map((service) => (
                                <TableRow key={service.id}>
                                    <TableCell className="font-medium">{service.title}</TableCell>
                                    <TableCell>{service.description}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEditService(service)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteService(service.id)}>
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
                        <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                    </DialogHeader>
                    <ServiceForm onSubmit={handleFormSubmit} defaultValues={editingService} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
