
import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      age: "19 Jahre",
      text: "Die Fahrlehrer bei ABF sind super geduldig und erklären alles sehr verständlich. Ich hatte nie Stress und habe beim ersten Mal bestanden!",
      rating: 5,
      image: "👩‍🦰"
    },
    {
      name: "Tim K.",
      age: "22 Jahre",
      text: "Nach längerer Pause wieder Fahrstunden zu nehmen war bei ABF kein Problem. Sehr einfühlsam und professionell!",
      rating: 5,
      image: "👨‍💼"
    },
    {
      name: "Maria L.",
      age: "18 Jahre",
      text: "Tolle Fahrschule! Moderne Ausbildung und die Fahrlehrer kennen Potsdam wirklich perfekt. Kann ich nur empfehlen.",
      rating: 5,
      imageUrl: "/lovable-uploads/9ced3172-d239-4e48-a0fa-f404241572e0.png"
    },
    {
      name: "Jonas R.",
      age: "20 Jahre",
      text: "Hatte Anfangs viel Respekt vorm Fahren, aber bei ABF fühlte ich mich vom ersten Tag an sicher. Danke für die tolle Zeit!",
      rating: 5,
      imageUrl: "/lovable-uploads/ea64eff6-beb0-41ae-85ed-8f8441ce9777.png"
    }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Das sagen unsere Fahrschüler
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Echte Bewertungen von echten Menschen, die ihren Führerschein bei ABF gemacht haben.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-blue-600 opacity-60" />
              
              {/* Rating */}
              <div className="flex space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                  {testimonial.imageUrl ? (
                    <img 
                      src={testimonial.imageUrl} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-2xl">{testimonial.image}</span>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.age}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white rounded-xl px-8 py-4 shadow-sm">
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <span className="font-semibold text-gray-900">4.9/5</span>
              <span className="text-gray-600">Google Bewertungen</span>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span className="text-gray-700">100+ positive Bewertungen</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
