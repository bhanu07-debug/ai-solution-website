
import Image from "next/image";
import { getGalleryItems } from "@/lib/firestore";

export default async function GalleryPage() {
  const images = await getGalleryItems();

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Gallery</h1>
        <p className="mt-2 text-lg text-muted-foreground">A showcase of AI-generated imagery and concepts.</p>
      </div>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((image, index) => (
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
    </div>
  );
}
