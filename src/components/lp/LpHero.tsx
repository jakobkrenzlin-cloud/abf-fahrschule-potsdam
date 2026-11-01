import React from 'react';
import { Check, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { callPhone, openWhatsApp } from '@/lib/tracking';
import { Stars } from './SocialProof';
import { ADDRESS_LINE, RATING_VALUE, REVIEW_COUNT, PHONE_RAW, WHATSAPP_BASE } from './constants';

interface LpHeroProps {
  id: string;
  headline: string;
  headlineNote?: React.ReactNode;
  subline: string;
  chips: string[];
  directContact?: { whatsappText: string; trackingSource: string };
  children: React.ReactNode; // Formular
}

const LpHero: React.FC<LpHeroProps> = ({ id, headline, headlineNote, subline, chips, directContact, children }) => (
  <section id={id} className="bg-ink section-y">
    <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
          <Stars className="w-4 h-4" />
          <span className="text-white text-sm font-semibold">
            {RATING_VALUE} bei Google · {REVIEW_COUNT} Rezensionen
          </span>
        </div>

        <h1 className="mt-5 text-[2rem] leading-[1.15] md:text-5xl lg:text-[3.4rem] font-extrabold text-white">
          {headline}
        </h1>
        {headlineNote && <p className="mt-3 text-sm text-white/70 leading-relaxed max-w-xl">{headlineNote}</p>}
        <p className="mt-5 text-lg text-white/80 leading-relaxed max-w-xl">{subline}</p>

        <ul className="mt-6 flex flex-wrap gap-2.5">
          {chips.map((chip) => (
            <li
              key={chip}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-brand/15 border border-brand/40 text-white text-sm font-medium"
            >
              <Check className="w-4 h-4 text-brand" aria-hidden="true" />
              {chip}
            </li>
          ))}
        </ul>

        {directContact && (
          <div className="mt-4 flex flex-wrap gap-3" aria-label="Direkter Kontakt">
            <Button type="button" variant="secondary" size="sm" className="text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground/10"
              onClick={() => callPhone(PHONE_RAW, directContact.trackingSource)}>
              <Phone aria-hidden="true" /> Anrufen
            </Button>
            <Button type="button" variant="secondary" size="sm" className="text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground/10"
              onClick={() => openWhatsApp(`${WHATSAPP_BASE}?text=${encodeURIComponent(directContact.whatsappText)}`, directContact.trackingSource)}>
              <MessageCircle aria-hidden="true" /> WhatsApp
            </Button>
          </div>
        )}

        <p className="mt-6 flex items-start gap-2 text-white/70">
          <MapPin className="w-5 h-5 text-brand shrink-0 mt-0.5" aria-hidden="true" />
          <span>{ADDRESS_LINE}</span>
        </p>
      </div>

      <div className="lg:pt-2 min-w-0">{children}</div>
    </div>
  </section>
);

export default LpHero;
