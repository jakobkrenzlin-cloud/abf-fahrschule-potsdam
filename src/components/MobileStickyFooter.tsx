import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { callPhone, openWhatsApp } from '@/lib/tracking';
import { PHONE_RAW, WHATSAPP_BASE } from '@/components/lp/constants';

interface MobileStickyFooterProps {
  /** 'form' = Seite mit Formular ("Jetzt anmelden" + Anrufen), 'contact' = Anrufen + WhatsApp */
  mode?: 'form' | 'contact';
  /** Ziel-Anker für "Jetzt anmelden" (Standard: #contact) */
  formAnchor?: string;
  source?: string;
}

const MobileStickyFooter: React.FC<MobileStickyFooterProps> = ({
  mode = 'contact',
  formAnchor = 'contact',
  source = 'sticky-footer',
}) => {
  const handleCall = () => callPhone(PHONE_RAW, source);
  const handleWhatsApp = () =>
    openWhatsApp(
      `${WHATSAPP_BASE}?text=${encodeURIComponent(
        'Hallo, ich interessiere mich für den Führerschein bei der ABF Fahrschule Potsdam.'
      )}`,
      source
    );
  const scrollToForm = () =>
    document.getElementById(formAnchor)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-black/[0.08] shadow-elevated z-50 md:hidden safe-area-inset-bottom">
      <div className="flex gap-2 p-3">
        {mode === 'form' ? (
          <>
            <button
              type="button"
              onClick={scrollToForm}
              className="flex-[2] min-h-[48px] rounded-xl bg-brand-strong text-white font-semibold active:scale-[0.98] transition-transform"
            >
              Jetzt anmelden
            </button>
            <button
              type="button"
              onClick={handleCall}
              className="flex-1 min-h-[48px] rounded-xl border-2 border-brand text-brand-dark font-semibold flex items-center justify-center gap-2"
              aria-label="Jetzt anrufen"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              Anrufen
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleCall}
              className="flex-1 min-h-[48px] rounded-xl bg-brand-strong text-white font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              aria-label="Jetzt anrufen"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              Anrufen
            </button>
            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex-1 min-h-[48px] rounded-xl bg-success text-white font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              aria-label="WhatsApp öffnen"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              WhatsApp
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileStickyFooter;
