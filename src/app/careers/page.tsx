
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCareers } from "@/lib/firestore";
import { Briefcase, MapPin } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function CareersPage() {
    const jobs = await getCareers();

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Join Our Team</h1>
        <p className="mt-2 text-lg text-muted-foreground">We're looking for passionate people to help us build the future of AI.</p>
      </div>
      <div className="max-w-4xl mx-auto space-y-6">
        {jobs.map((job, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                             <CardTitle className="font-headline">{job.title}</CardTitle>
                             <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground pt-2">
                                <div className="flex items-center gap-1.5">
                                    <Briefcase className="h-4 w-4" />
                                    <span>{job.type}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4" />
                                    <span>{job.location}</span>
                                </div>
                            </div>
                        </div>
                        <Button asChild>
                            <a href={`mailto:vanchdry07@gmail.com?subject=Application for ${job.title}`}>Apply Now</a>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <CardDescription>{job.description}</CardDescription>
                </CardContent>
            </Card>
        ))}
        {jobs.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
                <p className="text-lg">There are currently no open positions.</p>
                <p>Please check back later or contact us to inquire about future opportunities.</p>
            </div>
        )}
      </div>
    </div>
  );
}
