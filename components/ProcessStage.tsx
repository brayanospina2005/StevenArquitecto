"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Photo from "@/components/Photo";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { src: "/datum/xTqAEw6ptJPPosL9Z6UVYWARZTc.jpg", kicker: "Etapa 02", name: "Levantamiento del espacio" },
  { src: "/datum/Pq0a4Ss1p8LsbqpiovXlxIKQ.jpg", kicker: "Etapa 03", name: "Diseño 3D" },
  { src: "/datum/mLWr4P3AyFpkGBRTJ5KLCi7Q6dI.jpg", kicker: "Etapa 04", name: "Selección de materiales" },
  { src: "/datum/LuxUS8V4dAp6ZBC1qcnM2sUofWE.jpg", kicker: "Etapa 06", name: "Ejecución" },
  { src: "/datum/w6IPGtI8bSTouqYEk17QeIxSWPY.jpg", kicker: "Etapa 07", name: "Entrega final" },
];

export default function ProcessStage() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current?.closest("section");
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 70%",
      end: "bottom 40%",
      scrub: true,
      onUpdate: (self) => setActive(Math.min(4, Math.floor(self.progress * 5))),
    });
    return () => st.kill();
  }, []);

  const stage = stages[active];
  return (
    <div ref={ref} className="lg:sticky lg:top-24 self-start">
      <div className="relative overflow-hidden aspect-square bg-[#ded7cc]">
        {stages.map((item, i) => (
          <Photo
            key={item.src}
            src={item.src}
            alt={item.name}
            className="img-cover transition-opacity duration-700"
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}
      </div>
      <p className="mt-4 text-[13px] text-[#665b52]">{stage.kicker}</p>
      <p className="text-[15px] font-medium">{stage.name}</p>
    </div>
  );
}
