
import { getProject } from '@/lib/firestore';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
        <div className="mb-8">
            <Button asChild variant="ghost">
                <Link href="/projects" className="flex items-center gap-2 text-muted-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Projects
                </Link>
            </Button>
        </div>
        <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
                <Card className="overflow-hidden shadow-lg">
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        width={1200}
                        height={675}
                        className="w-full object-cover"
                        data-ai-hint={project.imageHint}
                        priority
                    />
                </Card>
                 <article>
                    <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-4">{project.title}</h1>
                    <div 
                        className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground"
                    >
                        <p>{project.description}</p>
                    </div>
                </article>
            </div>
            <div className="lg:col-span-1">
                <Card className="shadow-lg sticky top-24">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Project Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-semibold mb-3">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map(tech => (
                                    <Badge key={tech} variant="default">{tech}</Badge>
                                ))}
                            </div>
                        </div>
                         <div>
                            <h4 className="font-semibold mb-3">Key Outcomes</h4>
                            <ul className="space-y-2 text-muted-foreground text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0"/>
                                    <span>Increased efficiency by 30%</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0"/>
                                    <span>Reduced operational costs</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0"/>
                                    <span>Enhanced user engagement</span>
                                </li>
                            </ul>
                        </div>
                        <Button asChild size="lg" className="w-full font-bold">
                            <Link href="/contact">Inquire About a Similar Project</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
