'use client';

import React, { forwardRef, useRef } from 'react';
import { LayoutProps } from '@/types';
import { Typography, Card } from '@/components/elements';
import { Section, Container, Grid, Flex } from '@/components/layout';
import { Eye } from 'lucide-react';

export const Work = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    return (
      <Section
        id={props.id}
        variant={'default'}
        comp="work-section"
        theme={'dark'}
        className={`z-20 ${className}`}
        yspace="10xl"
        ref={ref}
        rounded="2xl"
        {...props}
      >
        <Container className="gap-4xl" height="full" width="2xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tighter md:text-6xl">
              SELECTED WORKS
            </h2>
            <p className="mx-auto max-w-2xl text-lg opacity-70">
              A curated collection of projects that showcase creative excellence
              and visual innovation
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Editorial Series',
                category: 'Photography',
                size: 'large',
              },
              { title: 'Brand Identity', category: 'Design', size: 'medium' },
              {
                title: 'Fashion Campaign',
                category: 'Creative Direction',
                size: 'medium',
              },
              {
                title: 'Digital Art',
                category: 'Illustration',
                size: 'medium',
              },
              {
                title: 'Magazine Layout',
                category: 'Print Design',
                size: 'large',
              },
              { title: 'Web Experience', category: 'Digital', size: 'medium' },
            ].map((project, index) => (
              <div
                key={index}
                className={`group relative cursor-pointer overflow-hidden transition-all duration-700 hover:scale-105 ${
                  project.size === 'large' ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                  <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Eye
                      size={48}
                      className="transform text-white opacity-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
                    />
                  </div>
                </div>
                <div className="absolute right-0 bottom-0 left-0 translate-y-full transform p-6 text-white transition-transform duration-500 group-hover:translate-y-0">
                  <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                  <p className="text-sm opacity-80">{project.category}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    );
  }
);

Work.displayName = 'Work';
