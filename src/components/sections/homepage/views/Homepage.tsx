'use client';
import React, { forwardRef, HTMLAttributes, useMemo } from 'react';
import { useHomepage, UseHomepageProps } from '../utils/useHomepage';
import { ThemeTypes } from '@/types/styles/theme';
import { Locale } from '../../../../../i18n.config';
import { motion } from 'motion/react';
import { HomepageProvider } from '../utils/useHomepageContext';
import { Typography } from '@/components/elements/typography';
import { Card } from '@/components/elements/card';
import { Flex } from '@/components/layout/flex';
import { Grid } from '@/components/layout/grid';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { GridItem } from '@/components/layout/grid/views/GridItem';

export interface HomepageData {}

export interface HomepageOptions extends UseHomepageProps {}

export interface HomepageProps
  extends HomepageOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof HomepageData>,
    HomepageData {
  theme?: ThemeTypes;
  locale: Locale;
}

export const Homepage = forwardRef<HTMLDivElement, HomepageProps>(
  ({ className, children, theme, locale, ...props }, ref) => {
    const { ...context } = useHomepage({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <HomepageProvider value={ctx}>
        <Section
          id={props.id}
          variant={'default'}
          comp="homepage-section"
          theme={theme}
          className={`h-screen ${className}`}
          yspace="10xl"
          ref={ctx.homepageRef}
          {...props}
        >
          <Container height="full" width="2xl">
            <Grid className="h-full" dimension="12">
              <Grid.Item className="h-full" span="8">
                <Container height="full" width="full">
                  <Flex
                    className="h-full"
                    variant="col"
                    gap="xs"
                    justify="end"
                    align="start"
                  >
                    <Typography ashtml="h1" size="xl" weight="light">
                      NGUYEN LIM THAI HO
                    </Typography>
                    <Typography ashtml="h1" size="6xl" weight="bold">
                      Fullstack Developer
                    </Typography>
                    <Typography ashtml="h1" weight="normal" contrast="medium">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Typography>
                  </Flex>
                </Container>
              </Grid.Item>
            </Grid>
          </Container>
        </Section>
        <Section
          id={props.id}
          variant={'default'}
          comp="homepage-section"
          theme={'dark'}
          className={`${className}`}
          yspace="10xl"
          ref={ctx.homepageRef}
          {...props}
        >
          <Container className="gap-4xl" height="full" width="2xl">
            <Flex
              className="h-full"
              variant="col"
              gap="xs"
              justify="center"
              align="start"
            >
              <Typography ashtml="h1" size="xl" weight="light">
                SELECTED PROJECTS
              </Typography>
              <Typography ashtml="h1" size="6xl" weight="bold">
                My Works
              </Typography>
              <Typography ashtml="h1" weight="normal" contrast="medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Flex>
            <Grid className="h-full" dimension="12">
              {[...Array(4)].map((_, index) => (
                <Grid.Item key={index} className="h-full" span="6">
                  <Container height="full" width="full">
                    <Card
                      className="!h-[600px] bg-background-darker"
                      padding="3xl"
                    >
                      <Flex
                        className="h-full"
                        variant="col"
                        gap="xs"
                        justify="start"
                        align="start"
                      >
                        <Typography
                          className="tracking-[0.25rem]"
                          ashtml="h1"
                          size="md"
                          weight="light"
                          color="invert"
                        >
                          2019-2024
                        </Typography>
                        <Typography
                          ashtml="h1"
                          size="4xl"
                          weight="bold"
                          color="invert"
                        >
                          Project Name
                        </Typography>
                      </Flex>
                    </Card>
                  </Container>
                </Grid.Item>
              ))}
            </Grid>
            <Flex
              className="h-full"
              variant="col"
              gap="xs"
              justify="center"
              align="center"
            >
              <Typography ashtml="h1" weight="normal" contrast="higher">
                See more &gt;
              </Typography>
            </Flex>
          </Container>
        </Section>
      </HomepageProvider>
    );
  }
);

Homepage.displayName = 'Homepage';
