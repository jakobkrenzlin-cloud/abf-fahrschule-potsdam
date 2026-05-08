import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const MobileStickyFooter = () => {
  const handleCall = () => {
    window.location.href = 'tel:+491622191290';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/4915752387583?text=Hallo,%20ich%20interessiere%20mich%20für%20den%20Führerschein%20bei%20ABF%20Fahrschule%20Potsdam.', '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden safe-area-inset-bottom">
      <div className="flex gap-2 p-3">
        <button
          onClick={handleCall}
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3.5 px-4 rounded-xl font-semibold text-base shadow-md active:scale-95 transition-transform"
          aria-label="Jetzt anrufen"
        >
          <Phone className="w-5 h-5" />
          <span>Anrufen</span>
        </button>
        <button
          onClick={handleWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3.5 px-4 rounded-xl font-semibold text-base shadow-md active:scale-95 transition-transform"
          aria-label="WhatsApp öffnen"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp</span>
        </button>
      </div>
    </div>
  );
};

export default MobileStickyFooter;
