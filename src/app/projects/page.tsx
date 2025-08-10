import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProjectsPage() {
    const projects = [
        {
            title: "E-commerce Recommendation Engine",
            description: "A recommendation engine that increased sales by 20% for a major e-commerce platform.",
            technologies: ["React", "Next.js", "Python", "TensorFlow"],
            imageUrl: "https://placehold.co/600x400.png",
            imageHint: "e-commerce analysis",
        },
        {
            title: "Healthcare Diagnostic Tool",
            description: "An AI-powered tool that assists doctors in diagnosing diseases with higher accuracy.",
            technologies: ["PyTorch", "Flask", "React", "Next.js"],
            imageUrl: "https://placehold.co/600x400.png",
            imageHint: "medical technology",
        },
        {
            title: "Financial Fraud Detection",
            description: "A system that detects and prevents fraudulent transactions in real-time.",
            technologies: ["Java", "Spring Boot", "Kafka", "Scikit-learn"],
            imageUrl: "https://placehold.co/600x400.png",
            imageHint: "financial security",
        },
    ];

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Projects</h1>
        <p className="mt-2 text-lg text-muted-foreground">See how we've helped businesses like yours.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
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
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link href="#">View Case Study <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
