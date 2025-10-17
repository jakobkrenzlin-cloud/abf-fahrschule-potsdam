import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield, BarChart3, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CookieConsentManager, ConsentStatus } from '@/lib/cookieConsent';
import { Link } from 'react-router-dom';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentStatus>({
    essential: true, // Always true, not changeable
    statistics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already given consent
    const existingConsent = CookieConsentManager.getConsent();
    
    if (!existingConsent) {
      // Show banner after short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Apply existing consent
      CookieConsentManager.applyConsent(existingConsent);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent: ConsentStatus = {
      essential: true,
      statistics: true,
      marketing: true
    };
    CookieConsentManager.saveConsent(fullConsent);
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    CookieConsentManager.saveConsent(consent);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const minimalConsent: ConsentStatus = {
      essential: true,
      statistics: false,
      marketing: false
    };
    CookieConsentManager.saveConsent(minimalConsent);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-2xl w-full m-0 sm:m-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 pb-4 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Cookie-Einstellungen</h2>
                <p className="text-sm text-gray-600 mt-1">Ihre Privatsphäre ist uns wichtig</p>
              </div>
            </div>
            <button
              onClick={handleRejectAll}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Schließen"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Introduction */}
          <div className="text-sm text-gray-700 leading-relaxed">
            <p className="mb-3">
              Wir verwenden Cookies und ähnliche Technologien, um Ihnen ein optimales Website-Erlebnis zu bieten 
              und unsere Dienste zu verbessern. Einige Cookies sind technisch notwendig, andere helfen uns, 
              unsere Leistung zu analysieren und unsere Marketingmaßnahmen zu optimieren.
            </p>
            <p className="text-xs text-gray-600">
              Mehr Informationen finden Sie in unserer{' '}
              <Link to="/datenschutz" className="text-primary hover:underline font-medium">
                Datenschutzerklärung
              </Link>.
            </p>
          </div>

          {/* Simple View */}
          {!showDetails ? (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1 text-sm">
                  <p className="font-medium text-gray-900 mb-1">Schnelle Auswahl</p>
                  <p className="text-gray-600 text-xs">
                    Akzeptieren Sie alle Cookies für das beste Erlebnis, oder wählen Sie einzelne Kategorien aus.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDetails(true)}
                className="text-sm text-primary hover:underline font-medium mt-3 ml-8"
              >
                Einstellungen anpassen →
              </button>
            </div>
          ) : (
            /* Detailed View */
            <div className="space-y-4">
              {/* Essential Cookies */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">Essenziell</h3>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                        Immer aktiv
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht 
                      deaktiviert werden. Sie speichern z.B. Ihre Cookie-Einstellungen.
                    </p>
                  </div>
                </div>
              </div>

              {/* Statistics Cookies */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">Statistik</h3>
                      <Checkbox
                        checked={consent.statistics}
                        onCheckedChange={(checked) => 
                          setConsent({ ...consent, statistics: checked === true })
                        }
                        id="statistics"
                      />
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Statistik-Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, 
                      indem Informationen anonym gesammelt werden (z.B. Google Analytics).
                    </p>
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Target className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">Marketing</h3>
                      <Checkbox
                        checked={consent.marketing}
                        onCheckedChange={(checked) => 
                          setConsent({ ...consent, marketing: checked === true })
                        }
                        id="marketing"
                      />
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Marketing-Cookies werden verwendet, um Besuchern relevante Anzeigen zu zeigen und 
                      die Wirksamkeit unserer Werbekampagnen zu messen (z.B. Google Ads Conversion-Tracking).
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowDetails(false)}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Zurück zur einfachen Ansicht
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 pt-4 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleRejectAll}
              variant="outline"
              className="flex-1 order-2 sm:order-1"
            >
              Nur Essenzielle
            </Button>
            {showDetails && (
              <Button
                onClick={handleAcceptSelected}
                variant="secondary"
                className="flex-1 order-1 sm:order-2"
              >
                Auswahl speichern
              </Button>
            )}
            <Button
              onClick={handleAcceptAll}
              className="flex-1 order-1 sm:order-3"
            >
              Alle akzeptieren
            </Button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            Sie können Ihre Einwilligung jederzeit widerrufen.
          </p>
        </div>
      </div>
    </div>
  );
};
