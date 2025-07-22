
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection = () => {
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
          {/* Contact Info & Map */}
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

            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-xl p-8 h-64 flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="w-16 h-16 text-blue-600 mx-auto" />
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">Google Maps - Fahrschule Potsdam</h4>
                  <p className="text-gray-600">Finden Sie unsere Fahrschule im WEBERPARK Potsdam</p>
                  <a 
                    href="https://maps.google.com/?q=ABF+Fahrschule+WEBERPARK+Tuchmacherstraße+45b+14482+Potsdam" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-600 hover:text-blue-700 underline"
                  >
                    Route zur Fahrschule Potsdam planen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
