"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

type ScrollTriggerApi = {
  update: () => void;
  refresh: () => void;
};

export const TRANSITION_LOCK_EVENT = "biarq:transition-lock";
export const TRANSITION_SETTLED_EVENT = "biarq:transition-settled";

export default function SmoothScroll() {
  const pathname = usePathname();
  const scrollTriggerRef = useRef<ScrollTriggerApi | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const frame = requestAnimationFrame(() => scrollTriggerRef.current?.refresh());
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const onSettled = () => scrollTriggerRef.current?.refresh();
    window.addEventListener(TRANSITION_SETTLED_EVENT, onSettled);
    return () => window.removeEventListener(TRANSITION_SETTLED_EVENT, onSettled);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches) return;

    let disposed = false;
    let started = false;
    let raf = 0;
    let idle: number | undefined;
    let timer: ReturnType<typeof globalThis.setTimeout> | undefined;
    let lenis: Lenis | null = null;
    let locked = false;

    const onLock = (event: Event) => {
      locked = Boolean((event as CustomEvent<boolean>).detail);
      if (!lenis) return;
      if (locked) lenis.stop();
      else lenis.start();
    };
    window.addEventListener(TRANSITION_LOCK_EVENT, onLock);

    const start = async () => {
      if (disposed || started) return;
      started = true;
      const [{ default: Lenis }, gsapModule, scrollTriggerModule] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;
      const gsap = gsapModule.default;
      const { ScrollTrigger } = scrollTriggerModule;
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerRef.current = ScrollTrigger;

      const instance = new Lenis({ duration: 1.05, smoothWheel: true });
      lenis = instance;
      instance.on("scroll", ScrollTrigger.update);
      if (locked) instance.stop();
      const loop = (time: number) => {
        instance.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };

    if (typeof window.requestIdleCallback === "function") {
      idle = window.requestIdleCallback(() => void start(), { timeout: 1500 });
    } else {
      timer = globalThis.setTimeout(() => void start(), 600);
    }

    return () => {
      disposed = true;
      window.removeEventListener(TRANSITION_LOCK_EVENT, onLock);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) globalThis.clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
      lenis?.destroy();
      scrollTriggerRef.current = null;
    };
  }, []);
  return null;
}
