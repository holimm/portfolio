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
        <Flex className="h-screen" align="center" justify="center">
          <Grid variant="cols" dimension="6" gap="md">
            <Grid.Item span="4">
              <Card custom="elevated">
                <Card.Header>TEst</Card.Header>
                <Card.Body>
                  <Typography
                    ashtml="h1"
                    color="primary"
                    size="2xl"
                    contrast="medium"
                    weight="bold"
                  >
                    Welcome to the Homepage
                  </Typography>
                </Card.Body>
              </Card>
            </Grid.Item>
            <Grid.Item>
              <Card custom="elevated">
                <Card.Header>TEst</Card.Header>
                <Card.Body>
                  <Typography
                    ashtml="h1"
                    color="primary"
                    size="2xl"
                    contrast="medium"
                    weight="bold"
                  >
                    Welcome to the Homepage
                  </Typography>
                </Card.Body>
              </Card>
            </Grid.Item>
          </Grid>
        </Flex>
      </HomepageProvider>
    );
  }
);

Homepage.displayName = 'Homepage';
