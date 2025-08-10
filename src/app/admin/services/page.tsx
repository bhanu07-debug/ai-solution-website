
'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ServiceForm } from '@/components/admin/service-form';
import { services as mockServices, Service } from '@/lib/mock-data';

export default function AdminServicesPage() {
    const [services, setServices] = useState<Service[]>(mockServices);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    const handleAddService = () => {
        setEditingService(null);
        setIsDialogOpen(true);
    };

    const handleEditService = (service: Service) => {
        setEditingService(service);
        setIsDialogOpen(true);
    };

    const handleDeleteService = (id: string) => {
        setServices(prev => prev.filter(service => service.id !== id));
    };

    const handleFormSubmit = (data: Omit<Service, 'id'>) => {
        if (editingService) {
            setServices(prev => prev.map(s => s.id === editingService.id ? { ...data, id: s.id } : s));
        } else {
            setServices(prev => [...prev, { ...data, id: `s${prev.length + 1}` }]);
        }
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
