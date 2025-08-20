
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getServices } from "@/lib/firestore";
import Image from "next/image";
import Link from "next/link";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Services</h1>
        <p className="mt-2 text-lg text-muted-foreground">Comprehensive AI solutions for every need.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
            {service.imageUrl && (
              <Image
                  src={service.imageUrl}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint={service.imageHint}
              />
            )}
            <CardHeader>
              <CardTitle className="font-headline">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full font-bold">
                    <Link href="/contact">Learn More</Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
