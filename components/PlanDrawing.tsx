"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import plan from "@/lib/plan-data.json";

gsap.registerPlugin(ScrollTrigger);

const ink = "#1C1714";
const accent = "#E2522B";
const muted = "#7D7167";
const paper = "#EEEAE3";
const notes = [
  "Reunión con el cliente y levantamiento del espacio",
  "Diseño 3D antes de la ejecución",
  "Selección de materiales de alta calidad",
];
const steps = ["Muros", "Huecos", "Cotas", "Mobiliario", "Notas"];

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const span = (e: number, a: number, b: number) => clamp((e - a) / (b - a));
const ease = (e: number) => 1 - (1 - e) ** 3;
const dash = (progress: number, index: number, count: number) => 1 - clamp(progress * (count + 2) - index);

const halo = { paintOrder: "stroke" as const, stroke: paper, strokeWidth: 5, strokeLinejoin: "round" as const };

export default function PlanDrawing() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setY(1);
      return;
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setY(self.progress),
    });
    return () => st.kill();
  }, []);

  const grid = ease(span(y, 0, 0.1));
  const walls = ease(span(y, 0.02, 0.28));
  const openings = ease(span(y, 0.28, 0.42));
  const dims = ease(span(y, 0.42, 0.58));
  const furniture = ease(span(y, 0.58, 0.8));
  const note = ease(span(y, 0.8, 0.97));
  const step = y < 0.28 ? 0 : y < 0.42 ? 1 : y < 0.58 ? 2 : y < 0.8 ? 3 : 4;

  return (
    <div ref={wrapRef} style={{ height: "240vh" }}>
      <div className="sticky top-[88px] flex flex-col gap-5">
        <svg viewBox="4 4 1006 700" className="w-full h-[min(68vh,760px)] overflow-visible" role="img" aria-label="Plano de un proyecto de Bi Arq 1.0 que se dibuja al desplazarse">
          <g opacity={grid} fill="none" stroke={muted} strokeWidth={0.8}>
            {plan.jt.map((g) => (
              <g key={g.k}>
                <path d={`M${g.x} 34 V600`} strokeDasharray="10 5 2 5" opacity={0.55} />
                <circle cx={g.x} cy={22} r={12} fill={paper} />
                <text x={g.x} y={26.5} textAnchor="middle" fill={muted} stroke="none" fontSize={12} fontFamily="Switzer, sans-serif">{g.k}</text>
              </g>
            ))}
            {plan.Mt.map((g) => (
              <g key={g.k}>
                <path d={`M34 ${g.y} H100`} strokeDasharray="10 5 2 5" opacity={0.55} />
                <circle cx={22} cy={g.y} r={12} fill={paper} />
                <text x={22} y={g.y + 4.5} textAnchor="middle" fill={muted} stroke="none" fontSize={12} fontFamily="Switzer, sans-serif">{g.k}</text>
              </g>
            ))}
          </g>

          <g fill="none" stroke={ink} strokeLinecap="square">
            {plan.St.map((d, i) => (
              <path key={d} d={d} pathLength={1} strokeWidth={14} strokeDasharray={1} strokeDashoffset={dash(walls, i, plan.St.length)} />
            ))}
            {plan.Ct.map((d, i) => (
              <path key={d} d={d} pathLength={1} strokeWidth={7} strokeDasharray={1} strokeDashoffset={dash(walls, i * 0.6 + 3, plan.St.length)} />
            ))}
            <path d={plan.wt} pathLength={1} strokeWidth={3} strokeDasharray={1} strokeDashoffset={dash(walls, 7, plan.St.length)} />
            <path d={plan.wt} transform="translate(500 350) scale(0.96) translate(-500 -350)" strokeWidth={1} opacity={openings} />
            {plan.Tt.map((d) => (
              <path key={d} d={d} fill={ink} stroke="none" opacity={clamp(walls * 3 - 1.6)} />
            ))}
          </g>

          <g fill="none" stroke={ink} strokeWidth={1.5} opacity={openings > 0 ? 1 : 0}>
            {plan.Dt.map((d, i) => (
              <path key={d} d={d} pathLength={1} strokeDasharray={1} strokeDashoffset={dash(openings, i, plan.Dt.length + plan.Ot.length)} />
            ))}
            {plan.Ot.map((d, i) => (
              <path key={d} d={d} pathLength={1} strokeDasharray={1} strokeDashoffset={dash(openings, i + plan.Dt.length, plan.Dt.length + plan.Ot.length)} />
            ))}
          </g>

          <g fill="none" stroke={accent} strokeWidth={1.2}>
            {plan.kt.map((mark, i) => (
              <g key={mark.t + mark.x}>
                <path d={mark.d} pathLength={1} strokeDasharray={1} strokeDashoffset={dash(dims, i, plan.kt.length)} />
                <text
                  x={mark.x} y={mark.y}
                  transform={mark.r ? `rotate(${mark.r} ${mark.x} ${mark.y})` : undefined}
                  textAnchor="middle" fill={accent} fontSize={15} fontFamily="Switzer, sans-serif"
                  style={{ ...halo, opacity: clamp(dims * (plan.kt.length + 1) - i) }}
                >{mark.t}</text>
              </g>
            ))}
            {plan.At.map((mark) => (
              <text key={mark.t + mark.x} x={mark.x} y={mark.y} textAnchor="middle" fill={accent} fontSize={15} fontFamily="Switzer, sans-serif" style={{ ...halo, opacity: clamp(dims * (plan.kt.length + 1) - 3) }}>{mark.t}</text>
            ))}
          </g>

          <g fill="none" stroke={muted} strokeWidth={0.7} opacity={furniture * 0.55}>
            <path d={plan.Et} />
          </g>
          <g fill="none" stroke={muted} strokeWidth={1.2}>
            <path d={plan.Pt} pathLength={1} strokeWidth={1.4} strokeDasharray={1} strokeDashoffset={dash(furniture, 0, 2)} />
            {plan.Nt.map((d, i) => (
              <path key={d.slice(0, 24)} d={d} pathLength={1} strokeDasharray={1} strokeDashoffset={dash(furniture, i, plan.Nt.length)} />
            ))}
          </g>
          <g>
            {plan.Ft.map((room, i) => (
              <g key={room.t + room.x} opacity={clamp(furniture * (plan.Ft.length + 1) - i)}>
                <text x={room.x} y={room.y} textAnchor="middle" fill={ink} fontSize={15} fontFamily="Switzer, sans-serif" style={halo}>{room.t}</text>
                <text x={room.x} y={room.y + 17} textAnchor="middle" fill={muted} fontSize={12} fontFamily="Switzer, sans-serif" style={halo}>{room.s}</text>
              </g>
            ))}
          </g>
          <g>
            {plan.It.slice(0, notes.length).map((p, i) => {
              const n = clamp(note * (plan.It.length + 1) - i);
              return (
                <g key={p.x} transform={`translate(${p.x} ${p.y}) scale(${0.4 + 0.6 * n})`} opacity={n}>
                  <circle r={19} fill={paper} />
                  <circle r={15} fill={accent} />
                  <text y={5} textAnchor="middle" fill={paper} fontSize={14} fontFamily="Switzer, sans-serif">{i + 1}</text>
                </g>
              );
            })}
          </g>
          <g opacity={walls} fill="none" stroke={ink} strokeWidth={1.2}>
            <path d="M780 690 h100 M780 685 v10 M805 687 v6 M830 685 v10 M855 687 v6 M880 685 v10" />
            <path d="M780 690 h25 M830 690 h25" strokeWidth={4} />
            <text x={830} y={678} textAnchor="middle" fill={muted} stroke="none" fontSize={12} fontFamily="Switzer, sans-serif">2 m</text>
            <circle cx={950} cy={680} r={16} />
            <path d="M950 662 l-7 24 l7 -6 l7 6 z" fill={ink} />
            <text x={976} y={684} fill={ink} stroke="none" fontSize={12} fontFamily="Switzer, sans-serif">N</text>
            <text x={100} y={694} fill={muted} stroke="none" fontSize={12} fontFamily="Switzer, sans-serif">Bi Arq 1.0, diseño de interiores, 1:100</text>
          </g>
        </svg>

        <div className="text-[13px] flex flex-col gap-3">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {steps.map((label, i) => (
              <span key={label} className={i === step ? "text-[#1C1714]" : "text-[#7D7167]"}>0{i + 1}&nbsp;&nbsp;{label}</span>
            ))}
          </div>
          <div className="relative h-px bg-[#7D7167]/50">
            <div className="absolute inset-y-0 left-0 bg-[#E2522B]" style={{ width: `${y * 100}%` }} />
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 min-h-[1.4em]">
            {notes.map((text, i) => (
              <span key={text} className="inline-flex items-center gap-2" style={{ opacity: clamp(note * (notes.length + 1) - i) }}>
                <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#E2522B] text-[11px] text-[#EEEAE3]">{i + 1}</span>
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
