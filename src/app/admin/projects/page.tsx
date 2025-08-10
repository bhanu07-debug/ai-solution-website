
'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProjectForm } from '@/components/admin/project-form';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

type Project = {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
};

const mockProjects: Project[] = [
    { id: 'p1', title: "E-commerce Recommendation Engine", description: "A recommendation engine that increased sales by 20% for a major e-commerce platform.", technologies: ["React", "Next.js", "Python", "TensorFlow"], imageUrl: "https://placehold.co/600x400.png" },
    { id: 'p2', title: "Healthcare Diagnostic Tool", description: "An AI-powered tool that assists doctors in diagnosing diseases with higher accuracy.", technologies: ["PyTorch", "Flask", "React", "Next.js"], imageUrl: "https://placehold.co/600x400.png" },
    { id: 'p3', title: "Financial Fraud Detection", description: "A system that detects and prevents fraudulent transactions in real-time.", technologies: ["Java", "Spring Boot", "Kafka", "Scikit-learn"], imageUrl: "https://placehold.co/600x400.png" },
];

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const handleAddProject = () => {
        setEditingProject(null);
        setIsDialogOpen(true);
    };

    const handleEditProject = (project: Project) => {
        setEditingProject(project);
        setIsDialogOpen(true);
    };

    const handleDeleteProject = (id: string) => {
        setProjects(prev => prev.filter(project => project.id !== id));
    };

    const handleFormSubmit = (data: Omit<Project, 'id'>) => {
        if (editingProject) {
            setProjects(prev => prev.map(s => s.id === editingProject.id ? { ...data, id: s.id } : s));
        } else {
            setProjects(prev => [...prev, { ...data, id: `p${prev.length + 1}` }]);
        }
        setIsDialogOpen(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-headline">Manage Projects</h1>
                <Button onClick={handleAddProject}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Project
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Your Projects</CardTitle>
                    <CardDescription>Add, edit, or remove projects.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Technologies</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>
                                        <Image src={project.imageUrl} alt={project.title} width={80} height={45} className="rounded-md object-cover"/>
                                    </TableCell>
                                    <TableCell className="font-medium">{project.title}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {project.technologies.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEditProject(project)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project.id)}>
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
                        <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                    </DialogHeader>
                    <ProjectForm onSubmit={handleFormSubmit} defaultValues={editingProject} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
