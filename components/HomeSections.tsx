"use client";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, IM } from "@/lib/data";
import { SlatsImage } from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelector(".hero-img"), { scale: 1.15 }, { scale: 1, duration: 2, ease: "power3.out" });
      gsap.fromTo(el.querySelectorAll(".hero-line"), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, delay: 0.3, ease: "power3.out" });
      gsap.to(el.querySelector(".hero-img"), {
        yPercent: 12, ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-[calc(100svh-72px)] flex flex-col overflow-hidden bg-[#2b1f18] text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IM.hero} alt="Low limewash and travertine house with a deep flat roof and an old olive tree among dry grasses at golden hour" className="hero-img img-cover absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />
      <div className="relative flex-1 flex flex-col mx-auto max-w-[1600px] w-full px-5 md:px-10 pt-5 pb-7">
        <div className="hero-line grid grid-cols-2 md:grid-cols-3 gap-4 text-[13px] text-white/90 border-b border-white/30 pb-4">
          <span>Arquitectura e interiores</span>
          <span className="hidden md:block text-center">Lisboa y Copenhague, desde 2012</span>
          <span className="text-right">Obra seleccionada, 2016 a 2026</span>
        </div>
        <div className="flex-1" />
        <div className="hero-line flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <p className="text-[15px] leading-snug max-w-[250px] lg:mb-4">
            Estudio de arquitectura e interiorismo. Casas, hoteles y lugares de trabajo, con un ritmo lento y los materiales por delante.
          </p>
          <h1 className="display text-[clamp(64px,10.55vw,152px)] leading-[0.9] tracking-[-0.055em] lg:text-right">
            Estancias quietas
          </h1>
        </div>
        <div className="hero-line flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mt-1">
          <p className="display text-[clamp(64px,10.55vw,152px)] leading-[0.9] tracking-[-0.055em]">
            luz que permanece.
          </p>
          <Link href="/projects" className="btn-arrow inline-flex items-center gap-2 bg-[#eeeae3] text-[#1c1714] font-medium h-12 px-5 rounded-[4px] text-[15px] lg:mb-3 shrink-0">
            Ver el trabajo <span className="arr">↗</span>
          </Link>
        </div>
        <div className="hero-line flex items-end justify-between gap-4 pt-8 text-[13px] text-white/90">
          <span>Desplázate para explorar</span>
          <Link href="/projects" className="text-right hover:underline">Destacado: Casa Alba, Comporta, 2025</Link>
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>(".count").forEach((node) => {
        const target = Number(node.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.6, ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 88%" },
          onUpdate: () => { node.textContent = String(Math.round(obj.v)); },
        });
      });
      // word reveal for statement
      const words = el.querySelectorAll(".w");
      gsap.fromTo(words, { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.035, ease: "power3.out",
        scrollTrigger: { trigger: el.querySelector(".statement"), start: "top 82%" },
      });
      gsap.fromTo(el.querySelector(".studio-card"), { y: 48, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el.querySelector(".studio-card"), start: "top 88%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const statement = "Diseñamos casas, hoteles y lugares de trabajo a partir de la luz, la proporción y la forma real de vivir. Cada proyecto empieza como una línea en el papel y termina como un lugar sereno, honesto y hecho para durar.";
  const stats = [
    { value: 14, suffix: "", caption: "Años dando forma a casas, hoteles y lugares de trabajo" },
    { value: 160, suffix: "+", caption: "Proyectos terminados en nueve países" },
    { value: 38, suffix: "", caption: "Arquitectos, interioristas y artesanos en dos estudios" },
  ];
  return (
    <section ref={ref} className="mx-auto max-w-[1600px] px-5 md:px-10 py-20 md:py-32">
      <p className="label text-[#665b52] mb-8">Sobre el estudio</p>
      <h2 className="statement display text-[32px] md:text-[52px] max-w-[1000px] mb-16">
        {statement.split(" ").map((w, i) => <span key={i} className="w inline-block">{w}&nbsp;</span>)}
      </h2>
      <div className="grid lg:grid-cols-12 gap-10">
        <SlatsImage src={IM.studioIntro} alt="Limewash wall and pale oak floor with a linen armchair and a travertine side table in soft morning light" ratio="lg:col-span-5 aspect-[4/5] max-h-[560px] w-full" />
        <div className="lg:col-span-7 flex flex-col">
          <div className="grid sm:grid-cols-3 border-t border-[#cec5b8]">
            {stats.map((s) => (
              <div key={s.caption} className="py-8 pr-6 border-b sm:border-b-0 border-[#cec5b8]">
                <p className="display text-[64px] md:text-[72px]"><span className="count" data-value={s.value}>0</span>{s.suffix}</p>
                <p className="text-[14px] text-[#665b52] leading-snug mt-2 max-w-[200px]">{s.caption}</p>
              </div>
            ))}
          </div>
          <div className="studio-card mt-auto bg-[#ded7cc] p-8 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <p className="text-[22px] md:text-[26px] leading-snug font-light max-w-[480px]">
              El diseño no es solo lo que se ve. Es cómo se siente una estancia a las siete de la mañana y otra vez a medianoche.
            </p>
            <Link href="/studio" className="btn-arrow inline-flex items-center gap-2 bg-[#2b1f18] text-[#eeeae3] px-5 py-3 rounded-[4px] text-[14px] font-medium shrink-0">
              Conocer el estudio <span className="arr">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IndexList({ dark = false }: { dark?: boolean }) {
  const [hover, setHover] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const list = projects.slice(1, 6);
  const line = dark ? "border-white/15" : "border-[#cec5b8]";
  const muted = dark ? "text-[#a89a8d]" : "text-[#665b52]";
  const hoverBg = dark ? "hover:bg-white/5" : "hover:bg-[#ded7cc]/60";

  const follow = (event: MouseEvent) => {
    const parent = box.current;
    const card = float.current;
    if (!parent || !card) return;
    const rect = parent.getBoundingClientRect();
    const x = event.clientX - rect.left + 28;
    const y = event.clientY - rect.top - 70;
    card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(-2deg)`;
  };

  return (
    <div ref={box} className="relative" onMouseMove={follow}>
      {list.map((p, i) => (
        <Link key={p.slug} href={`/projects/${p.slug}`}
          onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
          className={`group grid grid-cols-[auto_1fr_auto] md:grid-cols-[60px_1fr_160px_80px_140px_100px] items-baseline gap-4 py-5 border-t ${line} ${hoverBg} transition-colors px-2 -mx-2`}>
          <span className={`text-[14px] ${muted}`}>{p.index}</span>
          <span className="text-[22px] md:text-[28px] font-light tracking-tight group-hover:translate-x-2 transition-transform">{p.name}</span>
          <span className={`hidden md:block text-[14px] ${muted}`}>{p.location}</span>
          <span className={`hidden md:block text-[14px] ${muted}`}>{p.year}</span>
          <span className={`hidden md:block text-[14px] ${muted}`}>{p.typology}</span>
          <span className={`text-[14px] ${muted} text-right`}>{p.area}</span>
        </Link>
      ))}
      <div
        ref={float}
        className={`pointer-events-none absolute left-0 top-0 w-[220px] aspect-[4/3] overflow-hidden hidden lg:block z-20 transition-opacity duration-200 ${hover !== null ? "opacity-100" : "opacity-0"}`}
      >
        {hover !== null && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={list[hover].cover} alt="" className="img-cover" />
        )}
      </div>
    </div>
  );
}
