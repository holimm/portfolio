'use client';

import React, { forwardRef, useRef } from 'react';
import { Typography } from '@/components/elements';
import { Section, Container, Grid, Flex } from '@/components/layout';
import { LayoutProps } from '@/types';
import { Mail, MapPin, Phone } from 'lucide-react';

export const Contact = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const contactRef = useRef<HTMLDivElement>(null);
    return (
      <Section
        id={props.id}
        variant={'default'}
        comp="contact"
        theme={theme}
        className={`h-screen ${className}`}
        yspace="10xl"
        ref={contactRef}
        {...props}
      >
        <Container height="full" width="2xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tighter md:text-6xl">
              LET'S WORK TOGETHER
            </h2>
            <p className="mx-auto max-w-2xl text-lg opacity-70">
              Ready to bring your creative vision to life? Let's start a
              conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Mail size={24} />
                <div>
                  <h3 className="mb-1 font-bold">Email</h3>
                  <p className="opacity-70">hello@portfolio.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={24} />
                <div>
                  <h3 className="mb-1 font-bold">Phone</h3>
                  <p className="opacity-70">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={24} />
                <div>
                  <h3 className="mb-1 font-bold">Location</h3>
                  <p className="opacity-70">New York, NY</p>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border-2 border-gray-200 p-4 transition-colors duration-300 outline-none focus:border-black"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border-2 border-gray-200 p-4 transition-colors duration-300 outline-none focus:border-black"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={6}
                  className="w-full resize-none border-2 border-gray-200 p-4 transition-colors duration-300 outline-none focus:border-black"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-black py-4 font-medium tracking-wider text-white transition-colors duration-300 hover:bg-gray-800"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </Container>
      </Section>
    );
  }
);

Contact.displayName = 'Contact';
