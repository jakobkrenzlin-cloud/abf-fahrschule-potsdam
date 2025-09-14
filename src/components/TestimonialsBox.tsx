import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsBox = () => {
  const testimonials = [
    {
      name: "Lisa M.",
      text: "Super Fahrschule! Habe beim ersten Versuch bestanden. Die Lehrer sind geduldig und erklären alles verständlich.",
      rating: 5,
      date: "vor 2 Wochen"
    },
    {
      name: "Tim K.", 
      text: "Faire Preise und keine versteckten Kosten. Kann die ABF Fahrschule nur weiterempfehlen!",
      rating: 5,
      date: "vor 1 Monat"
    },
    {
      name: "Sarah L.",
      text: "Sehr flexible Terminvergabe. Auch abends und am Wochenende möglich. Top Service!",
      rating: 5,
      date: "vor 3 Wochen"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            {[1,2,3,4,5].map((star) => (
              <Star key={star} className="w-8 h-8 text-yellow-400 fill-current" />
            ))}
            <span className="text-2xl font-bold ml-4">4.9/5</span>
          </div>
          <p className="text-lg text-gray-600 font-medium mb-2">Basierend auf 200+ Google Bewertungen</p>
          <div className="text-4xl font-bold text-primary mb-8">
            500+ Fahrschüler erfolgreich bestanden
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 relative">
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Logos */}
        <div className="flex justify-center items-center gap-12 flex-wrap opacity-60">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-xs font-semibold">TÜV</div>
            <span className="text-sm font-medium">TÜV geprüft</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-xs font-semibold">DEKRA</div>
            <span className="text-sm font-medium">DEKRA Partner</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-xs font-semibold">⭐</div>
            <span className="text-sm font-medium">Google Bewertungen</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsBox;