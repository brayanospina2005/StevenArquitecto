"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Photo from "@/components/Photo";

gsap.registerPlugin(ScrollTrigger);

export function Reveal({ children, delay = 0, className, y = 36 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y }, {
        opacity: 1, y: 0, duration: 1, delay, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    }, el);
    return () => ctx.revert();
  }, [delay, y]);
  return <div ref={ref} className={className}>{children}</div>;
}

export function SlatsImage({ src, alt, className = "", ratio = "aspect-[4/3]", sizes, priority = false }: { src: string; alt: string; className?: string; ratio?: string; sizes?: string; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelectorAll(".slat"), { scaleY: 1 }, {
        scaleY: 0, duration: 1.1, ease: "power4.inOut", stagger: 0.08, transformOrigin: "top",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
      gsap.fromTo(el.querySelector("img"), { scale: 1.12 }, {
        scale: 1, duration: 1.6, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className={`relative overflow-hidden bg-[#ded7cc] ${ratio} ${className}`}>
      <Photo src={src} alt={alt} className="img-cover" sizes={sizes} priority={priority} />
      <div className="absolute inset-0 grid grid-cols-5 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="slat bg-[#eeeae3] origin-top" />
        ))}
      </div>
    </div>
  );
}
