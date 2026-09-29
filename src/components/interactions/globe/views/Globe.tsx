'use client';

import {
  forwardRef,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { Canvas } from '@react-three/fiber';
import { Typography } from '@/components/elements';
import { fadeVariants, gsap } from '@/config';
import { usePresence } from '@/hooks';
import { cn } from '@/utils';
import { GLOBE_CONFIG, type GlobeJourney } from '../config/Globe.Config';
import { loadCountries } from '../utils/Geo.Util';
import { useGlobe, UseGlobeProps } from '../utils/Globe.Util';
import { GlobeJourneyScene } from './scene/GlobeJourneyScene';
import { GlobeScene } from './scene/GlobeScene';

export interface GlobeProps
  extends UseGlobeProps,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseGlobeProps> {
  /**
   * Hands the view over to a scroll timeline: controls, auto-rotate and marker focus are
   * disabled, and the canvas only renders when the journey values change.
   */
  journeyRef?: RefObject<GlobeJourney>;
  /** Called once the scene can draw in full: the canvas exists and the country outlines have loaded. */
  onAssetsReady?: () => void;
}

const labelVariants = fadeVariants(0.3);

export const Globe = forwardRef<HTMLDivElement, GlobeProps>(
  (
    { className, theme, variant, markers, journeyRef, onAssetsReady, ...props },
    ref
  ) => {
    const context = useGlobe({ ref, theme, variant, markers });

    // `loadCountries` is cached, so this waits on the same request the outlines use
    useEffect(() => {
      if (!context.ready || !onAssetsReady) return;

      let cancelled = false;
      void loadCountries().then(() => {
        if (!cancelled) onAssetsReady();
      });
      return () => {
        cancelled = true;
      };
    }, [context.ready, onAssetsReady]);
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
          frameloop={
            !context.inView ? 'never' : journeyRef ? 'demand' : 'always'
          }
          onCreated={() => context.setReady(true)}
        >
          {journeyRef ? (
            <GlobeJourneyScene
              markers={context.markers}
              palette={context.palette}
              reducedMotion={context.reducedMotion}
              journeyRef={journeyRef}
            />
          ) : (
            <GlobeScene
              markers={context.markers}
              palette={context.palette}
              interactive={context.interactive}
              reducedMotion={context.reducedMotion}
              labelRef={context.labelRef}
              onActiveMarkerChange={context.setActiveMarker}
            />
          )}
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
