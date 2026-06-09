import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, MapPin, Clock, Euro, GraduationCap, Users, Heart } from 'lucide-react';

const JOB_DESCRIPTION = `Werde Teil unseres Teams! Wir bilden dich zum Fahrlehrer aus und bieten dir ein bezahltes Praktikum in unserer modernen Fahrschule in Potsdam. Du lernst von erfahrenen Kollegen, erhältst praxisnahe Einblicke in den Beruf und wirst Schritt für Schritt auf deine Karriere als Fahrlehrer vorbereitet. Voraussetzung: Du befindest dich in der Ausbildung zum Fahrlehrer oder planst diese in Kürze zu beginnen.`;

const bewerbungSchema = z.object({
  name: z.string().trim().min(2, 'Name zu kurz').max(100, 'Name zu lang'),
  phone: z.string().trim().regex(/^[+]?[0-9\s()\-]{6,30}$/, 'Ungültige Telefonnummer'),
  email: z.string().trim().email('Ungültige E-Mail').max(255),
  ausbildungsphase: z.string().trim().max(500).optional(),
});

const Karriere = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', ausbildungsphase: '' });

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": "Fahrlehreranwärter Praktikum (m/w/d) – Ausbildungsfahrschule",
    "description": JOB_DESCRIPTION,
    "datePosted": "2026-06-09",
    "validThrough": "2026-09-30",
    "employmentType": "PART_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "ABF Fahrschule Potsdam",
      "sameAs": "https://abf-fahrschule.de",
      "logo": "https://abf-fahrschule.de/favicon.ico",
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Tuchmacherstraße 45b",
        "addressLocality": "Potsdam",
        "postalCode": "14482",
        "addressCountry": "DE",
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = bewerbungSchema.safeParse(formData);
    if (!parsed.success) {
      toast({
        title: 'Eingaben prüfen',
        description: parsed.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('submit-bewerbung', {
        body: parsed.data,
      });
      if (error) throw error;

      toast({ title: 'Bewerbung gesendet!', description: 'Wir melden uns zeitnah bei dir.' });
      navigate('/danke');
    } catch (err) {
      toast({
        title: 'Fehler',
        description: err instanceof Error ? err.message : 'Bitte versuche es erneut.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Karriere: Fahrlehreranwärter Praktikum Potsdam | ABF Fahrschule</title>
        <meta name="description" content="Fahrlehreranwärter Praktikum (m/w/d) in Potsdam. Werde Teil unseres Teams in der Ausbildungsfahrschule ABF. Jetzt bewerben!" />
        <link rel="canonical" href="https://abf-fahrschule.de/karriere" />
        <meta property="og:title" content="Fahrlehreranwärter Praktikum Potsdam – ABF Fahrschule" />
        <meta property="og:description" content="Werde Teil unseres Teams! Bezahltes Praktikum für Fahrlehreranwärter in Potsdam." />
        <meta property="og:url" content="https://abf-fahrschule.de/karriere" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main className="bg-black text-white pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-600/20 text-blue-300 text-sm font-semibold mb-4">
              Wir stellen ein
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Fahrlehreranwärter gesucht – Deine Ausbildungsfahrschule in Potsdam
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Starte deine Karriere als Fahrlehrer/in bei ABF Potsdam. Wir begleiten dich Schritt für Schritt – mit erfahrenem Team, modernem Equipment und fairer Vergütung.
            </p>
          </div>
        </section>

        {/* Job Details */}
        <section className="py-12 px-4 bg-zinc-950">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <MapPin className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="font-semibold mb-1">Standort</h3>
              <p className="text-gray-400 text-sm">Tuchmacherstraße 45b, 14482 Potsdam</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <Clock className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="font-semibold mb-1">Beschäftigung</h3>
              <p className="text-gray-400 text-sm">Teilzeit / Praktikum</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <Euro className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="font-semibold mb-1">Vergütung</h3>
              <p className="text-gray-400 text-sm">Faire Bezahlung nach Vereinbarung</p>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto space-y-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
                <GraduationCap className="w-7 h-7 text-blue-400" />
                Über die Stelle
              </h2>
              <p className="text-gray-300 leading-relaxed">{JOB_DESCRIPTION}</p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-blue-400" />
                Deine Aufgaben
              </h2>
              <ul className="space-y-3 text-gray-300">
                {[
                  'Begleitung von Fahrstunden unter Anleitung erfahrener Fahrlehrer',
                  'Unterstützung im Theorieunterricht',
                  'Vorbereitung von Unterrichtsmaterialien',
                  'Mitwirkung bei der Schülerbetreuung',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
                <Users className="w-7 h-7 text-blue-400" />
                Dein Profil
              </h2>
              <ul className="space-y-3 text-gray-300">
                {[
                  'Du befindest dich in der Ausbildung zum Fahrlehrer (oder planst diese)',
                  'Freude am Umgang mit Menschen',
                  'Geduld, Verantwortungsbewusstsein und Zuverlässigkeit',
                  'Führerschein Klasse B (weitere Klassen von Vorteil)',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
                <Heart className="w-7 h-7 text-blue-400" />
                Was wir bieten
              </h2>
              <ul className="space-y-3 text-gray-300">
                {[
                  'Praxisnahe Ausbildung in einer etablierten Fahrschule',
                  'Modernes Equipment & freundliches Team',
                  'Faire Vergütung und flexible Zeiten',
                  'Übernahmeperspektive nach erfolgreicher Ausbildung',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 px-4 bg-zinc-950" id="bewerben">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Jetzt bewerben</h2>
              <p className="text-gray-400">Sende uns deine Kurzbewerbung – wir melden uns zeitnah bei dir.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 md:p-8 rounded-lg border border-zinc-800 space-y-5">
              <div>
                <Label htmlFor="name" className="text-white">Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-white">Telefon *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">E-Mail *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ausbildungsphase" className="text-white">
                  In welcher Ausbildungsphase befindest du dich?
                </Label>
                <Textarea
                  id="ausbildungsphase"
                  rows={4}
                  placeholder="z.B. Vorpraktikum, Hauptausbildung, geplanter Start..."
                  value={formData.ausbildungsphase}
                  onChange={(e) => setFormData({ ...formData, ausbildungsphase: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white mt-1"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
              >
                {loading ? 'Wird gesendet…' : 'Absenden'}
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Mit dem Absenden stimmst du der Verarbeitung deiner Daten gemäß unserer Datenschutzerklärung zu.
              </p>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Karriere;
