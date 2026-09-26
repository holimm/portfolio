import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { Flip } from 'gsap/Flip';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { SpringOptions } from '@/types';

gsap.registerPlugin(useGSAP, CustomEase, Flip, ScrollTrigger, ScrollSmoother);

// Cubic-bezier curves of the named eases previously provided by Motion
CustomEase.create('easeIn', '0.42,0,1,1');
CustomEase.create('easeOut', '0,0,0.58,1');
CustomEase.create('easeInOut', '0.42,0,0.58,1');

// Default tween applied to non-transform values (opacity, height, ...) when no transition is given
export const DEFAULT_TRANSITION: gsap.TweenVars = {
  duration: 0.3,
  ease: CustomEase.create('easeDefault', '0.25,0.1,0.35,1'),
};

// Touch devices scroll natively (smoothTouch: false), so pins can use compositor-smooth fixed positioning
export const getPinType = () =>
  ScrollTrigger.isTouch === 1 ? 'fixed' : 'transform';

interface SpringCurve {
  duration: number;
  ease: gsap.EaseFunction;
  // Normalized velocity (distance per second) at a given time into the curve
  velocityAt: (time: number) => number;
}

const SPRING_STEP = 1 / 1000;

// Simulates a spring from 0 to 1 (with an optional normalized initial velocity) into a sampled curve
const simulateSpring = (
  { stiffness = 100, damping = 10, mass = 1 }: SpringOptions,
  initialVelocity = 0
): SpringCurve => {
  const positions = [0];
  const velocities = [initialVelocity];
  let position = 0;
  let velocity = initialVelocity;

  while (positions.length < 10 / SPRING_STEP) {
    const acceleration =
      (-stiffness * (position - 1) - damping * velocity) / mass;
    velocity += acceleration * SPRING_STEP;
    position += velocity * SPRING_STEP;
    positions.push(position);
    velocities.push(velocity);
    if (Math.abs(position - 1) < 0.005 && Math.abs(velocity) < 0.05) break;
  }

  const last = positions.length - 1;
  const sample = (values: number[], index: number) => {
    const i = Math.min(Math.max(index, 0), last);
    const floor = Math.floor(i);
    const next = Math.min(floor + 1, last);
    return values[floor] + (values[next] - values[floor]) * (i - floor);
  };

  return {
    duration: last * SPRING_STEP,
    ease: (progress) =>
      progress >= 1 ? 1 : sample(positions, progress * last),
    velocityAt: (time) => sample(velocities, time / SPRING_STEP),
  };
};

const springCache = new Map<string, SpringCurve>();

// Converts a physical spring into a GSAP duration + ease (for springs that start at rest)
export const spring = (
  options: SpringOptions = {}
): { duration: number; ease: gsap.EaseFunction } => {
  const id = `${options.stiffness}-${options.damping}-${options.mass}`;
  let curve = springCache.get(id);
  if (!curve) {
    curve = simulateSpring(options);
    springCache.set(id, curve);
  }
  return { duration: curve.duration, ease: curve.ease };
};

interface SpringState {
  tween: gsap.core.Tween;
  from: number;
  to: number;
  curve: SpringCurve;
}

const springStates = new WeakMap<Element, Map<string, SpringState>>();

// Springs numeric properties to new values, carrying over the velocity of any spring it interrupts
export const springTo = (
  target: Element | null,
  values: Record<string, number>,
  options: SpringOptions,
  vars: gsap.TimelineVars = {}
) => {
  const timeline = gsap.timeline(vars);
  if (!target) return timeline;

  const states = springStates.get(target) ?? new Map<string, SpringState>();
  springStates.set(target, states);

  Object.entries(values).forEach(([property, to]) => {
    const from = Number(gsap.getProperty(target, property));
    const previous = states.get(property);
    const velocity = previous?.tween.isActive()
      ? (previous.to - previous.from) *
        previous.curve.velocityAt(previous.tween.time())
      : 0;
    previous?.tween.kill();

    const distance = to - from;
    const curve =
      velocity && Math.abs(distance) > 1e-6
        ? simulateSpring(options, velocity / distance)
        : simulateSpring(options);

    const tween = gsap.to(target, {
      [property]: to,
      duration: curve.duration,
      ease: curve.ease,
    });
    states.set(property, { tween, from, to, curve });
    timeline.add(tween, 0);
  });

  return timeline;
};

// Smoothly scrolls to an element through ScrollSmoother, falling back to native scrolling
export const smoothScrollTo = (target: Element) => {
  const smoother = ScrollSmoother.get();

  if (smoother) {
    smoother.scrollTo(target, true);
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

export { gsap, CustomEase, Flip, ScrollSmoother, ScrollTrigger, useGSAP };
