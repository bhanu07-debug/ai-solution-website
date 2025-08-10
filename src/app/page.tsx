
import { AnimatedHeading } from '@/components/animated-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, MapPin, Bot, Code, Rocket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { getServices, getProjects, getArticles, getGalleryItems, getEvents } from '@/lib/firestore';

const getIcon = (iconName: string): React.ReactNode => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="h-10 w-10 text-primary" />;
      case 'Code':
        return <Code className="h-10 w-10 text-primary" />;
      case 'Rocket':
        return <Rocket className="h-10 w-10 text-primary" />;
      default:
        return null;
    }
};

export default async function Home() {
  const services = await getServices();
  const projects = await getProjects();
  const articles = await getArticles();
  const gallery = await getGalleryItems();
  const events = await getEvents();

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
              <Link href="#">Learn More</Link>
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
          <div className="grid gap-8 md:grid-cols-3">
            {services.slice(0, 3).map((service, index) => (
              <Card key={index} className="flex flex-col items-center text-center p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader>
                  {getIcon(service.icon)}
                  <CardTitle className="font-headline mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
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
          <div className="grid gap-8 md:grid-cols-3">
            {projects.slice(0, 3).map((project, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
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
                </CardHeader>
                <CardContent>
                  <CardDescription>{project.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
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
          <div className="grid gap-8 md:grid-cols-3">
            {articles.slice(0, 3).map((post, index) => (
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
                </Card>
            ))}
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
                {events.slice(0, 2).map((event, index) => (
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
                    </Card>
                ))}
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
              src="https://placehold.co/600x400.png"
              width={600}
              height={400}
              alt="AI Innovation"
              data-ai-hint="abstract technology"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
