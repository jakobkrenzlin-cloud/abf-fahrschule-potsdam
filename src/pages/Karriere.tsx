import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { z } from 'zod';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getAttribution } from '@/lib/tracking';
import {
  Star, MapPin, Phone, Mail, CheckCircle2, Send,
  Euro, Car, Clock, Users, TrendingUp, GraduationCap,
  Briefcase, FileCheck, Coffee, PartyPopper,
} from 'lucide-react';

// ---------- Data ----------
const POSITIONS = [
  {
    id: 'fahrlehrer',
    title: 'Fahrlehrer/in (m/w/d) – Klasse B / BE / A',
    type: 'Vollzeit / Teilzeit',
    category: 'Fahrlehrer',
    salary: '30 €/Std',
    salaryValue: 30,
    short: 'Erfahrener Fahrlehrer für unser wachsendes Team in Potsdam.',
    details: [
      'Gültige Fahrlehrerlaubnis (mind. Klasse BE, A von Vorteil) erforderlich',
      'Faire, leistungsgerechte Vergütung',
      'Moderne, top ausgestattete Schulungsfahrzeuge',
      'Flexible Einteilung – wir richten uns nach deinem Leben',
      'Familiäres Team mit Wertschätzung statt Konkurrenz',
    ],
  },
  {
    id: 'praktikum',
    title: 'Fahrlehreranwärter/in (m/w/d) – Praktikumsstelle',
    type: 'Praktikum (4 Monate)',
    category: 'Praktikum/Ausbildung',
    salary: '25 €/Std',
    salaryValue: 25,
    short: 'Du machst die Fahrlehrerausbildung und suchst eine Ausbildungsfahrschule für dein Praktikum?',
    details: [
      'Persönliche Betreuung durch erfahrene Ausbildungsfahrlehrer',
      'Vergütung während des gesamten Praktikums',
      'Übernahmemöglichkeit nach erfolgreichem Abschluss',
      '2–4 Plätze verfügbar – melde dich frühzeitig',
      'Strukturierter Ausbildungsplan & Schritt-für-Schritt-Einarbeitung',
    ],
  },
  {
    id: 'buero',
    title: 'Büromitarbeiter/in (m/w/d)',
    type: 'Teilzeit / Minijob',
    category: 'Büro & Verwaltung',
    salary: '',
    salaryValue: 0,
    short: 'Organisationstalent gesucht – Terminplanung, Schülerbetreuung und Verwaltung.',
    details: [
      'Freundlicher Kundenkontakt – persönlich, telefonisch & per Mail',
      'Terminkoordination zwischen Fahrlehrern und Schülern',
      'Digitale Verwaltung mit moderner Fahrschulsoftware',
      'Familiäres Umfeld & geregelte Arbeitszeiten',
    ],
  },
  {
    id: 'aushilfe',
    title: 'Aushilfe / Minijob (m/w/d)',
    type: 'Minijob (603€)',
    category: 'Aushilfe/Minijob',
    salary: '',
    salaryValue: 0,
    short: 'Flexible Unterstützung im Fahrschulalltag.',
    details: [
      'Flexible Stunden – ideal für Studierende',
      'Einblick in den Fahrschulbetrieb',
      'Unterstützung bei Verwaltung, Empfang und Organisation',
      'Faire Bezahlung & angenehmes Team',
    ],
  },
] as const;

const CATEGORIES = ['Alle', 'Fahrlehrer', 'Praktikum/Ausbildung', 'Büro & Verwaltung', 'Aushilfe/Minijob'] as const;

const BENEFITS = [
  { icon: Euro, title: 'Faire Vergütung', text: 'Leistungsgerechte Bezahlung, auch im Praktikum.' },
  { icon: Car, title: 'Moderne Fahrzeuge', text: 'Top ausgestattete Schulungsfahrzeuge & digitale Tools.' },
  { icon: Clock, title: 'Flexible Arbeitszeiten', text: 'Planung, die zu deinem Leben passt.' },
  { icon: Users, title: 'Familiäres Team', text: 'Wertschätzung und Zusammenhalt statt Konkurrenz.' },
  { icon: TrendingUp, title: 'Übernahmechance', text: 'Echte Perspektive nach Ausbildung oder Praktikum.' },
  { icon: GraduationCap, title: 'Weiterbildung', text: 'Wir fördern deine fachliche Entwicklung.' },
];

