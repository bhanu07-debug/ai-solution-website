
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServices } from "@/lib/firestore";
import { Bot, Code, Rocket } from "lucide-react";

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
          <Card key={index} className="flex flex-col items-center text-center p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader>
              {getIcon(service.icon)}
              <CardTitle className="font-headline mt-4">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
