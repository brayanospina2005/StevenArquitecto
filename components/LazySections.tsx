"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

const LightStudy = dynamic(() => import("@/components/LightStudy"), { ssr: false });
const PlanDrawing = dynamic(() => import("@/components/PlanDrawing"), { ssr: false });
const ProcessStage = dynamic(() => import("@/components/ProcessStage"), { ssr: false });
const CompareSlider = dynamic(() => import("@/components/CompareSlider"), { ssr: false });

function NearMount({
  children,
  placeholder,
  className = "",
  rootMargin = "700px 0px",
}: {
  children: ReactNode;
  placeholder: ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || mounted) return;
    if (typeof window.IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          io.disconnect();
          setMounted(true);
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {mounted ? children : placeholder}
    </div>
  );
}

export function LazyLightStudy() {
  return (
    <NearMount
      rootMargin="0px 0px -12% 0px"
      placeholder={(
        <section className="relative bg-[#DED7CC]" style={{ height: "calc(100svh - 72px + 200vh)" }}>
          <div className="sticky top-[72px] flex h-[calc(100svh-72px)] flex-col mx-auto max-w-[1600px] px-5 md:px-10 pt-8 pb-8">
            <p className="label text-[#665b52] mb-4">Nuestro proceso de trabajo</p>
            <h2 className="display text-[clamp(40px,5vw,72px)] max-w-[560px] mb-5">
              Del levantamiento del espacio al diseño 3D.
            </h2>
            <p className="text-[16px] leading-relaxed text-[#4b3b31] max-w-[420px]">
              Visualiza tu proyecto antes de hacerlo realidad. Desplázate y mira cómo el espacio pasa del levantamiento al diseño, toma materiales y llega a la entrega final.
            </p>
          </div>
        </section>
      )}
    >
      <LightStudy />
    </NearMount>
  );
}

export function LazyPlanDrawing() {
  return (
    <NearMount placeholder={<div style={{ height: "240vh" }} aria-hidden />}>
      <PlanDrawing />
    </NearMount>
  );
}

export function LazyProcessStage() {
  return (
    <NearMount
      className="h-full"
      placeholder={(
        <div className="lg:sticky lg:top-24 self-start">
          <div className="relative overflow-hidden aspect-square bg-[#ded7cc]" />
          <p className="mt-4 text-[13px] text-[#665b52]">Etapa 02</p>
          <p className="text-[15px] font-medium">Levantamiento del espacio</p>
        </div>
      )}
    >
      <ProcessStage />
    </NearMount>
  );
}

export function LazyCompareSlider({ drawing, built, caption }: { drawing: string; built: string; caption: string }) {
  return (
    <NearMount
      placeholder={(
        <div>
          <div className="relative aspect-[16/10] md:aspect-[16/8] overflow-hidden bg-[#ded7cc]" />
          <div className="flex flex-wrap justify-between gap-2 pt-4 text-[13px] text-[#665b52]">
            <span>Arrastra la línea para comparar</span>
            <span>{caption}</span>
          </div>
        </div>
      )}
    >
      <CompareSlider drawing={drawing} built={built} caption={caption} />
    </NearMount>
  );
}
