"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { TRANSITION_LOCK_EVENT, TRANSITION_SETTLED_EVENT } from "@/components/SmoothScroll";

const PANEL_COLORS = ["#3A2A20", "#2B1F18", "#241812", "#1C1714", "#171210"];

const ROUTE_LABELS: Record<string, string> = {
  "/": "Inicio",
  "/projects": "Proyectos",
  "/studio": "Estudio",
  "/services": "Servicios",
  "/contact": "Contacto",
};

function labelFor(pathname: string) {
  if (ROUTE_LABELS[pathname]) return ROUTE_LABELS[pathname];
  if (pathname.startsWith("/projects/")) return "Proyecto";
  return "Bi Arq 1.0";
}

function setScrollLocked(locked: boolean) {
  window.dispatchEvent(new CustomEvent<boolean>(TRANSITION_LOCK_EVENT, { detail: locked }));
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const transitioningRef = useRef(false);
  const pendingPathRef = useRef<string | null>(null);
  const firstRenderRef = useRef(true);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const fallbackRef = useRef<number | undefined>(undefined);

  const reveal = useCallback(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    const label = labelRef.current;
    if (!overlay || !content || !label) return;

    window.clearTimeout(fallbackRef.current);
    const panels = overlay.querySelectorAll(".page-transition-panel");
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    timelineRef.current?.kill();

    gsap.set(content, { autoAlpha: 0, y: coarse ? 14 : 24 });
    const timeline = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
        gsap.set(panels, { clearProps: "transform,willChange" });
        gsap.set(content, { clearProps: "transform,opacity,visibility" });
        transitioningRef.current = false;
        pendingPathRef.current = null;
        setScrollLocked(false);
        window.dispatchEvent(new Event(TRANSITION_SETTLED_EVENT));
      },
    });
    timelineRef.current = timeline;
    timeline
      .to(label, { autoAlpha: 0, y: -10, duration: 0.18, ease: "power2.out" }, 0)
      .to(panels, {
        scaleY: 0,
        transformOrigin: "top",
        duration: coarse ? 0.46 : 0.58,
        stagger: coarse ? 0.035 : 0.05,
      }, 0.05)
      .to(content, {
        autoAlpha: 1,
        y: 0,
        duration: coarse ? 0.42 : 0.55,
        ease: "power3.out",
      }, coarse ? 0.18 : 0.24);
  }, []);

  const coverAndNavigate = useCallback((href: string, targetPath: string) => {
    const overlay = overlayRef.current;
    const label = labelRef.current;
    if (!overlay || !label || transitioningRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(href);
      return;
    }

    transitioningRef.current = true;
    pendingPathRef.current = targetPath;
    if (nameRef.current) nameRef.current.textContent = labelFor(targetPath);
    setScrollLocked(true);

    const panels = overlay.querySelectorAll(".page-transition-panel");
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    timelineRef.current?.kill();
    gsap.set(overlay, { autoAlpha: 1, pointerEvents: "auto" });
    gsap.set(panels, { scaleY: 0, transformOrigin: "bottom", willChange: "transform" });
    gsap.set(label, { autoAlpha: 0, y: 12 });

    const timeline = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        router.push(href);
        fallbackRef.current = window.setTimeout(reveal, 3500);
      },
    });
    timelineRef.current = timeline;
    timeline
      .to(panels, {
        scaleY: 1,
        duration: coarse ? 0.38 : 0.48,
        stagger: coarse ? 0.035 : 0.05,
      }, 0)
      .to(label, { autoAlpha: 1, y: 0, duration: 0.24, ease: "power2.out" }, coarse ? 0.22 : 0.3);
  }, [reveal, router]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target && anchor.target !== "_self" || anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      event.preventDefault();
      event.stopPropagation();
      coverAndNavigate(`${url.pathname}${url.search}${url.hash}`, url.pathname);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [coverAndNavigate]);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    if (pendingPathRef.current && pendingPathRef.current === pathname) {
      const frame = requestAnimationFrame(() => requestAnimationFrame(reveal));
      return () => cancelAnimationFrame(frame);
    }
    if (!transitioningRef.current && contentRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const tween = gsap.fromTo(contentRef.current, { autoAlpha: 0, y: 14 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
        onComplete: () => window.dispatchEvent(new Event(TRANSITION_SETTLED_EVENT)),
      });
      return () => { tween.kill(); };
    }
  }, [pathname, reveal]);

  useEffect(() => () => {
    window.clearTimeout(fallbackRef.current);
    timelineRef.current?.kill();
    setScrollLocked(false);
  }, []);

  return (
    <>
      <div ref={contentRef}>{children}</div>
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[100] invisible"
        style={{ opacity: 0 }}
      >
        <div className="absolute inset-0 flex">
          {PANEL_COLORS.map((color, i) => (
            <div
              key={color}
              className="page-transition-panel h-full flex-1"
              style={{ backgroundColor: color, transform: "scaleY(0)", transformOrigin: "bottom", marginLeft: i === 0 ? 0 : -1 }}
            />
          ))}
        </div>
        <div ref={labelRef} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-light.webp" alt="" width={167} height={137} className="mb-5 h-14 w-auto" />
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#a89a8d]">Bi Arq 1.0</p>
          <p ref={nameRef} className="display mt-3 text-[clamp(38px,7vw,72px)] leading-none text-[#eeeae3]">Proyectos</p>
          <span className="mt-6 block h-px w-16 bg-[#b83d1c]" />
        </div>
      </div>
    </>
  );
}
