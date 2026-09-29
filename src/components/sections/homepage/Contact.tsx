'use client';

import React, { forwardRef, useRef, useState } from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Loading } from '@/components/elements';
import { Section } from '@/components/layout';
import { LayoutProps, SOCIAL_MEDIA_LINKS } from '@/types';
import { cn, sendEmail } from '@/utils';
import { ContactSchema } from '@/schema';
import { toast } from 'sonner';
import { debounce } from 'lodash';
import {
  ArrowPill,
  Availability,
  CONTAINER,
  LocalTime,
  META_LABEL,
  SECTION_SPACING,
  SectionHeader,
  useScrollReveal,
} from '../common';

const EMAIL = 'kahn12345678@gmail.com';

const INLINE_LINK =
  'hover:text-contrast-medium underline decoration-contrast-lower underline-offset-4 transition-colors duration-300';

const CONTACT_DETAILS = [
  {
    label: 'Email',
    value: (
      <a href={`mailto:${EMAIL}`} className={INLINE_LINK}>
        {EMAIL}
      </a>
    ),
    wide: true,
  },
  { label: 'Location', value: 'Ho Chi Minh City, Viet Nam' },
  { label: 'Local time', value: <LocalTime /> },
  {
    label: 'Elsewhere',
    value: (
      <span className="flex flex-wrap gap-x-4 gap-y-1">
        {SOCIAL_MEDIA_LINKS.filter((link) => link.key !== 'email').map(
          (link) => (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={INLINE_LINK}
            >
              {link.name}
            </a>
          )
        )}
      </span>
    ),
    wide: true,
  },
];

// Underlined fields in the page's hairline language; `aria-invalid` comes from `Form.Control`
const FIELD =
  'border-contrast-lower text-contrast-highest placeholder:text-contrast-lower focus:border-contrast-highest aria-[invalid=true]:border-error w-full rounded-none border-0 border-b bg-transparent px-0 py-3 text-lg outline-none transition-colors duration-300 md:text-xl';

export const Contact = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const [loading, setLoading] = useState(false);

    // Form configs
    const form = useForm<z.infer<typeof ContactSchema>>({
      defaultValues: {
        fullname: '',
        email: '',
        message: '',
      },
      resolver: zodResolver(ContactSchema),
    });

    // Methods
    const onSubmit = debounce(async (data: z.infer<typeof ContactSchema>) => {
      setLoading(true);
      const result = await sendEmail({
        fullname: data.fullname,
        email: data.email,
        message: data.message,
      });
      if (result.success) {
        setLoading(false);
        toast.success(result.message || 'Message sent successfully!');
        form.reset();
        return;
      } else {
        setLoading(false);
        toast.error(
          result.message || 'Failed to send message. Please try again later.'
        );
        return;
      }
    }, 1000);

    const sectionRef = useRef<HTMLDivElement>(null);
    useScrollReveal(sectionRef);

    return (
      <Section
        id="contact"
        variant={'default'}
        comp="contact"
        theme={theme}
        layout="block"
        className={cn('min-h-screen', className)}
        yspace="none"
        xspace="none"
        ref={sectionRef}
        {...props}
      >
        <div className={cn(CONTAINER, SECTION_SPACING, 'flex flex-col gap-16')}>
          <SectionHeader
            index="04"
            label="Contact"
            aside={<Availability />}
            title="Ready to bring your idea to life? Let’s start a conversation."
          />

          <div className="grid gap-16 md:grid-cols-3 md:gap-x-6">
            <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-5 md:grid-cols-1">
              {CONTACT_DETAILS.map((item) => (
                <div
                  key={item.label}
                  data-reveal-fade
                  className={cn(
                    'border-contrast-lowest flex flex-col gap-1.5 border-t pt-3',
                    item.wide && 'col-span-2 md:col-span-1'
                  )}
                >
                  <dt className={META_LABEL}>{item.label}</dt>
                  <dd className="text-contrast-highest text-sm md:text-base">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <Loading loading={loading} className="w-full md:col-span-2">
              <Form {...form}>
                <form
                  method="post"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-10"
                >
                  <div className="grid gap-10 md:grid-cols-2 md:gap-x-6">
                    <Form.Field
                      control={form.control}
                      name="fullname"
                      render={({ field }) => (
                        <Form.Item data-reveal-fade className="gap-1">
                          <Form.Label className={META_LABEL}>
                            Full name *
                          </Form.Label>
                          <Form.Control>
                            <input
                              type="text"
                              autoComplete="name"
                              placeholder="Your name"
                              className={FIELD}
                              {...field}
                            />
                          </Form.Control>
                          <Form.Message />
                        </Form.Item>
                      )}
                    />

                    <Form.Field
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <Form.Item data-reveal-fade className="gap-1">
                          <Form.Label className={META_LABEL}>
                            Email *
                          </Form.Label>
                          <Form.Control>
                            <input
                              type="email"
                              autoComplete="email"
                              placeholder="you@example.com"
                              className={FIELD}
                              {...field}
                            />
                          </Form.Control>
                          <Form.Message />
                        </Form.Item>
                      )}
                    />
                  </div>

                  <Form.Field
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <Form.Item data-reveal-fade className="gap-1">
                        <Form.Label className={META_LABEL}>
                          Message *
                        </Form.Label>
                        <Form.Control>
                          <textarea
                            rows={5}
                            placeholder="Tell me about your project"
                            className={cn(FIELD, 'resize-none')}
                            {...field}
                          />
                        </Form.Control>
                        <Form.Message />
                      </Form.Item>
                    )}
                  />

                  <div
                    data-reveal-fade
                    className="text-contrast-medium flex flex-wrap items-center justify-between gap-6 text-sm md:text-base"
                  >
                    <span>Fields marked * are required.</span>
                    <ArrowPill type="submit" disabled={loading}>
                      {loading ? 'Sending…' : 'Send message'}
                    </ArrowPill>
                  </div>
                </form>
              </Form>
            </Loading>
          </div>
        </div>
      </Section>
    );
  }
);

Contact.displayName = 'Contact';
