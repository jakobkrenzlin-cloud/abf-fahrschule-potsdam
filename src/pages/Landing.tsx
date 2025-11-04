import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Phone, 
  MessageCircle, 
  CheckCircle, 
  Star, 
  Clock,
  MapPin,
  Mail,
  Calendar,
  Users,
  Award,
  GraduationCap,
  FileCheck,
  Shield
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

// Validation Schema
const leadSchema = z.object({
  name: z.string().trim().min(2, "Name muss mindestens 2 Zeichen haben").max(100),
  phone: z.string().trim().min(10, "Bitte gültige Telefonnummer eingeben").max(20),
  license_class: z.enum(["B", "BF17"], { required_error: "Bitte Führerscheinklasse wählen" }),
  message: z.string().max(500).optional(),
  consent: z.boolean().refine(val => val === true, "Bitte Datenschutzerklärung akzeptieren"),
});

type LeadFormData = z.infer<typeof leadSchema>;

const PHONE_NUMBER = "+493312000696";
const WHATSAPP_LINK = `https://wa.me/493312000696`;

const Landing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const variant = searchParams.get("variant") || "a"; // A/B Test variant
  
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    phone: "",
    license_class: "B" as const,
    message: "",
    consent: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Capture UTM parameters
  useEffect(() => {
    const utmParams = {
      utm_source: searchParams.get("utm_source") || "",
      utm_medium: searchParams.get("utm_medium") || "",
      utm_campaign: searchParams.get("utm_campaign") || "",
      utm_term: searchParams.get("utm_term") || "",
      utm_content: searchParams.get("utm_content") || "",
    };
    sessionStorage.setItem("utm_params", JSON.stringify(utmParams));
  }, [searchParams]);

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, params);
    }
  };

  const handleCall = () => {
    trackEvent("click_call", { lead_type: "call" });
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  const handleWhatsApp = () => {
    trackEvent("click_whatsapp", { lead_type: "whatsapp" });
    window.open(WHATSAPP_LINK, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const validatedData = leadSchema.parse(formData);
      const utmParams = JSON.parse(sessionStorage.getItem("utm_params") || "{}");

      const { error } = await supabase.from("leads").insert([
        {
          full_name: validatedData.name,
          phone: validatedData.phone,
          license_class: validatedData.license_class,
          message: validatedData.message || null,
          utm_source: utmParams.utm_source || null,
          utm_medium: utmParams.utm_medium || null,
          utm_campaign: utmParams.utm_campaign || null,
          utm_term: utmParams.utm_term || null,
          utm_content: utmParams.utm_content || null,
        },
      ]);

      if (error) throw error;

      trackEvent("generate_lead", {
        lead_type: "form",
        license_class: validatedData.license_class,
        ...utmParams,
      });

      toast.success("Danke! Wir melden uns innerhalb von 24 h.");
      navigate("/danke");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Bitte alle Pflichtfelder korrekt ausfüllen.");
      } else {
        toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isVariantB = variant === "b";

  return (
    <>
      <Helmet>
        <title>ABF Fahrschule Potsdam-Babelsberg | Führerschein ab 479 € | Jetzt anmelden</title>
        <meta
          name="description"
          content="Schnell & stressfrei zum Führerschein in Potsdam. Start ab 479 €. Flexible Termine, erfahrene Fahrlehrer. Jetzt anmelden!"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DrivingSchool",
            name: "ABF Bildungszentrum & Fahrschule GmbH",
            image: "/abf-logo.png",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Tuchmacherstraße 45 B, Weber Park",
              addressLocality: "Potsdam",
              postalCode: "14482",
              addressCountry: "DE",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 52.3935,
              longitude: 13.0967,
            },
            telephone: PHONE_NUMBER,
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "12:00",
                closes: "18:00",
              },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "200",
            },
            url: "https://www.abf-fahrschule.de",
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {isVariantB ? "Sicher & stressfrei zum Führerschein" : "Führerschein in Potsdam-Babelsberg – Start ab 479 €"}
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground">
                {isVariantB 
                  ? "Mit über 500 erfolgreichen Fahrschülern und erfahrenen Fahrlehrern zum Führerschein – Start ab 479 €"
                  : "14 Theoriestunden, LernApp & Erste Hilfe inklusive. Starte jetzt stressfrei."}
              </h2>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg">Flexible Termine & schnelle Terminvergabe</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg">Erfahrene, geduldige Fahrlehrer</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg">Zentrale Lage im Weber Park</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  size="lg" 
                  className={`text-lg px-8 py-6 ${isVariantB ? 'bg-primary hover:bg-primary/90' : 'bg-accent hover:bg-accent/90'}`}
                  onClick={scrollToForm}
                >
                  Jetzt Platz sichern
                </Button>
                <div className="flex gap-2">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleCall}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Anrufen
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="flex-1"
                    onClick={handleWhatsApp}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-muted rounded-2xl overflow-hidden">
                <img 
                  src="/lovable-uploads/fahrlehrer-portrait.jpg" 
                  alt="ABF Fahrlehrer mit Fahrschüler im Auto"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof (Variant B shows this earlier) */}
      {isVariantB && (
        <section className="py-12 px-4 bg-card">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  „Schnell Termine bekommen – in 2 Monaten durch!"
                </p>
                <p className="text-sm font-medium">– Nina W.</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  „Geduldig & fair – absolut empfohlen!"
                </p>
                <p className="text-sm font-medium">– Malou D.</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  „Moderne Autos, top Team!"
                </p>
                <p className="text-sm font-medium">– Daniel S.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Value Stack / Offer Box */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 border-2 border-primary/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ABF Startpaket – Anmeldung ab 479 €
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-lg">14 Theoriestunden inklusive</p>
              </div>
              <div className="flex items-start gap-3">
                <FileCheck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-lg">LernApp vom Vogel Verlag inklusive</p>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-lg">Erste Hilfe inklusive</p>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-lg">Moderne Automatik-Fahrzeuge</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6 text-center">
              Prüfungsgebühren und Sehtest nicht enthalten. Details in unseren AGB.
            </p>

            <div className="text-center">
              <Button 
                size="lg" 
                className={`text-lg px-12 py-6 ${isVariantB ? 'bg-primary hover:bg-primary/90' : 'bg-accent hover:bg-accent/90'}`}
                onClick={scrollToForm}
              >
                Anmeldung starten
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof (Variant A shows this here) */}
      {!isVariantB && (
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Das sagen unsere Fahrschüler
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  „Schnell Termine bekommen – in 2 Monaten durch!"
                </p>
                <p className="font-medium">– Nina W.</p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  „Geduldig & fair – absolut empfohlen!"
                </p>
                <p className="font-medium">– Malou D.</p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  „Moderne Autos, top Team!"
                </p>
                <p className="font-medium">– Daniel S.</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-primary" />
                <span className="font-medium">TÜV geprüft</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                <span className="font-medium">DEKRA zertifiziert</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <span className="font-medium">500+ Fahrschüler bestanden</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How it Works - 4 Steps */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            So funktioniert's
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            In 4 einfachen Schritten zum Führerschein
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Online anmelden</h3>
              <p className="text-muted-foreground">
                Formular ausfüllen – wir melden uns innerhalb von 24 Stunden
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Theorie besuchen</h3>
              <p className="text-muted-foreground">
                14 Theoriestunden flexibel planen plus LernApp nutzen
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Fahrstunden planen</h3>
              <p className="text-muted-foreground">
                Individuelle Termine mit erfahrenen Fahrlehrern vereinbaren
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Prüfung bestehen</h3>
              <p className="text-muted-foreground">
                Theorie- und Praxisprüfung meistern – Führerschein in der Hand!
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              className={`text-lg px-8 py-6 ${isVariantB ? 'bg-primary hover:bg-primary/90' : 'bg-accent hover:bg-accent/90'}`}
              onClick={scrollToForm}
            >
              Jetzt starten
            </Button>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead-form" className="py-16 px-4 bg-background scroll-mt-20">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 border border-border">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
              Kostenlose Beratung
            </h2>
            <p className="text-center text-muted-foreground mb-8 text-lg">
              Wir melden uns innerhalb von 24 Stunden
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
              
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ihr vollständiger Name"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Telefon *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+49 123 456789"
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Label htmlFor="license_class">Führerscheinklasse *</Label>
                <Select
                  value={formData.license_class}
                  onValueChange={(value: "B" | "BF17") =>
                    setFormData({ ...formData, license_class: value })
                  }
                >
                  <SelectTrigger className={errors.license_class ? "border-destructive" : ""}>
                    <SelectValue placeholder="Klasse wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="B">Klasse B (ab 18 Jahre)</SelectItem>
                    <SelectItem value="BF17">Klasse BF17 (ab 17 Jahre)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.license_class && (
                  <p className="text-sm text-destructive mt-1">{errors.license_class}</p>
                )}
              </div>

              <div>
                <Label htmlFor="message">Nachricht (optional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Haben Sie Fragen oder besondere Wünsche?"
                  rows={4}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, consent: checked as boolean })
                  }
                  className={errors.consent ? "border-destructive" : ""}
                />
                <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                  Ich stimme der Verarbeitung meiner Daten gemäß{" "}
                  <a href="/datenschutz" className="text-primary hover:underline">
                    Datenschutzerklärung
                  </a>{" "}
                  zu. *
                </Label>
              </div>
              {errors.consent && <p className="text-sm text-destructive">{errors.consent}</p>}

              <Button
                type="submit"
                size="lg"
                className={`w-full text-lg py-6 ${isVariantB ? 'bg-primary hover:bg-primary/90' : 'bg-accent hover:bg-accent/90'}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Wird gesendet..." : "Anfrage senden"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Oder direkt per{" "}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="text-primary hover:underline font-medium"
                >
                  WhatsApp
                </button>{" "}
                /{" "}
                <button
                  type="button"
                  onClick={handleCall}
                  className="text-primary hover:underline font-medium"
                >
                  Anruf
                </button>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Unser Standort im Weber Park
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Adresse</h3>
                  <p className="text-muted-foreground">
                    Tuchmacherstraße 45 B<br />
                    Weber Park<br />
                    14482 Potsdam
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Telefon</h3>
                  <a href={`tel:${PHONE_NUMBER}`} className="text-primary hover:underline">
                    +49 331 200 06 96
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">E-Mail</h3>
                  <a href="mailto:info@abf-fahrschule.de" className="text-primary hover:underline">
                    info@abf-fahrschule.de
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Öffnungszeiten</h3>
                  <p className="text-muted-foreground">
                    Montag – Freitag: 12:00 – 18:00 Uhr<br />
                    Samstag & Sonntag: Geschlossen
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleCall} className="flex-1">
                  <Phone className="w-5 h-5 mr-2" />
                  Anrufen
                </Button>
                <Button onClick={handleWhatsApp} variant="outline" className="flex-1">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2432.5!2d13.0967!3d52.3935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDIzJzM2LjYiTiAxM8KwMDUnNDguMSJF!5e0!3m2!1sde!2sde!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ABF Fahrschule Standort Weber Park"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Häufige Fragen
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Hier findest du Antworten auf die wichtigsten Fragen
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Wie schnell kann ich starten?
              </AccordionTrigger>
              <AccordionContent>
                In der Regel kannst du innerhalb weniger Tage mit dem Theorieunterricht beginnen.
                Wir planen flexibel und finden schnell einen passenden Termin für dich.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Ist Ratenzahlung möglich?
              </AccordionTrigger>
              <AccordionContent>
                Ja, Ratenzahlung ist möglich. Sprich uns einfach an – gemeinsam finden wir eine
                faire und flexible Lösung, die zu deiner Situation passt.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Gibt es Automatik-Fahrzeuge?
              </AccordionTrigger>
              <AccordionContent>
                Ja, wir bieten moderne Automatik-Fahrzeuge an. So kannst du dich voll auf den
                Verkehr konzentrieren, ohne dich um das Schalten kümmern zu müssen.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Was ist im Startpaket enthalten?
              </AccordionTrigger>
              <AccordionContent>
                Im Startpaket ab 479 € sind enthalten: 14 Theoriestunden, die LernApp vom Vogel
                Verlag und der Erste-Hilfe-Kurs. Prüfungsgebühren und Sehtest sind nicht
                enthalten. Alle Details findest du in unseren AGB.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Wie lange dauert der Führerschein?
              </AccordionTrigger>
              <AccordionContent>
                Die Dauer hängt von deiner Verfügbarkeit und deinem Übungsstand ab. Viele
                Fahrschüler schaffen es innerhalb weniger Monate – bei flexibler Terminplanung
                oft sogar schneller.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Starte jetzt deinen Führerschein in Potsdam
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Flexible Termine • Erfahrene Fahrlehrer • Moderne Fahrzeuge
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className={`text-lg px-8 py-6 ${isVariantB ? 'bg-primary hover:bg-primary/90' : 'bg-accent hover:bg-accent/90'}`}
              onClick={scrollToForm}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Jetzt anmelden
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={handleCall}>
              <Phone className="w-5 h-5 mr-2" />
              Direkt anrufen
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ABF Fahrschule</h3>
              <p className="text-sm opacity-90">
                Tuchmacherstraße 45 B<br />
                Weber Park<br />
                14482 Potsdam
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Kontakt</h3>
              <p className="text-sm opacity-90">
                Tel: <a href={`tel:${PHONE_NUMBER}`} className="hover:underline">+49 331 200 06 96</a><br />
                E-Mail: <a href="mailto:info@abf-fahrschule.de" className="hover:underline">info@abf-fahrschule.de</a>
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Rechtliches</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li><a href="/impressum" className="hover:underline">Impressum</a></li>
                <li><a href="/datenschutz" className="hover:underline">Datenschutz</a></li>
                <li><a href="/agb" className="hover:underline">AGB</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-foreground/20 pt-8 text-sm text-center opacity-75">
            <p>© 2024 ABF Bildungszentrum & Fahrschule GmbH. Alle Rechte vorbehalten.</p>
            <p className="mt-2">Alle abgebildeten Personen haben der Veröffentlichung zugestimmt.</p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg p-4 flex gap-2 lg:hidden z-50">
        <Button 
          className={`flex-1 ${isVariantB ? 'bg-primary hover:bg-primary/90' : 'bg-accent hover:bg-accent/90'}`}
          onClick={scrollToForm}
        >
          Jetzt anmelden
        </Button>
        <Button variant="outline" className="flex-1" onClick={handleCall}>
          <Phone className="w-5 h-5 mr-2" />
          Anrufen
        </Button>
      </div>

      {/* WhatsApp Bubble */}
      <button
        onClick={handleWhatsApp}
        className="fixed bottom-20 lg:bottom-8 right-4 lg:right-8 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-transform hover:scale-110"
        aria-label="WhatsApp kontaktieren"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    </>
  );
};

export default Landing;
