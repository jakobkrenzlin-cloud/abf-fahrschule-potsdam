import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Reveal from './Reveal';
import type { Faq } from './constants';

const FaqBlock: React.FC<{ faqs: Faq[] }> = ({ faqs }) => (
  <section className="py-12 md:py-16 bg-white" aria-labelledby="faq-heading">
    <div className="max-w-3xl mx-auto px-4">
      <Reveal>
        <h2 id="faq-heading" className="text-2xl md:text-4xl font-bold text-brand-dark text-center">
          Häufige Fragen
        </h2>
      </Reveal>
      <Accordion type="single" collapsible className="mt-8 space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={faq.question}
            value={`faq-${i}`}
            className="bg-surface rounded-xl border border-black/5 px-5"
          >
            <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-brand-dark hover:no-underline py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-ink/80 text-base leading-relaxed pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FaqBlock;
