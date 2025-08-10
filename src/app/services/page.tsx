import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Code, Rocket } from "lucide-react";

export default function ServicesPage() {
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
    <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Services</h1>
        <p className="mt-2 text-lg text-muted-foreground">Comprehensive AI solutions for every need.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Card key={index} className="flex flex-col items-center text-center p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader>
              {service.icon}
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
