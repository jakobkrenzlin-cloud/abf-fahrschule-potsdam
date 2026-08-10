import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileStickyFooter from '@/components/MobileStickyFooter';

interface SiteLayoutProps {
  children: React.ReactNode;
  /** 'form' zeigt "Jetzt anmelden" in der Sticky-Leiste, 'contact' zeigt Anrufen + WhatsApp */
  stickyMode?: 'form' | 'contact';
  formAnchor?: string;
  className?: string;
}

const SiteLayout: React.FC<SiteLayoutProps> = ({
  children,
  stickyMode = 'contact',
  formAnchor = 'contact',
  className = '',
}) => (
  <div className={`min-h-screen flex flex-col bg-background ${className}`}>
    <Header />
    <main className="flex-1 pb-24 md:pb-0">{children}</main>
    <Footer />
    <MobileStickyFooter mode={stickyMode} formAnchor={formAnchor} />
  </div>
);

export default SiteLayout;
