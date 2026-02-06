import React from 'react';
import { ArrowRight, Shield, Users, Award } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  // Hero images array - you can easily add more images here
  const heroImages = [{
    src: "/lovable-uploads/942a3ff6-c3ad-407e-8bda-5cd7d40335d8.png",
    alt: "ABF Fahrschule Potsdam Gebäude - Moderne Fahrausbildung in Potsdam im WEBERPARK Tuchmacherstraße",
    title: "ABF Fahrschule Potsdam - Ihr vertrauensvoller Partner für den Führerschein",
    overlayTitle: "Moderne Fahrausbildung in Potsdam",
    overlayText: "Unser modernes Fahrschulgebäude im WEBERPARK Potsdam - Ihr Weg zum Führerschein"
  }, {
    src: "/lovable-uploads/69a50505-01b3-473d-9dbb-6f8b0def978d.png",
    alt: "Theorieunterricht ABF Fahrschule Potsdam - Moderner Unterrichtsraum mit roter Bestuhlung",
    title: "Theorieunterricht in der ABF Fahrschule Potsdam - Lernen in angenehmer Atmosphäre",
    overlayTitle: "Theorieunterricht in Potsdam",
    overlayText: "Moderner Unterrichtsraum für entspanntes Lernen der Fahrtheorie"
  }];
  return <section id="home" className="pt-12 md:pt-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-5 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-blue-600">Fahrschule Potsdam</span> – 
                Sicher fahren lernen
              </h1>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed">
                ABF Fahrschule Potsdam: Mit ruhiger Hand, persönlicher Betreuung und moderner Fahrausbildung zum Führerschein. 
                Seit über 15 Jahren Ihre vertrauensvolle Fahrschule in Potsdam.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-gray-700">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>Neue Fahrschule in Potsdam</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>Beste Bewertungen</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={scrollToContact} className="bg-blue-600 text-white px-6 py-3.5 md:px-8 md:py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-base md:text-lg font-semibold touch-target">
                <span>Kostenlose Beratung</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => document.getElementById('process')?.scrollIntoView({
              behavior: 'smooth'
            })} className="border-2 border-blue-600 text-blue-600 px-6 py-3.5 md:px-8 md:py-4 rounded-lg hover:bg-blue-50 transition-colors text-base md:text-lg font-semibold touch-target">
                Führerschein Info
              </button>
            </div>
          </div>

          {/* Right Content - Hero Image Carousel */}
          <div className="relative">
            <div className="bg-blue-100 rounded-2xl p-3 md:p-4 aspect-[4/3] lg:aspect-square flex items-center justify-center overflow-hidden">
              <Carousel className="w-full h-full" opts={{
              loop: true
            }}>
                <CarouselContent>
                  {heroImages.map((image, index) => <CarouselItem key={index}>
                      <div className="w-full h-full relative">
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="w-full h-full object-cover rounded-xl" 
                          loading={index === 0 ? "eager" : "lazy"} 
                          fetchPriority={index === 0 ? "high" : "auto"}
                          decoding={index === 0 ? "sync" : "async"}
                          title={image.title} 
                        />
                        {/* Text overlay - hidden on mobile, visible on larger screens */}
                        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl items-center justify-center p-6 hidden md:flex" style={{
                      alignItems: 'center',
                      paddingTop: '60%'
                    }}>
                          <div className="text-white text-center">
                            <h3 className="text-2xl font-bold mb-2">{image.overlayTitle}</h3>
                            <p className="text-white/90">{image.overlayText}</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>)}
                </CarouselContent>
                {heroImages.length > 1 && <>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                  </>}
              </Carousel>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-white rounded-lg shadow-lg p-2 md:p-4">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs md:text-sm font-medium text-gray-700">Termine verfügbar</span>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;