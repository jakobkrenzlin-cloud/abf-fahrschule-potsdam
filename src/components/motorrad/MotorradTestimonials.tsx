import React from 'react';
import { Star, Quote } from 'lucide-react';

const MotorradTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Max M.",
      age: 19,
      quote: "Mega Team, super Ausbildung! Hab meinen A2 Führerschein in Rekordzeit geschafft. Danke an das ganze ABF Team!",
      rating: 5,
      type: "Jung"
    },
    {
      name: "Sabine K.",
      age: 45,
      quote: "Ich habe mir mit 45 endlich meinen Traum vom Motorradführerschein erfüllt. Die Fahrlehrer bei ABF haben mir die Sicherheit gegeben, die ich gebraucht habe.",
      rating: 5,
      type: "Wiedereinsteiger"
    },
    {
      name: "Thomas R.",
      age: 32,
      quote: "Top Fahrschule in Potsdam! Faire Preise, moderne Motorräder und vor allem: geduldige Fahrlehrer, die wissen wie es geht.",
      rating: 5,
      type: "Wiedereinsteiger"
    }
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-[#1a2d4a] to-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Was unsere Biker sagen
          </h2>
          <p className="text-neutral-400 mt-3 sm:mt-4 text-sm sm:text-base">
            Echte Bewertungen von echten Fahrschülern aus Potsdam
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-neutral-900 border border-[#3b5998]/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 relative hover:border-[#3b5998]/40 transition-all duration-300">
              <Quote className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 sm:w-8 h-6 sm:h-8 text-[#3b5998]/30" />
              
              {/* Stars - Blue theme */}
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 text-[#6d8fd4] fill-[#6d8fd4]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-neutral-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#3b5998] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-base sm:text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">{testimonial.name}, {testimonial.age}</p>
                  <p className="text-neutral-500 text-xs sm:text-sm">Klasse A2 Führerschein</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-neutral-500 text-xs sm:text-sm mt-6 sm:mt-8">
          * Alle Bewertungen stammen von verifizierten Google Maps Rezensionen
        </p>
      </div>
    </section>
  );
};

export default MotorradTestimonials;
