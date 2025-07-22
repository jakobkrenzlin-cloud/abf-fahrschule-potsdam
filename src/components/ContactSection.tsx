
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

const ContactSection = () => {
  // Images for the contact section slideshow
  const contactImages = [
    {
      src: "/lovable-uploads/82513385-015d-4a52-9a1c-41fa99af52db.png",
      alt: "Fahrlehrer ABF Fahrschule Potsdam - Persönliche Betreuung und professionelle Fahrausbildung",
      title: "Ihr Fahrlehrer bei ABF Fahrschule Potsdam - Erfahrene und geduldige Fahrausbildung"
    },
    {
      src: "/lovable-uploads/b2892b58-bc6f-41af-a0c6-2d1c6c48dcfe.png",
      alt: "Theorieraum ABF Fahrschule Potsdam - Moderner Unterrichtsraum für Führerschein Theorie",
      title: "Theorieunterricht ABF Fahrschule Potsdam - Moderne Ausstattung und angenehme Lernumgebung"
    },
    {
      src: "/lovable-uploads/14e1fc8e-30ef-4aa2-9a73-8f9b43779d83.png",
      alt: "ABF Fahrschule Potsdam Büro - Anmeldung und Beratung für den Führerschein in Potsdam",
      title: "ABF Fahrschule Potsdam Büro - Kompetente Beratung und Anmeldung für Ihren Führerschein"
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Kontakt ABF Fahrschule Potsdam & Standort
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Haben Sie Fragen zu unserer Fahrschule in Potsdam oder möchten Sie sich für den Führerschein anmelden? 
            Wir freuen uns auf Ihre Nachricht und beraten Sie gerne kostenlos!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info & Images */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-blue-50 rounded-xl p-8 space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                ABF Fahrschule Potsdam - Ihr Kontakt
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Fahrschule Potsdam Adresse</div>
                    <div className="text-gray-600">
                      WEBERPARK<br />
                      Tuchmacherstraße 45b<br />
                      14482 Potsdam<br />
                      Brandenburg
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Telefon Fahrschule Potsdam</div>
                    <a href="tel:+4933196795854" className="text-blue-600 hover:text-blue-700">
                      0331 / 967 958 54
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">E-Mail Fahrschule Potsdam</div>
                    <a href="mailto:potsdam@fahrschuleabf.de" className="text-blue-600 hover:text-blue-700">
                      potsdam@fahrschuleabf.de
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Öffnungszeiten Fahrschule Potsdam</div>
                    <div className="text-gray-600 space-y-1">
                      <div>Mo - Fr: 12:00 - 18:00 Uhr</div>
                      <div>Wochenende: Nach Absprache</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Slideshow */}
            <div className="bg-gray-100 rounded-xl p-8 h-64 flex items-center justify-center overflow-hidden">
              <Carousel className="w-full h-full" opts={{ loop: true }}>
                <CarouselContent>
                  {contactImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="w-full h-full relative">
                        <img 
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover rounded-xl"
                          loading={index === 0 ? "eager" : "lazy"}
                          title={image.title}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {contactImages.length > 1 && (
                  <>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                  </>
                )}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
