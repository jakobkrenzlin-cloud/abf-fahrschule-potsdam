
import React from 'react';
import { Trophy, CheckCircle } from 'lucide-react';

const SuccessfulStudentsSection = () => {
  const successfulStudents = [
    {
      imageUrl: "/lovable-uploads/3bdfd6a0-7166-40d9-8196-2bbd6a98655d.png",
      alt: "Fahrschülerin vor der ABF Fahrschule Potsdam mit bestandener Prüfung"
    },
    {
      imageUrl: "/lovable-uploads/753c5aba-03ff-465a-aa50-7ea8dc8b796b.png",
      alt: "Zwei erfolgreiche Fahrschülerinnen vor dem Bildungszentrum ABF Potsdam"
    },
    {
      imageUrl: "/lovable-uploads/eca56e27-4a5a-47dc-925b-7e8a54a01629.png",
      alt: "Glückliche Fahrschülerinnen mit Führerschein vor der ABF Fahrschule"
    },
    {
      imageUrl: "/lovable-uploads/8c2d1108-a7d1-4072-b602-eb0f992cd15d.png",
      alt: "Erfolgreiche Motorradschüler im Ausbildungsraum der ABF Fahrschule"
    },
    {
      imageUrl: "/lovable-uploads/8216d8c0-d564-44af-99a3-381cb19c2679.png",
      alt: "Bestandene Fahrschülerinnen vor dem ABF Bildungszentrum Potsdam"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Unsere erfolgreichen Fahrschüler
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Diese stolzen Gesichter zeigen, was bei der ABF Fahrschule Potsdam möglich ist: 
            Erfolgreiche Prüfungen und glückliche Fahrschüler!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {successfulStudents.map((student, index) => (
            <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={student.imageUrl}
                alt={student.alt}
                className="w-full h-56 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute top-4 right-4">
                <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="text-white">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="font-semibold">Prüfung bestanden!</span>
                  </div>
                  <p className="text-sm text-white/90 mt-1">
                    ABF Fahrschule Potsdam
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Du willst auch dabei sein?
            </h3>
            <p className="text-gray-600 mb-6">
              Werde Teil unserer Erfolgsgeschichte und starte noch heute deine Fahrausbildung 
              bei der ABF Fahrschule in Potsdam!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+4933196795854"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Festnetz anrufen
              </a>
              <a
                href="tel:+4915172193111"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Mobil anrufen
              </a>
              <a 
                href="mailto:potsdam@fahrschuleabf.de" 
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                E-Mail senden
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessfulStudentsSection;
