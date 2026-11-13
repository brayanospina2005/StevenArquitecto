"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import Photo from "@/components/Photo";
import { SlatsImage } from "@/components/Reveal";
import { TRANSITION_LOCK_EVENT } from "@/components/SmoothScroll";

type GalleryContextValue = {
  open: (index: number) => void;
  total: number;
};

const GalleryContext = createContext<GalleryContextValue | null>(null);

export function GalleryProvider({
  name,
  images,
  children,
}: {
  name: string;
  images: string[];
  children: ReactNode;
}) {
  const [start, setStart] = useState<number | null>(null);
  const open = useCallback((index: number) => setStart(index), []);

  return (
    <GalleryContext.Provider value={{ open, total: images.length }}>
      {children}
      {start !== null && (
        <Lightbox name={name} images={images} start={start} onClose={() => setStart(null)} />
      )}
    </GalleryContext.Provider>
  );
}

export function OpenablePhoto({
  index,
  src,
  alt,
  ratio,
  sizes,
  priority = false,
  className = "",
}: {
  index: number;
  src: string;
  alt: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const gallery = useContext(GalleryContext);
  if (!gallery) {
    return <SlatsImage src={src} alt={alt} ratio={ratio} sizes={sizes} priority={priority} className={className} />;
  }

  return (
    <button
      type="button"
      onClick={() => gallery.open(index)}
      aria-label={`Ampliar foto ${index + 1} de ${gallery.total}`}
      className="group/photo relative block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left"
    >
      <SlatsImage src={src} alt={alt} ratio={ratio} sizes={sizes} priority={priority} className={className} />
      <span className="pointer-events-none absolute right-3 bottom-3 z-10 rounded-[4px] bg-[#1c1714]/80 px-2.5 py-1 text-[12px] text-[#eeeae3] opacity-0 transition-opacity duration-300 group-hover/photo:opacity-100">
        Ampliar
      </span>
    </button>
  );
}

function Lightbox({
  name,
  images,
  start,
  onClose,
}: {
  name: string;
  images: string[];
  start: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(start);
  const [shift, setShift] = useState(28);
  const dialogRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const total = images.length;

  const go = useCallback((delta: number) => {
    setShift(delta > 0 ? 28 : -28);
    setIndex((current) => (current + delta + total) % total);
  }, [total]);

  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent<boolean>(TRANSITION_LOCK_EVENT, { detail: true }));
    dialogRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = previous;
      window.dispatchEvent(new CustomEvent<boolean>(TRANSITION_LOCK_EVENT, { detail: false }));
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    thumbsRef.current[index]?.scrollIntoView({ inline: "center", block: "nearest", behavior: reduce ? "auto" : "smooth" });
  }, [index]);

  const onPointerDown = (event: ReactPointerEvent) => {
    drag.current = { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = (event: ReactPointerEvent) => {
    const startPoint = drag.current;
    drag.current = null;
    if (!startPoint) return;
    const dx = event.clientX - startPoint.x;
    const dy = event.clientY - startPoint.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? 1 : -1);
  };

  const label = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de ${name}`}
      tabIndex={-1}
      className="fixed inset-0 z-[90] flex flex-col bg-[#1c1714] text-[#eeeae3] outline-none"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
        <p className="min-w-0 truncate text-[14px]">{name}</p>
        <p className="shrink-0 text-[13px] tracking-wide text-[#a89a8d]">{label}</p>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-[4px] border border-white/25 px-3 py-2 text-[13px] hover:bg-white/10"
        >
          Cerrar
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <button
          type="button"
          aria-label="Foto anterior"
          onClick={() => go(-1)}
          className="absolute top-1/2 left-2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-[22px] hover:bg-white/10 md:left-6"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Foto siguiente"
          onClick={() => go(1)}
          className="absolute top-1/2 right-2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-[22px] hover:bg-white/10 md:right-6"
        >
          →
        </button>
        <div
          className="absolute inset-y-0 right-16 left-16 md:right-24 md:left-24"
          style={{ ["--shift" as string]: `${shift}px` }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div key={images[index]} className="gallery-in relative h-full w-full">
            <Photo
              src={images[index]}
              alt={`${name}, foto ${index + 1} de ${total}`}
              className="object-contain"
              sizes="100vw"
              quality={75}
              priority
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto px-4 pt-3 pb-4 md:px-8">
        {images.map((src, i) => (
          <button
            key={src}
            ref={(node) => { thumbsRef.current[i] = node; }}
            type="button"
            aria-label={`Ir a la foto ${i + 1}`}
            aria-current={i === index}
            onClick={() => {
              setShift(i >= index ? 28 : -28);
              setIndex(i);
            }}
            className={`relative h-14 w-16 shrink-0 overflow-hidden border-0 p-0 ${i === index ? "ring-2 ring-[#b83d1c]" : "opacity-55 hover:opacity-100"}`}
          >
            <Photo src={src} alt="" className="img-cover" sizes="64px" quality={60} />
          </button>
        ))}
      </div>
    </div>
  );
}
