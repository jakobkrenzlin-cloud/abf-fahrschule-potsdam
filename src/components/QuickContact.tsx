
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const QuickContact = () => {
  return (
    <section className="py-8 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-8 text-white">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5" />
            <div>
              <div className="text-sm font-medium">Jetzt anrufen</div>
              <div className="text-blue-100 text-sm leading-tight">
                <div>Festnetz: <a href="tel:+4933196795854" className="hover:text-white transition-colors">+49 331 96795854</a></div>
                <div>Mobil: <a href="tel:+491622191290" className="hover:text-white transition-colors">+49 162 2191290</a></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5" />
            <div>
              <div className="text-sm font-medium">E-Mail schreiben</div>
              <a href="mailto:potsdam@fahrschuleabf.de" className="text-blue-100 hover:text-white transition-colors">
                potsdam@fahrschuleabf.de
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5" />
            <div>
              <div className="text-sm font-medium">Besuchen Sie uns</div>
              <div className="text-blue-100">
                Tuchmacherstraße 45b, 14482 Potsdam
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickContact;
