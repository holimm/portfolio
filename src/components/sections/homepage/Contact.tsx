'use client';

import React, { forwardRef, useRef } from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Form,
  Input,
  Textarea,
  Typography,
} from '@/components/elements';
import { Section, Container, Grid, Flex } from '@/components/layout';
import { Mail, MapPin, Phone } from 'lucide-react';
import { LayoutProps } from '@/types';
import { cn, sendEmail } from '@/utils';
import { ContactSchema } from '@/schema';
import { toast } from 'sonner';
import { debounce } from 'lodash';

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
    const onSubmit = debounce(async (data: z.infer<typeof ContactSchema>) => {
      const result = await sendEmail({
        fullname: data.fullname,
        email: data.email,
        message: data.message,
      });
      if (result.success) {
        toast.success(result.message || 'Message sent successfully!');
      } else {
        toast.error(
          result.message || 'Failed to send message. Please try again later.'
        );
      }
    }, 1000);

    const contactRef = useRef<HTMLDivElement>(null);
    return (
      <Section
        id="contact"
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
                className="xl:!text-10xl select-none sm:!text-6xl md:!text-8xl lg:!text-9xl"
                size="6xl"
                weight="bold"
                align="center"
              >
                LET&apos;S WORK TOGETHER
              </Typography>
              <Typography
                className="select-none"
                size="2xl"
                weight="medium"
                contrast="medium"
                align="center"
              >
                Ready to bring your creative vision to life? Let&apos;s start a
                conversation.
              </Typography>
            </Flex>

            {/* Contact Info */}
            <Grid gap="none">
              {/* Contact Information */}
              <Grid.Item span={[{ span: 12 }, { breakpoint: 'lg', span: 6 }]}>
                <Flex variant="col" gap="xl">
                  <Flex justify="start" align="center" gap="md">
                    <Mail size={24} />
                    <Flex variant="col" justify="start" align="start" gap="3xs">
                      <Typography ashtml="h3" weight="bold">
                        Email
                      </Typography>
                      <Typography contrast="medium">
                        kahn12345678@gmail.com
                      </Typography>
                    </Flex>
                  </Flex>
                  <Flex justify="start" align="center" gap="md">
                    <MapPin size={24} />
                    <Flex variant="col" justify="start" align="start" gap="3xs">
                      <Typography ashtml="h3" weight="bold">
                        Location
                      </Typography>
                      <Typography contrast="medium">
                        Ho Chi Minh City, Vietnam
                      </Typography>
                    </Flex>
                  </Flex>
                </Flex>
              </Grid.Item>
              {/* Form Content */}
              <Grid.Item
                className="mt-10 lg:mt-0"
                span={[{ span: 12 }, { breakpoint: 'lg', span: 6 }]}
              >
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
                                  <Textarea
                                    type="text"
                                    placeholder="Message"
                                    className={cn(
                                      'w-full placeholder:text-black',
                                      {
                                        'border-error placeholder:text-error text-error':
                                          error,
                                      }
                                    )}
                                    rows={6}
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
                            className="hover:bg-contrast-high w-full cursor-pointer transition-all duration-200 lg:w-fit"
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
