'use client';

import React, { forwardRef, useRef } from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, Typography } from '@/components/elements';
import { Section, Container, Grid, Flex } from '@/components/layout';
import { Mail, MapPin, Phone } from 'lucide-react';
import { LayoutProps } from '@/types';
import { cn } from '@/utils';
import { ContactSchema } from '@/schema';

export const Contact = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
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
    const onSubmit = (data: z.infer<typeof ContactSchema>) => {
      console.log('Contact Form Data:', data);
    };

    const contactRef = useRef<HTMLDivElement>(null);
    return (
      <Section
        id={props.id}
        variant={'default'}
        comp="contact"
        theme={theme}
        className={`min-h-screen ${className}`}
        yspace="10xl"
        ref={contactRef}
        {...props}
      >
        <Container height="full" width="2xl">
          <Flex variant="col" gap="8xl">
            {/* Heading */}
            <Flex variant="col" width="full" justify="center" align="center">
              <Typography
                className="select-none"
                size="10xl"
                weight="bold"
                align="center"
                animation={{
                  type: 'split-words',
                  duration: 0.2,
                  delay: 0.05,
                  ease: 'easeInOut',
                  hover: {
                    text: "LET'S WORK TOGETHER",
                    duration: 0.2,
                    delay: 0.05,
                    ease: 'easeInOut',
                    stagger: 0.05,
                  },
                }}
              >
                LET&apos;S WORK TOGETHER
              </Typography>
              <Typography
                className="select-none"
                size="2xl"
                weight="medium"
                contrast="medium"
                align="center"
                animation={{
                  type: 'split-words',
                  duration: 0.2,
                  delay: 0.05,
                  ease: 'easeInOut',
                  hover: {
                    text: " Ready to bring your creative vision to life? Let's start a conversation.",
                    duration: 0.2,
                    delay: 0.05,
                    ease: 'easeInOut',
                    stagger: 0.05,
                  },
                }}
              >
                Ready to bring your creative vision to life? Let&apos;s start a
                conversation.
              </Typography>
            </Flex>

            {/* Contact Info */}
            <Grid>
              {/* Contact Information */}
              <Grid.Item span={[{ span: 12 }, { breakpoint: 'lg', span: 6 }]}>
                <Flex variant="col" gap="xl">
                  <Flex justify="start" align="center" gap="md">
                    <Mail size={24} />
                    <Flex variant="col" justify="start" align="start" gap="3xs">
                      <h3 className="mb-1 font-bold">Email</h3>
                      <p className="opacity-70">kahn12345678@gmail.com</p>
                    </Flex>
                  </Flex>
                  <Flex justify="start" align="center" gap="md">
                    <MapPin size={24} />
                    <Flex variant="col" justify="start" align="start" gap="3xs">
                      <h3 className="font-bold">Location</h3>
                      <p className="opacity-70">Ho Chi Minh City, Vietnam</p>
                    </Flex>
                  </Flex>
                </Flex>
              </Grid.Item>
              {/* Form Content */}
              <Grid.Item span={[{ span: 12 }, { breakpoint: 'lg', span: 6 }]}>
                <Form {...form}>
                  <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
                    <Flex variant="col" gap="lg">
                      {/* Product Information */}
                      <Flex variant="col" gap="xl">
                        {/* Form Fields */}
                        <Flex variant="col">
                          {/* Full Name */}
                          <Form.Field
                            control={form.control}
                            name="fullname"
                            render={({ field, fieldState: { error } }) => (
                              <Form.Item>
                                <Form.Label>
                                  <Typography ashtml="span">
                                    Full Name{' '}
                                    <Typography
                                      ashtml="span"
                                      color="error"
                                      contrast="medium"
                                    >
                                      *
                                    </Typography>
                                  </Typography>
                                </Form.Label>
                                <Form.Control>
                                  <Input
                                    type="text"
                                    placeholder="Full Name"
                                    className={cn(
                                      'w-full placeholder:text-black',
                                      {
                                        'border-error placeholder:text-error text-error':
                                          error,
                                      }
                                    )}
                                    {...field}
                                  />
                                </Form.Control>
                                <Form.Message />
                              </Form.Item>
                            )}
                          />

                          {/* Email */}
                          <Form.Field
                            control={form.control}
                            name="email"
                            render={({ field, fieldState: { error } }) => (
                              <Form.Item>
                                <Form.Label>
                                  <Typography ashtml="span">
                                    Email{' '}
                                    <Typography
                                      ashtml="span"
                                      color="error"
                                      contrast="medium"
                                    >
                                      *
                                    </Typography>
                                  </Typography>
                                </Form.Label>
                                <Form.Control>
                                  <Input
                                    type="text"
                                    placeholder="Email"
                                    className={cn(
                                      'w-full placeholder:text-black',
                                      {
                                        'border-error placeholder:text-error text-error':
                                          error,
                                      }
                                    )}
                                    {...field}
                                  />
                                </Form.Control>
                                <Form.Message />
                              </Form.Item>
                            )}
                          />

                          {/* Message */}
                          <Form.Field
                            control={form.control}
                            name="message"
                            render={({ field, fieldState: { error } }) => (
                              <Form.Item>
                                <Form.Label>
                                  <Typography ashtml="span">
                                    Message{' '}
                                    <Typography
                                      ashtml="span"
                                      color="error"
                                      contrast="medium"
                                    >
                                      *
                                    </Typography>
                                  </Typography>
                                </Form.Label>
                                <Form.Control>
                                  <Input
                                    type="text"
                                    placeholder="Message"
                                    className={cn(
                                      'w-full placeholder:text-black',
                                      {
                                        'border-error placeholder:text-error text-error':
                                          error,
                                      }
                                    )}
                                    {...field}
                                  />
                                </Form.Control>
                                <Form.Message />
                              </Form.Item>
                            )}
                          />
                        </Flex>

                        {/* Action Buttons */}
                        <Flex align="center" justify="start">
                          <Button
                            type="submit"
                            className="hover:bg-contrast-high cursor-pointer transition-all duration-200"
                            variant="default"
                            color="primary"
                            contrast="highest"
                            padding="md"
                            rounded="md"
                          >
                            <Typography
                              className="select-none"
                              ashtml="span"
                              size="md"
                              align="center"
                              color="invert"
                              weight="medium"
                            >
                              Submit
                            </Typography>
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </form>
                </Form>
              </Grid.Item>
            </Grid>
          </Flex>
        </Container>
      </Section>
    );
  }
);

Contact.displayName = 'Contact';
