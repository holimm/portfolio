'use client';

import React, { forwardRef, useRef } from 'react';
import { Typography } from '@/components/elements';
import { Section, Container, Grid, Flex } from '@/components/layout';
import { LayoutProps } from '@/types';
import { Quote } from 'lucide-react';

export const Testimonials = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const testimonialsRef = useRef<HTMLDivElement>(null);
    return (
      <Section
        id={props.id}
        variant={'default'}
        comp="testimonials-section"
        theme={theme}
        className={`min-h-screen ${className}`}
        yspace="10xl"
        ref={testimonialsRef}
        {...props}
      >
        <Container height="full" width="2xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tighter md:text-6xl">
              CLIENT VOICES
            </h2>
            <p className="mx-auto max-w-2xl text-lg opacity-70">
              What industry leaders and collaborators say about working together
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  'An exceptional creative director who brings vision to life with unparalleled attention to detail. Every project exceeded our expectations.',
                author: 'Sarah Chen',
                role: 'Creative Director',
                company: 'Vogue Magazine',
              },
              {
                quote:
                  'Working with this portfolio was transformative for our brand. The aesthetic vision and execution were absolutely flawless.',
                author: 'Marcus Rodriguez',
                role: 'Brand Manager',
                company: 'Luxury Fashion House',
              },
              {
                quote:
                  'A true artist who understands the intersection of commerce and creativity. The results speak for themselves.',
                author: 'Elena Vasquez',
                role: 'Editor-in-Chief',
                company: "Harper's Bazaar",
              },
              {
                quote:
                  'Incredible ability to translate abstract concepts into stunning visual narratives. A master of their craft.',
                author: 'David Kim',
                role: 'Photography Director',
                company: 'Elle Magazine',
              },
              {
                quote:
                  'The level of sophistication and artistic vision brought to our campaign was extraordinary. Truly world-class work.',
                author: 'Isabella Thompson',
                role: 'Marketing Director',
                company: 'High-End Retail',
              },
              {
                quote:
                  'A collaborative genius who elevates every project. The attention to detail and creative vision is unmatched.',
                author: 'James Mitchell',
                role: 'Creative Producer',
                company: 'Fashion Week',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group relative cursor-pointer bg-white p-8 transition-all duration-500 hover:bg-black hover:text-white"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div className="absolute top-6 left-6 opacity-20 transition-opacity duration-500 group-hover:opacity-40">
                  <Quote size={32} />
                </div>

                <div className="relative z-10">
                  <blockquote className="mb-6 text-lg leading-relaxed font-light">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="border-t border-gray-200 pt-6 transition-colors duration-500 group-hover:border-white/20">
                    <div className="mb-1 text-lg font-bold">
                      {testimonial.author}
                    </div>
                    <div className="mb-1 text-sm opacity-70">
                      {testimonial.role}
                    </div>
                    <div className="text-xs tracking-wider uppercase opacity-50">
                      {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-black transition-transform duration-500 group-hover:scale-x-100"></div>
              </div>
            ))}
          </div>

          {/* Bottom accent */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 text-sm tracking-wider uppercase opacity-50">
              <div className="h-px w-12 bg-black"></div>
              <span>Trusted by Industry Leaders</span>
              <div className="h-px w-12 bg-black"></div>
            </div>
          </div>
        </Container>
      </Section>
    );
  }
);

Testimonials.displayName = 'Testimonials';
