
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getServices } from "@/lib/firestore";
import type { Service } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Search, ChevronRight, MessageSquare, Bot, Cpu, BarChart2, Settings, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const serviceIcons: { [key: string]: React.ElementType } = {
  "AI-Powered Automation": Bot,
  "Predictive Analytics": BarChart2,
  "Natural Language Processing": MessageSquare,
  "Computer Vision": Cpu,
  "AI Consulting & Strategy": BrainCircuit,
  "Business Process Automation": Settings,
  "Default": BrainCircuit,
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Services');

  useEffect(() => {
    async function fetchServices() {
        setIsLoading(true);
        const fetchedServices = await getServices();
        setServices(fetchedServices);
        setFilteredServices(fetchedServices);
        setIsLoading(false);
    }
    fetchServices();
  }, []);

  useEffect(() => {
    let newFilteredServices = services;

    if (activeCategory !== 'All Services') {
        newFilteredServices = newFilteredServices.filter(service => service.title === activeCategory);
    }

    if (searchTerm) {
        newFilteredServices = newFilteredServices.filter(service => 
            service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    setFilteredServices(newFilteredServices);

  }, [searchTerm, activeCategory, services]);

  const allCategories = ['All Services', ...services.map(s => s.title)];
  const popularTags = ["Machine Learning", "NLP", "Computer Vision", "Automation", "Analytics"];

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our AI Services</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-4xl mx-auto">Discover our comprehensive range of AI solutions designed to transform your business operations and drive innovation.</p>
      </div>

      <Card className="p-6 mb-12 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-1/2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search services..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
                 <Select defaultValue="most-popular">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Most Popular" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="most-popular">Most Popular</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Popular searches:</span>
            {["Machine Learning", "Chatbots", "Data Analytics", "Computer Vision", "Automation"].map(tag => (
                <Button key={tag} variant="outline" size="sm" className="rounded-full" onClick={() => setSearchTerm(tag)}>{tag}</Button>
            ))}
          </div>
      </Card>

      <div className="grid lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-1">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Filters</CardTitle>
                    <CardDescription>{filteredServices.length} services found</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h4 className="font-semibold mb-3">Service Categories</h4>
                        <ul className="space-y-1">
                             {allCategories.map(category => (
                                <li key={category}>
                                    <Button 
                                        variant="ghost" 
                                        className={`w-full justify-between ${activeCategory === category ? 'bg-primary/20 text-primary font-bold' : ''}`}
                                        onClick={() => setActiveCategory(category)}
                                    >
                                        <span>{category}</span>
                                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                                            {category === 'All Services' ? services.length : services.filter(s => s.title === category).length}
                                        </span>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Popular Tags</h4>
                        <div className="flex flex-wrap gap-2">
                             {popularTags.map(tag => (
                                <Button key={tag} variant="outline" size="sm" className="rounded-full" onClick={() => setSearchTerm(tag)}>
                                    {tag}
                                </Button>
                             ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading ? (
                [...Array(6)].map((_, i) => (
                    <Card key={i}><CardContent className="p-6"><Skeleton className="h-64 w-full" /></CardContent></Card>
                ))
            ) : filteredServices.length > 0 ? (
                filteredServices.map((service, index) => {
                    const Icon = serviceIcons[service.title] || serviceIcons.Default;
                    
                    return (
                    <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Icon className="h-8 w-8 text-primary"/>
                                </div>
                                <CardTitle className="font-headline text-xl leading-tight">{service.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <CardDescription>{service.description}</CardDescription>
                            <div>
                                <h5 className="font-semibold text-sm mb-2">Key Benefits:</h5>
                                <ul className="space-y-1.5 text-sm text-muted-foreground">
                                    {Array.isArray(service.benefits) && service.benefits.map(benefit => (
                                        <li key={benefit} className="flex items-start gap-2">
                                            <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0"/>
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-4 bg-secondary/50 pt-4">
                            <div className="flex justify-between items-center w-full">
                                <span className="text-sm text-muted-foreground">Starting from</span>
                                <span className="text-xl font-bold text-primary">{service.price}</span>
                            </div>
                            <Button asChild className="w-full font-bold">
                                <Link href="/contact">Learn More <ChevronRight className="ml-1 h-4 w-4"/></Link>
                            </Button>
                        </CardFooter>
                    </Card>
                )})
            ) : (
                 <div className="md:col-span-2 xl:col-span-3 text-center py-16">
                    <p className="text-lg font-semibold">No services found</p>
                    <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
      </div>

       <Card className="mt-20 text-center p-8 md:p-12 shadow-xl bg-secondary/50">
            <h2 className="font-headline text-3xl font-bold">Need a Custom AI Solution?</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Don't see exactly what you're looking for? Our team can develop custom AI solutions tailored to your specific business requirements.
            </p>
            <div className="mt-6 flex justify-center gap-4">
                <Button size="lg"><Link href="/contact">Discuss Your Project</Link></Button>
                <Button size="lg" variant="outline"><Link href="/contact">Schedule Consultation</Link></Button>
            </div>
      </Card>

    </div>
  );
}

    