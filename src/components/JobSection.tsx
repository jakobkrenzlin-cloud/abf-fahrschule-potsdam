
import React from 'react';
import { Phone, CalendarDays, FolderOpen, CheckCircle } from 'lucide-react';

const JobSection = () => {
  const tasks = [
    { icon: Phone, text: 'Telefonische und persönliche Betreuung unserer Fahrschüler' },
    { icon: CalendarDays, text: 'Terminplanung und Koordination der Fahrstunden' },
    { icon: FolderOpen, text: 'Allgemeine Büroorganisation und administrative Aufgaben' },
  ];

  const benefits = [
    'Eine 30-Stunden-Woche mit flexiblen Arbeitszeiten',
    'Eine Top-Bezahlung über dem Branchendurchschnitt',
    'Ein modernes Büro im Herzen von Potsdam (WEBERPARK)',
    'Ein herzliches und motiviertes Team',
  ];

  return (
    <section className="py-16 md:py-24 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Werde Teil unseres Teams!
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold text-blue-100">
            Wir suchen: Bürokraft (m/w/d) in Teilzeit (30h/Woche)
          </h3>
          <p className="text-lg text-blue-50 max-w-2xl mx-auto">
            Du bist ein Organisationstalent, liebst den Kontakt mit Menschen und willst Teil einer modernen, wachsenden Fahrschule in Potsdam werden? Dann bist du bei uns genau richtig!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {/* Aufgaben */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-blue-100">Deine Aufgaben</h4>
            <ul className="space-y-4">
              {tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-3">
                  <task.icon className="w-6 h-6 text-blue-200 shrink-0 mt-0.5" />
                  <span className="text-blue-50">{task.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-blue-100">Was wir bieten</h4>
            <ul className="space-y-4">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-300 shrink-0 mt-0.5" />
                  <span className="text-blue-50">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:potsdam@fahrschuleabf.de"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
          >
            Jetzt per E-Mail bewerben
          </a>
          <a
            href="tel:+4933196795854"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
          >
            Festnetz: +49 331 96795854
          </a>
          <a
            href="tel:+491622191290"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
          >
            Mobil: +49 162 2191290
          </a>
        </div>
      </div>
    </section>
  );
};

export default JobSection;
