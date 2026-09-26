'use client';

import { forwardRef, HTMLAttributes, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Typography } from '@/components/elements';
import { fadeVariants, gsap } from '@/config';
import { usePresence } from '@/hooks';
import { cn } from '@/utils';
import { GLOBE_CONFIG } from '../config/Globe.Config';
import { useGlobe, UseGlobeProps } from '../utils/Globe.Util';
import { GlobeScene } from './scene/GlobeScene';

export interface GlobeProps
  extends UseGlobeProps,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseGlobeProps> {}

const labelVariants = fadeVariants(0.3);

export const Globe = forwardRef<HTMLDivElement, GlobeProps>(
  ({ className, theme, variant, markers, ...props }, ref) => {
    const context = useGlobe({ ref, theme, variant, markers });
    const { globeStyle, activeMarker } = context;
    const labelContentRef = useRef<HTMLDivElement>(null);

    // Keep showing the last marker while the label fades out
    const [displayedMarker, setDisplayedMarker] = useState(activeMarker);
    if (activeMarker && activeMarker !== displayedMarker) {
      setDisplayedMarker(activeMarker);
    }

    const isLabelMounted = usePresence(!!activeMarker, {
      onEnter: (isInitial) => {
        if (isInitial) gsap.set(labelContentRef.current, labelVariants.hidden);
        return gsap.to(labelContentRef.current, labelVariants.visible);
      },
      onExit: () =>
        gsap.to(
          labelContentRef.current,
          labelVariants.exit ?? labelVariants.hidden
        ),
    });

    return (
      <div
        ref={context.rootRef}
        data-comp="globe"
        data-variant={context.variant}
        className={cn(globeStyle.root(), className)}
        {...props}
      >
        <Canvas
          className={globeStyle.canvas()}
          style={{ opacity: context.ready ? 1 : 0 }}
          camera={{
            position: [0, 0, GLOBE_CONFIG.camera.distance],
            fov: GLOBE_CONFIG.camera.fov,
          }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          frameloop={context.inView ? 'always' : 'never'}
          onCreated={() => context.setReady(true)}
        >
          <GlobeScene
            markers={context.markers}
            palette={context.palette}
            interactive={context.interactive}
            reducedMotion={context.reducedMotion}
            labelRef={context.labelRef}
            onActiveMarkerChange={context.setActiveMarker}
          />
        </Canvas>

        {/* Positioned every frame by GlobeScene */}
        <div ref={context.labelRef} className={globeStyle.labelAnchor()}>
          {isLabelMounted && displayedMarker && (
            <div ref={labelContentRef} className={globeStyle.label()}>
              <Typography
                ashtml="span"
                size="sm"
                weight="medium"
                align="center"
              >
                {displayedMarker.label}
              </Typography>
              {displayedMarker.description && (
                <Typography
                  ashtml="span"
                  size="xs"
                  contrast="medium"
                  align="center"
                >
                  {displayedMarker.description}
                </Typography>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Globe.displayName = 'Globe';
