import React from 'react';
import Header from '@/components/Header';

interface LpHeaderProps {
  onCtaClick: () => void;
  ctaLabel?: string;
}

/** Schlanker Modus derselben Kopfzeile für die Anzeigen-Landingpages. */
const LpHeader: React.FC<LpHeaderProps> = ({ onCtaClick, ctaLabel = 'Jetzt anmelden' }) => (
  <Header variant="lp" onCtaClick={onCtaClick} ctaLabel={ctaLabel} />
);

export default LpHeader;
