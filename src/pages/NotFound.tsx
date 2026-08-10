import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/SiteLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: Seite nicht gefunden:", location.pathname);
  }, [location.pathname]);

  return (
    <SiteLayout>
      <Helmet>
        <title>Seite nicht gefunden | ABF Fahrschule Potsdam</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="section-y">
        <div className="container-narrow text-center">
          <p className="text-label font-semibold text-brand-strong uppercase tracking-wide">
            Fehler 404
          </p>
          <h1 className="mt-3 text-h1 md:text-h1-lg text-brand-dark">
            Diese Seite gibt es nicht
          </h1>
          <p className="mt-4 text-body text-ink/75">
            Der Link ist vermutlich veraltet. Hier geht es zurück zum Start – oder direkt zur
            Anmeldung.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center min-h-[56px] px-8 rounded-xl bg-brand-strong hover:bg-brand-strong/90 text-white font-bold transition-colors"
            >
              Zur Startseite
            </Link>
            <Link
              to="/anmeldung"
              className="inline-flex items-center justify-center min-h-[56px] px-8 rounded-xl border-2 border-brand text-brand-dark font-semibold hover:bg-surface transition-colors"
            >
              Jetzt anmelden
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
