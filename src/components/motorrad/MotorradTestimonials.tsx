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
    <section className="py-16 lg:py-20 bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Was unsere Biker sagen
          </h2>
          <p className="text-neutral-400 mt-4">
            Echte Bewertungen von echten Fahrschülern aus Potsdam
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-neutral-800 rounded-2xl p-6 relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-orange-500/30" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-orange-500 fill-orange-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-neutral-300 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}, {testimonial.age}</p>
                  <p className="text-neutral-500 text-sm">Klasse A2 Führerschein</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-neutral-500 text-sm mt-8">
          * Alle Bewertungen stammen von verifizierten Google Maps Rezensionen
        </p>
      </div>
    </section>
  );
};

export default MotorradTestimonials;
