import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

const MotorradTestimonials: React.FC = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-[#1a2d4a] to-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Was unsere Biker sagen
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#6d8fd4] fill-[#6d8fd4]" />
              ))}
            </div>
            <span className="text-white font-bold text-lg">4,9</span>
            <span className="text-neutral-400 text-sm">bei Google Maps</span>
          </div>
        </div>

        {/* Google Reviews CTA */}
        <div className="bg-neutral-900 border border-[#3b5998]/30 rounded-2xl p-8 sm:p-10 text-center max-w-2xl mx-auto">
          <div className="bg-[#3b5998]/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5">
            <Star className="w-10 h-10 text-[#6d8fd4] fill-[#6d8fd4]" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Über 500 zufriedene Fahrschüler
          </h3>
          <p className="text-neutral-400 mb-6 text-sm sm:text-base">
            Lies die echten Bewertungen unserer Fahrschüler direkt auf Google Maps –
            verifiziert und unzensiert.
          </p>
          <a
            href="https://maps.google.com/?q=ABF+Fahrschule+Potsdam"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-[#3b5998] hover:bg-[#4a6cb3] text-white font-bold rounded-xl px-8 py-6 text-base sm:text-lg gap-2"
            >
              Alle Google Bewertungen lesen
              <ExternalLink className="w-5 h-5" />
            </Button>
          </a>
          <p className="text-xs text-neutral-500 mt-4">
            Verifizierte Bewertungen über Google Maps (§ 5b Abs. 3 UWG)
          </p>
        </div>
      </div>
    </section>
  );
};

export default MotorradTestimonials;
