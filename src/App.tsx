import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CookieConsent } from "@/components/CookieConsent";
import { initTracking, trackPageView } from "@/lib/tracking";

// Eager-load home route (most common entry, also drives LCP)
import Index from "./pages/Index";

// Lazy-load everything else to split bundles
const Landing = lazy(() => import("./pages/Landing"));
const B196 = lazy(() => import("./pages/B196"));
const AnmeldungMotorrad = lazy(() => import("./pages/AnmeldungMotorrad"));
const Admin = lazy(() => import("./pages/Admin"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const AGB = lazy(() => import("./pages/AGB"));
const Danke = lazy(() => import("./pages/Danke"));
const Preise = lazy(() => import("./pages/Preise"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const Theorie = lazy(() => import("./pages/Theorie"));
const Karriere = lazy(() => import("./pages/Karriere"));
const KarriereDanke = lazy(() => import("./pages/KarriereDanke"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-[#3b5998] border-t-transparent rounded-full animate-spin" />
  </div>
);

const PageViewTracker = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);
  return null;
};

const App = () => {
  useEffect(() => {
    initTracking();
  }, []);

  return (
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageViewTracker />
          <CookieConsent />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/anmeldung" element={<Landing />} />
              <Route path="/b196" element={<B196 />} />
              <Route path="/anmeldungmotorrad" element={<AnmeldungMotorrad />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/agb" element={<AGB />} />
              <Route path="/danke" element={<Danke />} />
              <Route path="/preise" element={<Preise />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/theorie" element={<Theorie />} />
              <Route path="/karriere" element={<Karriere />} />
              <Route path="/karriere/danke" element={<KarriereDanke />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
