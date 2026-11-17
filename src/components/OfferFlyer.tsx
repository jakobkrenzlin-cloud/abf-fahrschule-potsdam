import flyerAsset from '@/assets/pkw-winter-angebot.jpg.asset.json';
import { PKW_SAVINGS_NOTE } from '@/config/offer';

interface OfferFlyerProps {
  className?: string;
}

const flyerUrl = import.meta.env.DEV
  ? `https://abf-fahrschule.de${flyerAsset.url}`
  : flyerAsset.url;

const OfferFlyer = ({ className = '' }: OfferFlyerProps) => (
  <figure className={`mx-auto max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-sm ${className}`}>
    <a
      href={flyerUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="PKW-Winter-Angebotsflyer in voller Größe öffnen"
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      <img
        src={flyerUrl}
        alt="PKW-Winter-Angebot: Grundbetrag 299 Euro statt bisher 599 Euro, 14 Theorieeinheiten und Erste-Hilfe-Kurs enthalten. Bei B197 zehn Schaltstunden à 45 Minuten für 0 Euro statt bisher 732 Euro."
        width={896}
        height={1200}
        loading="lazy"
        decoding="async"
        className="h-auto w-full"
      />
    </a>
    <figcaption className="border-t border-border bg-surface px-4 py-3 text-xs leading-relaxed text-muted-foreground">
      {PKW_SAVINGS_NOTE} Weitere Fahrstunden, Lern-App und amtliche Gebühren kommen hinzu.
      <span className="mt-2 block font-medium text-brand-strong">Flyer durch Antippen vergrößern.</span>
    </figcaption>
  </figure>
);

export default OfferFlyer;
