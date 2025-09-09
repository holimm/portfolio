import React, { forwardRef, useRef, useState } from 'react';
import { Typography } from '@/components/elements';
import { Section, Container, Grid, Flex } from '@/components/layout';
import { LayoutProps } from '@/types';
import { ArrowRight, ChevronDown, Code, Palette, Search } from 'lucide-react';

export const Services = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const servicesRef = useRef<HTMLDivElement>(null);
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const toggleAccordion = (id: string) => {
      setOpenAccordion(openAccordion === id ? null : id);
    };

    const services = [
      {
        id: 'web-development',
        title: 'Web Development',
        icon: Code,
        items: ['CMS Integration', 'Motion & Animations', '3D Development'],
      },
      {
        id: 'web-design',
        title: 'Web Design',
        icon: Palette,
        items: ['Responsive Design', 'Wireframing', 'UX Writing'],
      },
      {
        id: 'seo',
        title: 'SEO',
        icon: Search,
        items: [
          'Technical SEO',
          'On-Page Optimization',
          'SEO Audits & Analysis',
        ],
      },
    ];

    return (
      <Section
        id={props.id}
        variant={'default'}
        comp="services-section"
        theme={'dark'}
        className={`h-screen ${className}`}
        yspace="10xl"
        ref={servicesRef}
        rounded="2xl"
        {...props}
      >
        <Container height="full" width="2xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tighter md:text-6xl">
              WHAT I'M GREAT AT
            </h2>
            <p className="mx-auto max-w-2xl text-lg opacity-70">
              Comprehensive digital solutions tailored to elevate your brand and
              drive results
            </p>
          </div>

          <div className="space-y-4">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isOpen = openAccordion === service.id;

              return (
                <div
                  key={service.id}
                  className="overflow-hidden border border-gray-200 bg-white transition-all duration-500 hover:shadow-lg"
                  style={{
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  <button
                    onClick={() => toggleAccordion(service.id)}
                    className="group flex w-full items-center justify-between px-8 py-6 text-left transition-colors duration-300 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-black p-3 text-white transition-transform duration-300 group-hover:scale-110">
                        <IconComponent size={20} />
                      </div>
                      <h3 className="text-xl font-bold tracking-tight md:text-2xl">
                        {service.title}
                      </h3>
                    </div>
                    <ChevronDown
                      size={24}
                      className={`transition-transform duration-500 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-8 pb-6">
                      <div className="space-y-3 pl-16">
                        {service.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="group flex cursor-pointer items-center gap-3 text-gray-700 transition-colors duration-300 hover:text-black"
                          >
                            <div className="h-2 w-2 rounded-full bg-black opacity-30 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <span className="text-lg font-light tracking-wide">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <button
              //   onClick={() => scrollToSection('contact')}
              className="group inline-flex transform items-center gap-4 bg-black px-8 py-4 font-medium tracking-wider text-white transition-all duration-300 hover:scale-105 hover:bg-gray-800"
            >
              <span>LET'S DISCUSS YOUR PROJECT</span>
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </button>
          </div>
        </Container>
      </Section>
    );
  }
);

Services.displayName = 'Services';
