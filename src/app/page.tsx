import { AnimatedHeading } from '@/components/animated-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, Code, Rocket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const services = [
    {
      icon: <Bot className="h-10 w-10 text-primary" />,
      title: 'AI Automation',
      description: 'Streamline your operations with our cutting-edge AI automation solutions.',
    },
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: 'Custom Models',
      description: 'Develop bespoke AI models tailored to your unique business challenges.',
    },
    {
      icon: <Rocket className="h-10 w-10 text-primary" />,
      title: 'Strategic Consulting',
      description: 'Leverage our expertise to craft and implement a winning AI strategy.',
    },
  ];

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
              <Link href="/feedback">Get Started</Link>
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
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Services</h2>
            <p className="mt-2 text-muted-foreground">Comprehensive AI solutions for every need.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} className="flex flex-col items-center text-center p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader>
                  {service.icon}
                  <CardTitle className="font-headline mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
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
              <Link href="/feedback">Share Your Feedback <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
