
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
      src: "/lovable-uploads/unterrichtsraum.jpg",
      alt: "Moderner Unterrichtsraum der ABF Fahrschule Potsdam - Theorieunterricht",
      title: "Unser Unterrichtsraum",
      description: "Moderne Ausstattung für optimalen Theorieunterricht in Potsdam"
    },
    {
      src: "/lovable-uploads/buero-team.jpg",
      alt: "Büro und Team der ABF Fahrschule Potsdam - Fahrschule vor Ort",
      title: "Unser Büro-Team",
      description: "Freundliche Beratung und Service in der ABF Fahrschule Potsdam"
    },
    {
      src: "/lovable-uploads/33f9b1ad-70eb-4e0b-8b28-b88ae8f04da5.png",
      alt: "Moderner Theorieraum der ABF Fahrschule Potsdam mit roten Stühlen",
      title: "Unser Theorieraum",
      description: "Heller, freundlicher Unterrichtsraum für die Theorieausbildung"
    },
    {
      src: "/lovable-uploads/022d0af9-ed96-4965-a097-fae00570dc25.png",
      alt: "Büro der ABF Fahrschule Potsdam mit Team bei der Beratung",
      title: "Beratung im Büro",
      description: "Persönliche Betreuung und kompetente Beratung vor Ort"
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
                  className="w-full h-64 object-cover rounded-xl"
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