const STEPS = [
  { icon: Send, title: 'Bewerbung absenden', text: 'Formular in 2 Minuten ausfüllen' },
  { icon: Coffee, title: 'Kennenlernen', text: 'Wir melden uns innerhalb von 48h' },
  { icon: Briefcase, title: 'Schnuppertag', text: 'Lerne das Team & den Alltag kennen' },
  { icon: PartyPopper, title: 'Willkommen im Team', text: 'Start bei ABF' },
];

const bewerbungSchema = z.object({
  name: z.string().trim().min(2, 'Name zu kurz').max(100),
  email: z.string().trim().email('Ungültige E-Mail-Adresse').max(255),
  phone: z.string().trim().regex(/^[+]?[0-9\s()\-]{6,30}$/, 'Ungültige Telefonnummer'),
  position: z.string().min(1, 'Bitte Stelle wählen'),
  ausbildungsphase: z.string().max(500).optional(),
  nachricht: z.string().max(2000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: 'Bitte Datenschutz bestätigen' }) }),
});

// ---------- Page ----------
const Karriere = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<typeof CATEGORIES[number]>('Alle');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    ausbildungsphase: '',
    nachricht: '',
    consent: false,
  });

  const filteredJobs = useMemo(
    () => (filter === 'Alle' ? POSITIONS : POSITIONS.filter((p) => p.category === filter)),
    [filter]
  );

  const showAusbildungsphase = formData.position === POSITIONS[1].title;

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const applyForPosition = (title: string) => {
    setFormData((d) => ({ ...d, position: title }));
    setSuccess(false);
    setTimeout(() => scrollTo(formRef), 50);
  };

  // Simple reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('opacity-100', 'translate-y-0');
            e.target.classList.remove('opacity-0', 'translate-y-4');
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

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
        body: {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          position: parsed.data.position,
          ausbildungsphase: parsed.data.ausbildungsphase || '',
          nachricht: parsed.data.nachricht || '',
          ...getAttribution(),
        },
      });
      if (error) throw error;
      setSuccess(true);
      navigate('/karriere/danke', { state: { bewerbung: true } });
    } catch (err) {
      toast({
        title: 'Fehler beim Senden',
        description: err instanceof Error ? err.message : 'Bitte versuche es erneut.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // ---------- JSON-LD ----------
  const today = new Date().toISOString().split('T')[0];
  const employmentTypeFor = (id: string) => {
    if (id === 'praktikum') return 'INTERN';
    if (id === 'aushilfe') return 'PART_TIME';
    if (id === 'buero') return ['PART_TIME', 'CONTRACTOR'];
    if (id === 'fahrlehrer') return ['FULL_TIME', 'PART_TIME'];
    return 'FULL_TIME';
  };

  const jobPostings = POSITIONS.map((p) => {
    const base: Record<string, unknown> = {
      '@context': 'https://schema.org/',
      '@type': 'JobPosting',
      title: p.title,
      description: `<p>${p.short}</p><ul>${p.details.map((d) => `<li>${d}</li>`).join('')}</ul>`,
      datePosted: today,
      validThrough: '2026-12-31',
      employmentType: employmentTypeFor(p.id),
      hiringOrganization: {
        '@type': 'Organization',
        name: 'ABF Fahrschule Potsdam',
        sameAs: 'https://abf-fahrschule.de',
        logo: 'https://abf-fahrschule.de/favicon.ico',
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Tuchmacherstraße 45b',
          addressLocality: 'Potsdam',
          postalCode: '14482',
          addressRegion: 'Brandenburg',
          addressCountry: 'DE',
        },
      },
      directApply: true,
    };
    if (p.salaryValue && p.salaryValue > 0) {
      base.baseSalary = {
        '@type': 'MonetaryAmount',
        currency: 'EUR',
        value: {
          '@type': 'QuantitativeValue',
          value: p.salaryValue,
          unitText: 'HOUR',
        },
      };
    }
    return base;
  });

  return (
    <>
      <Helmet>
        <title>Karriere bei ABF Fahrschule Potsdam – Jobs & Praktikum</title>
        <meta
          name="description"
          content="Werde Teil des ABF-Teams in Potsdam: Fahrlehrer, Fahrlehreranwärter, Büro & Aushilfe. Faire Vergütung, modernes Team, 5,0★ bei Google. Jetzt bewerben!"
        />
        <link rel="canonical" href="https://abf-fahrschule.de/karriere" />
        <meta property="og:title" content="Karriere bei ABF Fahrschule Potsdam – Jobs & Praktikum" />
        <meta
          property="og:description"
          content="Fahrlehrer, Praktikum, Büro & Aushilfe in Potsdam. Faires Team, moderne Fahrzeuge, 5,0★ bei Google."
        />
        <meta property="og:url" content="https://abf-fahrschule.de/karriere" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jobPostings)}</script>
      </Helmet>

      <Header />

      <main className="bg-black text-white pt-12 md:pt-16 pb-20 md:pb-0">
        {/* 1. HERO */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 20% 20%, rgba(26,156,255,0.18), transparent 45%), radial-gradient(circle at 80% 80%, rgba(26,156,255,0.10), transparent 50%), linear-gradient(135deg, #13243A 0%, #1C1C1C 100%)',
            }}
          />
          <div className="absolute inset-0 opacity-[0.08]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />
          <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/30 text-brand text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-brand" />
              5,0 bei Google – ausgezeichnetes Team
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Werde Teil des <span className="text-brand">ABF-Teams</span> in Potsdam
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Ob erfahrener Fahrlehrer, angehender Fahrlehreranwärter oder im Büro – bei uns gestaltest du die Mobilität von morgen mit.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-sm font-semibold">
                <Euro className="w-4 h-4" /> Bis zu 30 €/Stunde
              </span>
            </div>
            <Button
              size="lg"
              onClick={() => scrollTo(jobsRef)}
              className="bg-brand-strong hover:bg-brand-strong/90 text-white font-semibold px-8 py-6 text-base rounded-xl shadow-lg shadow-brand/30 transition-transform hover:scale-105"
            >
              Offene Stellen ansehen
            </Button>
          </div>
        </section>

        {/* 2. WARUM ABF */}
        <section className="py-16 md:py-24 px-4 bg-ink">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12" data-reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Warum ABF?</h2>
              <p className="text-ink/50">Was uns als Arbeitgeber besonders macht</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BENEFITS.map((b, i) => (
                <div
                  key={b.title}
                  data-reveal
                  style={{ transitionDelay: `${i * 60}ms` }}
                  className="opacity-0 translate-y-4 transition-all duration-500 group p-6 rounded-2xl bg-brand-dark/60 border border-white/5 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand/15 flex items-center justify-center mb-4 group-hover:bg-brand/25 transition-colors">
                    <b.icon className="w-6 h-6 text-brand" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{b.title}</h3>
                  <p className="text-sm text-ink/50 leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. OFFENE STELLEN */}
        <section ref={jobsRef} className="py-16 md:py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10" data-reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Offene Stellen</h2>
              <p className="text-ink/50">Finde deine Position – klick dich durch die Details</p>
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="Stellen filtern">
              {CATEGORIES.map((c) => {
                const active = filter === c;
                return (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(c)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      active
                        ? 'bg-brand-strong text-white shadow-md shadow-brand/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            {/* Job cards */}
            <Accordion type="single" collapsible className="space-y-3">
              {filteredJobs.map((job) => (
                <AccordionItem
                  key={job.id}
                  value={job.id}
                  className="border border-white/10 rounded-2xl bg-brand-dark/40 px-5 hover:border-brand/40 transition-colors data-[state=open]:border-brand/60"
                >
                  <AccordionTrigger className="hover:no-underline py-5 [&[data-state=open]>svg]:text-brand">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-left w-full pr-4">
                      <span className="font-semibold text-base md:text-lg">{job.title}</span>
                      <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-brand/15 text-brand w-fit">
                        <Briefcase className="w-3 h-3" /> {job.type}
                      </span>
                      {job.salary && (
                        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold w-fit">
                          <Euro className="w-3 h-3" /> {job.salary}
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="text-gray-300 mb-4">{job.short}</p>
                    <ul className="space-y-2 mb-5">
                      {job.details.map((d) => (
                        <li key={d} className="flex gap-2 text-gray-300 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => applyForPosition(job.title)}
                      className="bg-brand-strong hover:bg-brand-strong/90 text-white font-medium"
                    >
                      Jetzt bewerben
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 4. SO LÄUFT'S AB */}
        <section className="py-16 md:py-24 px-4 bg-ink">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12" data-reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">So läuft's ab</h2>
              <p className="text-ink/50">Vom Klick zum Job – in vier Schritten</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative">
              {STEPS.map((s, i) => (
                <div key={s.title} className="relative flex md:flex-col items-start md:items-center gap-4 md:text-center" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-full bg-brand-strong flex items-center justify-center font-bold text-white shadow-lg shadow-brand/30">
                      {i + 1}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-brand/60 to-brand/0" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 flex items-center md:justify-center gap-2">
                      <s.icon className="w-4 h-4 text-brand md:hidden" />
                      {s.title}
                    </h3>
                    <p className="text-sm text-ink/50">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. BEWERBUNGSFORMULAR */}
        <section ref={formRef} className="py-16 md:py-24 px-4" id="bewerben">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8" data-reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Jetzt bewerben</h2>
              <p className="text-ink/50">Wir melden uns innerhalb von 48 Stunden bei dir.</p>
            </div>

            {success ? (
              <div className="bg-brand-dark/60 border border-brand/40 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-brand/15 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-brand" />
                </div>
                <h3 className="text-xl font-bold mb-2">Vielen Dank!</h3>
                <p className="text-gray-300">
                  Deine Bewerbung ist bei uns angekommen. Wir melden uns innerhalb von 48 Stunden bei dir.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-brand-dark/60 border border-white/10 rounded-2xl p-6 md:p-8 space-y-5">
                <div>
                  <Label htmlFor="position" className="text-white">Auf welche Stelle bewirbst du dich? *</Label>
                  <Select value={formData.position} onValueChange={(v) => setFormData({ ...formData, position: v })}>
                    <SelectTrigger id="position" className="bg-ink border-white/15 text-white mt-1.5">
                      <SelectValue placeholder="Stelle wählen…" />
                    </SelectTrigger>
                    <SelectContent>
                      {POSITIONS.map((p) => (
                        <SelectItem key={p.id} value={p.title}>{p.title}</SelectItem>
                      ))}
                      <SelectItem value="Initiativbewerbung">Initiativbewerbung</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Name *</Label>
                    <Input
                      id="name" required value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-ink border-white/15 text-white mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">Telefon *</Label>
                    <Input
                      id="phone" type="tel" required value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-ink border-white/15 text-white mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">E-Mail *</Label>
                  <Input
                    id="email" type="email" required value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-ink border-white/15 text-white mt-1.5"
                  />
                </div>

                {showAusbildungsphase && (
                  <div>
                    <Label htmlFor="ausbildungsphase" className="text-white">In welcher Ausbildungsphase befindest du dich?</Label>
                    <Select value={formData.ausbildungsphase} onValueChange={(v) => setFormData({ ...formData, ausbildungsphase: v })}>
                      <SelectTrigger id="ausbildungsphase" className="bg-ink border-white/15 text-white mt-1.5">
                        <SelectValue placeholder="Bitte wählen…" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Noch nicht begonnen">Noch nicht begonnen</SelectItem>
                        <SelectItem value="In Ausbildung">In Ausbildung</SelectItem>
                        <SelectItem value="Praktikumsphase">Praktikumsphase</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="nachricht" className="text-white">Deine Nachricht</Label>
                  <Textarea
                    id="nachricht" rows={4} value={formData.nachricht}
                    onChange={(e) => setFormData({ ...formData, nachricht: e.target.value })}
                    placeholder="Erzähl uns kurz etwas über dich…"
                    className="bg-ink border-white/15 text-white mt-1.5"
                  />
                </div>

                <div className="rounded-xl border border-dashed border-white/15 p-4 flex items-start gap-3 text-sm text-ink/50">
                  <FileCheck className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <span>
                    Lebenslauf (PDF) gerne im Anschluss per E-Mail an{' '}
                    <a href="mailto:kontakt@abf-fahrschule.de" className="text-brand hover:underline">
                      kontakt@abf-fahrschule.de
                    </a>{' '}
                    – oder du bringst ihn zum Kennenlerntermin mit.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(v) => setFormData({ ...formData, consent: v === true })}
                    className="mt-1 border-white/30 data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                  />
                  <Label htmlFor="consent" className="text-sm text-gray-300 leading-relaxed">
                    Ich willige in die Verarbeitung meiner Daten gemäß der{' '}
                    <a href="/datenschutz" className="text-brand hover:underline">Datenschutzerklärung</a> ein. *
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-strong hover:bg-brand-strong/90 text-white font-semibold py-6 text-base rounded-xl shadow-lg shadow-brand/30"
                >
                  {loading ? 'Wird gesendet…' : 'Bewerbung absenden'}
                </Button>
              </form>
            )}
          </div>
        </section>

        {/* 6. STANDORT & KONTAKT */}
        <section className="py-16 md:py-20 px-4 bg-ink border-t border-white/5">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div data-reveal className="opacity-0 translate-y-4 transition-all duration-500">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Standort</h2>
              <div className="flex items-start gap-3 text-gray-300 mb-4">
                <MapPin className="w-5 h-5 text-brand mt-0.5 shrink-0" />
                <span>
                  <strong className="text-white">ABF Fahrschule Potsdam</strong><br />
                  Weberpark, Tuchmacherstraße 45b<br />
                  14482 Potsdam
                </span>
              </div>
              <p className="text-sm text-ink/50">
                Direkt im Weberpark Potsdam-Babelsberg – gut erreichbar mit ÖPNV und Auto.
              </p>
            </div>
            <div data-reveal className="opacity-0 translate-y-4 transition-all duration-500">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Direkt für Bewerber</h2>
              <a href="tel:+4933196795854" className="flex items-center gap-3 text-gray-200 hover:text-brand transition-colors mb-3">
                <Phone className="w-5 h-5 text-brand" />
                <span>+49 331 96795854 (Festnetz)</span>
              </a>
              <a href="tel:+491622191290" className="flex items-center gap-3 text-gray-200 hover:text-brand transition-colors mb-3">
                <Phone className="w-5 h-5 text-brand" />
                <span>0162 2191290 (Mobil)</span>
              </a>
              <a href="mailto:kontakt@abf-fahrschule.de" className="flex items-center gap-3 text-gray-200 hover:text-brand transition-colors mb-4">
                <Mail className="w-5 h-5 text-brand" />
                <span>kontakt@abf-fahrschule.de</span>
              </a>
              <p className="text-sm text-ink/50">
                Fragen vorab? Ruf uns einfach an – wir beraten dich unverbindlich.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-black/85 backdrop-blur border-t border-white/10">
        <Button
          onClick={() => scrollTo(formRef)}
          className="w-full bg-brand-strong hover:bg-brand-strong/90 text-white font-semibold py-6 rounded-xl shadow-lg shadow-brand/30"
        >
          In 60 Sekunden bewerben
        </Button>
      </div>

      <Footer />
    </>
  );
};

export default Karriere;
