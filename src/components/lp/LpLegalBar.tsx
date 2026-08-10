import React from 'react';
import { Link } from 'react-router-dom';

/** Schmale Rechtszeile für die Anzeigen-Landingpages. */
const LpLegalBar: React.FC = () => (
  <footer className="bg-brand-dark text-white/70">
    <div className="container-page py-6 pb-28 md:pb-6 flex flex-wrap items-center justify-center gap-x-6 text-small">
      <span>© {new Date().getFullYear()} ABF Fahrschule Potsdam</span>
      <Link to="/impressum" className="inline-flex items-center min-h-[44px] hover:text-white transition-colors">
        Impressum
      </Link>
      <Link to="/datenschutz" className="inline-flex items-center min-h-[44px] hover:text-white transition-colors">
        Datenschutz
      </Link>
    </div>
  </footer>
);

export default LpLegalBar;
