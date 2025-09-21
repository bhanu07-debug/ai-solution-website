
'use client';

import { useState, useEffect } from 'react';
import { AnimatedHeading } from '@/components/animated-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, MapPin, Check, MessageSquare, Bot, Cpu, BarChart2, BrainCircuit, Settings, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getServices, getProjects, getArticles, getGalleryItems, getEvents } from '@/lib/firestore';
import { type Service, type Project, type Article, type GalleryItem, type Event } from '@/lib/mock-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

const serviceIcons: { [key: string]: React.ElementType } = {
  "AI-Powered Automation": Bot,
  "Predictive Analytics": BarChart2,
  "Natural Language Processing": MessageSquare,
  "Computer Vision": Cpu,
  "AI Consulting & Strategy": BrainCircuit,
  "Business Process Automation": Settings,
  "Default": BrainCircuit,
};

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const [
        servicesData, 
        projectsData, 
        articlesData, 
        galleryData, 
        eventsData
      ] = await Promise.all([
        getServices(),
        getProjects(),
        getArticles(),
        getGalleryItems(),
        getEvents()
      ]);
      setServices(servicesData);
      setProjects(projectsData);
      setArticles(articlesData);
      setGallery(galleryData);
      setEvents(eventsData);
      setIsLoading(false);
    }
    fetchData();
  }, []);


  return (
    <div className="flex flex-col">
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <AnimatedHeading text="Powering Tomorrow's Solutions" className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter" />
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            We build intelligent systems that unlock new possibilities and drive business growth.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="font-bold">
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold">
              <Link href="/services">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="absolute top-0 -left-1/4 w-full h-full bg-gradient-to-r from-primary/5 to-transparent -z-10 animate-[background-pan_10s_linear_infinite]" />
      </section>

      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Services</h2>
            <p className="mt-2 text-muted-foreground">Comprehensive AI solutions for every need.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <Card key={i}><CardContent className="p-6"><Skeleton className="h-80 w-full" /></CardContent></Card>
              ))
            ) : (
              services.slice(0, 3).map((service, index) => {
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
            )}
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/services">See More Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Projects</h2>
            <p className="mt-2 text-muted-foreground">See how we've helped businesses like yours.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
             {isLoading ? (
              [...Array(3)].map((_, i) => (
                <Card key={i}><CardContent className="p-6"><Skeleton className="h-80 w-full" /></CardContent></Card>
              ))
            ) : (
              projects.slice(0, 3).map((project, index) => (
                 <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                    <Image 
                        src={project.imageUrl}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                        data-ai-hint={project.imageHint}
                    />
                    <CardHeader>
                    <CardTitle className="font-headline">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                    </div>
                    </CardContent>
                     <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/projects">View Case Study <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardFooter>
                </Card>
              ))
            )}
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/projects">See More Projects <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">From the Blog</h2>
            <p className="mt-2 text-muted-foreground">Insights and news from the world of AI.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
               [...Array(3)].map((_, i) => (
                <Card key={i}><CardContent className="p-6"><Skeleton className="h-80 w-full" /></CardContent></Card>
              ))
            ) : (
              articles.slice(0, 3).map((post, index) => (
                  <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                      <Image 
                          src={post.imageUrl}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="w-full h-48 object-cover"
                          data-ai-hint={post.imageHint}
                      />
                      <CardHeader>
                          <CardTitle className="font-headline">{post.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{post.date}</p>
                      </CardHeader>
                      <CardContent className="flex-grow">
                          <CardDescription>{post.excerpt}</CardDescription>
                      </CardContent>
                      <CardFooter>
                         <Button asChild variant="link" className="p-0 h-auto">
                            <Link href={`/blog/${post.id}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      </CardFooter>
                  </Card>
              ))
            )}
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/blog">See More Posts <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Gallery</h2>
            <p className="mt-2 text-muted-foreground">A showcase of AI-generated imagery and concepts.</p>
          </div>
           {isLoading ? (
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
            </div>
           ) : (
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {gallery.slice(0, 6).map((image, index) => (
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
          )}
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/gallery">See More Images <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Upcoming Events</h2>
                <p className="mt-2 text-lg text-muted-foreground">Connect with us at these industry events.</p>
            </div>
            <div className="space-y-8 max-w-3xl mx-auto">
                {isLoading ? (
                  [...Array(2)].map((_, i) => (
                    <Card key={i}><CardContent className="p-6"><Skeleton className="h-40 w-full" /></CardContent></Card>
                  ))
                ) : (
                  events.slice(0, 2).map((event, index) => (
                      <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <CardHeader>
                              <CardTitle className="font-headline">{event.title}</CardTitle>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                                  <div className="flex items-center gap-1.5">
                                      <Calendar className="h-4 w-4" />
                                      <span>{event.date}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                      <MapPin className="h-4 w-4" />
                                      <span>{event.location}</span>
                                  </div>
                              </div>
                          </CardHeader>
                          <CardContent>
                              <CardDescription>{event.description}</CardDescription>
                          </CardContent>
                          <CardFooter>
                              <Button>Register Now</Button>
                          </CardFooter>
                      </Card>
                  ))
                )}
            </div>
            <div className="text-center mt-12">
                <Button asChild>
                    <Link href="/events">See More Events <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto grid items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Your Trusted Partner in AI Innovation</h2>
            <p className="text-muted-foreground">
              At AISolutions Hub, we are committed to pushing the boundaries of artificial intelligence. Our team of experts works closely with you to understand your goals and deliver solutions that create lasting value. From startups to enterprises, we provide the tools and insights to navigate the complexities of the AI landscape.
            </p>
            <Button asChild className="font-bold">
              <Link href="/contact">Get in Touch <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://picsum.photos/seed/partner/600/400"
              width={600}
              height={400}
              alt="Artificial Intelligence"
              data-ai-hint="artificial intelligence"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

    