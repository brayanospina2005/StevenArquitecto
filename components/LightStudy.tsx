"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LIGHT_FRAG, LIGHT_VERT } from "./lightStudyShader";

gsap.registerPlugin(ScrollTrigger);

const stages = ["Boceto", "Maqueta", "Materiales", "Luz"];

function hex(h: string): [number, number, number] {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
}

function shade(e: number, a: number, b: number) {
  const n = Math.max(0, Math.min(1, (e - a) / (b - a)));
  return n * n * (3 - 2 * n);
}

function mapProgress(e: number) {
  return {
    sketch: shade(e, 0, 0.22),
    solid: shade(e, 0.24, 0.42),
    mat: shade(e, 0.44, 0.62),
    sun: shade(e, 0.62, 1),
    glow: shade(e, 0.84, 1),
    cam: shade(e, 0, 1),
  };
}

const COLORS = {
  background: "#DED7CC",
  ground: "#D6CEC1",
  concrete: "#EDE8E0",
  timber: "#8B6B4E",
  glass: "#23292C",
  water: "#566769",
  leaves: "#6A7052",
  ink: "#3A3530",
  shade: "#2B1F18",
  sun: "#FFD3A1",
  glow: "#F2A35E",
};

export default function LightStudy() {
  const wrapRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    let stopped = false;
    let booted = false;
    let release = () => {};

    const boot = () => {
    if (stopped || booted) return;
    booted = true;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "high-performance" });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };
    const vs = compile(gl.VERTEX_SHADER, LIGHT_VERT);
    const fs = compile(gl.FRAGMENT_SHADER, LIGHT_FRAG);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uniforms = {
      res: u("uRes"), sketch: u("uSketch"), solid: u("uSolid"), mat: u("uMat"),
      sun: u("uSun"), glow: u("uGlow"), cam: u("uCam"), shift: u("uShift"),
      shiftY: u("uShiftY"), zoom: u("uZoom"),
    };
    const setColor = (name: string, value: string) => gl.uniform3fv(u(name), hex(value));
    setColor("uBg", COLORS.background);
    setColor("uGroundCol", COLORS.ground);
    setColor("uTimber", COLORS.timber);
    setColor("uGlass", COLORS.glass);
    setColor("uWater", COLORS.water);
    setColor("uLeaf", COLORS.leaves);
    setColor("uInk", COLORS.ink);
    setColor("uConcrete", COLORS.concrete);
    setColor("uShade", COLORS.shade);
    setColor("uSunCol", COLORS.sun);
    setColor("uGlowCol", COLORS.glow);

    let width = 1;
    let height = 1;
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const box = canvas.parentElement?.getBoundingClientRect();
      width = Math.max(1, box?.width || rect.width);
      height = Math.max(1, box?.height || window.innerHeight);
      const narrow = width < 810;
      let ratio = Math.min(window.devicePixelRatio || 1, narrow ? 0.85 : 1.25);
      if (width * height * ratio * ratio > 1_700_000) ratio = Math.sqrt(1_700_000 / (width * height));
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    let target = 0;
    let current = 0;
    let shown = -1;
    const draw = (progress: number) => {
      const m = mapProgress(progress);
      const narrow = width / height < 1.1;
      gl.uniform2f(uniforms.res, canvas.width, canvas.height);
      gl.uniform1f(uniforms.sketch, m.sketch);
      gl.uniform1f(uniforms.solid, m.solid);
      gl.uniform1f(uniforms.mat, m.mat);
      gl.uniform1f(uniforms.sun, m.sun);
      gl.uniform1f(uniforms.glow, m.glow);
      gl.uniform1f(uniforms.cam, m.cam);
      gl.uniform1f(uniforms.shift, narrow ? 0 : 0.4);
      gl.uniform1f(uniforms.zoom, narrow ? 0.95 * Math.min(0.95, (width / height) * 1.1) : 0.95);
      gl.uniform1f(uniforms.shiftY, narrow ? 0.42 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      const next = progress < 0.24 ? 0 : progress < 0.44 ? 1 : progress < 0.64 ? 2 : 3;
      if (next !== shown) {
        shown = next;
        setStage(next);
      }
    };

    resize();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      draw(1);
      release = () => { gl.deleteProgram(program); gl.deleteBuffer(buffer); };
      return;
    }

    let frame = 0;
    const nearView = () => {
      const rect = wrap.getBoundingClientRect();
      return rect.bottom > -240 && rect.top < window.innerHeight + 240;
    };
    const tick = () => {
      if (!nearView() && Math.abs(target - current) < 0.002) {
        frame = 0;
        return;
      }
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.0004) current = target;
      draw(current);
      frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => { target = self.progress; wake(); },
    });
    const ro = new ResizeObserver(() => { resize(); if (nearView()) draw(current); });
    ro.observe(wrap);
    wake();
    release = () => {
      cancelAnimationFrame(frame);
      st.kill();
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) boot();

    const onScroll = () => {
      if (window.scrollY > 24) {
        window.removeEventListener("scroll", onScroll);
        boot();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const idle = window.requestIdleCallback?.(() => {
      if (window.scrollY > 80) boot();
    }, { timeout: 2500 });

    return () => {
      stopped = true;
      window.removeEventListener("scroll", onScroll);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      release();
    };
  }, []);

  return (
    <section ref={wrapRef} className="relative bg-[#DED7CC]" style={{ height: "calc(100svh - 72px + 200vh)" }}>
      <div className="sticky top-[72px] h-[calc(100svh-72px)] overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
        <div className="relative z-10 flex h-full flex-col mx-auto max-w-[1600px] px-5 md:px-10 pt-8 pb-8 pointer-events-none">
          <p className="label text-[#665b52] mb-4">Estudio de luz</p>
          <h2 className="display text-[clamp(40px,5vw,72px)] max-w-[560px] mb-5">
            Del primer boceto a la luz de la tarde.
          </h2>
          <p className="text-[16px] leading-relaxed text-[#4b3b31] max-w-[420px]">
            Toda casa empieza como un boceto a lápiz. Desplázate y mírala convertirse en maqueta, tomar madera, vidrio y agua, y recoger el sol de la tarde.
          </p>
          <div className="mt-auto px-0 md:px-2">
            <ol className="flex flex-wrap gap-x-7 gap-y-2 text-[13px] mb-3.5">
              {stages.map((s, i) => (
                <li key={s} className={`transition-colors duration-300 ${i === stage ? "text-[#1C1714]" : "text-[#7D7167]"}`}>
                  0{i + 1}&nbsp;&nbsp;{s}
                </li>
              ))}
            </ol>
            <div className="relative h-px bg-[#C9BFB1]">
              <div ref={barRef} className="absolute inset-0 origin-left bg-[#E2522B]" style={{ transform: "scaleX(0)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
