"use client";
import Lenis from "lenis";
import { useEffect } from "react";

export function LenisProvider({
  children,
  options,
  ...props
}: {
  children: React.ReactNode;
  options?: any;
}) {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.options.wheelMultiplier = 0.8;
    lenis.options.lerp = 0.1;
    lenis.options.smoothWheel = true;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return <>{children}</>;
}
