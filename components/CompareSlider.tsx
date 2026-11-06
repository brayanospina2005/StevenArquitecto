"use client";
import { useRef, useState } from "react";

export default function CompareSlider({ drawing, built, caption }: { drawing: string; built: string; caption: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(96, Math.max(4, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div>
      <div
        ref={ref}
        className="relative aspect-[16/10] md:aspect-[16/8] overflow-hidden bg-[#ded7cc] cursor-ew-resize touch-none select-none"
        onPointerDown={(e) => { dragging.current = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); update(e.clientX); }}
        onPointerMove={(e) => dragging.current && update(e.clientX)}
        onPointerUp={() => { dragging.current = false; }}
        onPointerLeave={() => { dragging.current = false; }}
        role="slider" aria-label="Compare drawing and built" aria-valuenow={Math.round(pos)} tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4)); if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4)); }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={built} alt="Construido" className="img-cover absolute inset-0" draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={drawing} alt="Dibujo" className="img-cover absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} draggable={false} />
        <span className="absolute top-4 left-4 bg-[#eeeae3]/90 px-3 py-1.5 text-[12px] font-medium rounded-[3px]">Dibujo</span>
        <span className="absolute top-4 right-4 bg-[#2b1f18]/85 text-[#eeeae3] px-3 py-1.5 text-[12px] font-medium rounded-[3px]">Construido</span>
        <div className="absolute top-0 bottom-0 w-px bg-[#eeeae3] shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#eeeae3] text-[#2b1f18] flex items-center justify-center text-[15px] shadow-lg">↔</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-2 pt-4 text-[13px] text-[#665b52]">
        <span>Arrastra la línea para comparar</span>
        <span>{caption}</span>
      </div>
    </div>
  );
}
