
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TeamSlideshow = () => {
  const teamImages = [
    {
      src: "/lovable-uploads/b2892b58-bc6f-41af-a0c6-2d1c6c48dcfe.png",
      alt: "Moderner Unterrichtsraum der ABF Fahrschule Potsdam - Theorieunterricht",
      title: "Unser Unterrichtsraum",
      description: "Moderne Ausstattung für optimalen Theorieunterricht in Potsdam"
    },
    {
      src: "/lovable-uploads/14e1fc8e-30ef-4aa2-9a73-8f9b43779d83.png",
      alt: "Büro und Team der ABF Fahrschule Potsdam - Fahrschule vor Ort",
      title: "Unser Büro-Team",
      description: "Freundliche Beratung und Service in der ABF Fahrschule Potsdam"
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {teamImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-64 rounded-xl ${
                    index === 0 ? 'object-cover' : 'object-cover'
                  }`}
                  style={index === 0 ? { objectPosition: '50% 65%' } : {}}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-xl p-4">
                  <h4 className="text-white font-semibold text-lg">{image.title}</h4>
                  <p className="text-white/90 text-sm">{image.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "ABF Fahrschule Potsdam Team",
            "description": "Bilder vom Team und den Räumlichkeiten der ABF Fahrschule in Potsdam",
            "url": "https://fahrschule-abf-potsdam.de",
            "image": teamImages.map(img => ({
              "@type": "ImageObject",
              "url": img.src,
              "description": img.alt,
              "name": img.title
            }))
          })
        }}
      />
    </div>
  );
};

export default TeamSlideshow;
