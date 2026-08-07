import React from 'react';
import Reveal from './Reveal';
import type { Step } from './constants';

const Steps: React.FC<{ steps: Step[] }> = ({ steps }) => (
  <section className="py-12 md:py-16 bg-[#F4F7FA]" aria-labelledby="ablauf-heading">
    <div className="max-w-6xl mx-auto px-4">
      <Reveal>
        <h2 id="ablauf-heading" className="text-2xl md:text-4xl font-bold text-[#13243A] text-center">
          So läuft's ab
        </h2>
      </Reveal>
      <ol className="mt-8 grid gap-5 md:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 80}>
            <li className="h-full bg-white rounded-2xl p-6 border border-black/5 list-none">
              <span className="w-11 h-11 rounded-full bg-[#1A9CFF] text-white font-bold text-lg flex items-center justify-center">
                {i + 1}
              </span>
              <h3 className="mt-4 font-bold text-[#13243A] leading-snug">{step.title}</h3>
              {step.text && (
                <p className="mt-2 text-sm text-[#1C1C1C]/75 leading-relaxed">{step.text}</p>
              )}
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export default Steps;
