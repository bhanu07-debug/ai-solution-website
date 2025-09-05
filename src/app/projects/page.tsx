
'use client';

import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { getProjects } from "@/lib/firestore";
import type { Project } from '@/lib/mock-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [activeTech, setActiveTech] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            const fetchedProjects = await getProjects();
            setProjects(fetchedProjects);
            setFilteredProjects(fetchedProjects);

            const allTechs = fetchedProjects.flatMap(p => p.technologies);
            const uniqueTechs = ['All', ...Array.from(new Set(allTechs))];
            setTechnologies(uniqueTechs);
            setIsLoading(false);
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        let newFilteredProjects = projects;

        if (activeTech !== 'All') {
            newFilteredProjects = newFilteredProjects.filter(project => project.technologies.includes(activeTech));
        }

        if (searchTerm) {
            newFilteredProjects = newFilteredProjects.filter(project => 
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProjects(newFilteredProjects);
    }, [searchTerm, activeTech, projects]);

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Projects</h1>
        <p className="mt-2 text-lg text-muted-foreground">See how we've helped businesses like yours.</p>
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
                                placeholder="Search projects..." 
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                                {technologies.map(tech => (
                                    <Button 
                                        key={tech} 
                                        variant={activeTech === tech ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setActiveTech(tech)}
                                    >
                                        {tech}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-3">
                <Image
                    src="https://picsum.photos/800/600"
                    alt="Placeholder Image"
                    width={800}
                    height={600}
                    className="w-full rounded-lg shadow-lg"
                    data-ai-hint="placeholder image"
                />
            </div>
        </div>
    </div>
  );
}
