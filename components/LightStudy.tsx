"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LIGHT_FRAG, LIGHT_VERT } from "./lightStudyShader";

gsap.registerPlugin(ScrollTrigger);

const stages = ["Levantamiento", "Diseño 3D", "Materiales", "Entrega"];

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

type Quality = {
  pixelRatio: number;
  maxPixels: number;
  raySteps: number;
  shadowSteps: number;
  ease: number;
};

const DESKTOP_QUALITY: Quality = {
  pixelRatio: 1.25,
  maxPixels: 1_700_000,
  raySteps: 130,
  shadowSteps: 48,
  ease: 0.18,
};

const MOBILE_QUALITY: Quality = {
  pixelRatio: 0.68,
  maxPixels: 340_000,
  raySteps: 88,
  shadowSteps: 24,
  ease: 0.24,
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

      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const cores = navigator.hardwareConcurrency || 8;
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      const quality =
        coarse || wrap.clientWidth < 810 || cores <= 4 || (memory !== undefined && memory <= 4)
          ? MOBILE_QUALITY
          : DESKTOP_QUALITY;

      const gl = canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
        powerPreference: quality === MOBILE_QUALITY ? "low-power" : "high-performance",
      });
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
      gl.uniform1i(u("uRaySteps"), quality.raySteps);
      gl.uniform1i(u("uShadowSteps"), quality.shadowSteps);
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
        let ratio = Math.min(window.devicePixelRatio || 1, quality.pixelRatio);
        if (width * height * ratio * ratio > quality.maxPixels) {
          ratio = Math.sqrt(quality.maxPixels / (width * height));
        }
        const nextWidth = Math.max(1, Math.round(width * ratio));
        const nextHeight = Math.max(1, Math.round(height * ratio));
        if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
          canvas.width = nextWidth;
          canvas.height = nextHeight;
        }
        gl.viewport(0, 0, canvas.width, canvas.height);
      };

      let target = 0;
      let current = 0;
      let shown = -1;
      let visible = false;
      let needsDraw = true;
      let lastDrawn = Number.NaN;
      let frame = 0;

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
        lastDrawn = progress;
        needsDraw = false;
        if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
        const next = progress < 0.24 ? 0 : progress < 0.44 ? 1 : progress < 0.64 ? 2 : 3;
        if (next !== shown) {
          shown = next;
          setStage(next);
        }
      };

      const tick = () => {
        frame = 0;
        if (stopped || !visible || document.hidden) return;
        const delta = target - current;
        if (Math.abs(delta) < 0.0004) {
          current = target;
          if (needsDraw || lastDrawn !== current) draw(current);
          return;
        }
        current += delta * quality.ease;
        if (Math.abs(target - current) < 0.0004) current = target;
        draw(current);
        frame = requestAnimationFrame(tick);
      };
      const wake = () => {
        if (!frame && visible && !document.hidden) frame = requestAnimationFrame(tick);
      };
      const stopFrame = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
      };

      resize();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        draw(1);
        release = () => {
          gl.deleteProgram(program);
          gl.deleteShader(vs);
          gl.deleteShader(fs);
          gl.deleteBuffer(buffer);
        };
        return;
      }

      const st = ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          target = self.progress;
          if (visible) wake();
          else {
            current = target;
            needsDraw = true;
          }
        },
      });
      target = st.progress;
      current = target;

      const io = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? false;
          if (visible) {
            if (needsDraw) draw(current);
            wake();
          } else {
            stopFrame();
          }
        },
        { rootMargin: "240px 0px" },
      );
      io.observe(wrap);

      const ro = new ResizeObserver(() => {
        resize();
        needsDraw = true;
        if (visible) draw(current);
      });
      ro.observe(wrap);

      const onVisibility = () => {
        if (document.hidden) stopFrame();
        else wake();
      };
      document.addEventListener("visibilitychange", onVisibility);
      draw(current);

      release = () => {
        stopFrame();
        document.removeEventListener("visibilitychange", onVisibility);
        st.kill();
        io.disconnect();
        ro.disconnect();
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buffer);
      };
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      boot();
      return () => {
        stopped = true;
        release();
      };
    }

    let bootObserver: IntersectionObserver | null = null;
    let bootIdle: number | undefined;
    let bootTimer: ReturnType<typeof globalThis.setTimeout> | undefined;
    const scheduleBoot = () => {
      if (typeof window.requestIdleCallback === "function") {
        bootIdle = window.requestIdleCallback(() => boot(), { timeout: 700 });
      } else {
        bootTimer = globalThis.setTimeout(boot, 120);
      }
    };
    if (typeof window.IntersectionObserver !== "undefined") {
      bootObserver = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            bootObserver?.disconnect();
            scheduleBoot();
          }
        },
        { rootMargin: "250px 0px" },
      );
      bootObserver.observe(wrap);
    } else {
      const timer = globalThis.setTimeout(boot, 1200);
      return () => {
        stopped = true;
        globalThis.clearTimeout(timer);
        release();
      };
    }

    return () => {
      stopped = true;
      bootObserver?.disconnect();
      if (bootIdle !== undefined) window.cancelIdleCallback(bootIdle);
      if (bootTimer !== undefined) globalThis.clearTimeout(bootTimer);
      release();
    };
  }, []);

  return (
    <section ref={wrapRef} className="relative bg-[#DED7CC]" style={{ height: "calc(100svh - 72px + 200vh)" }}>
      <div className="sticky top-[72px] h-[calc(100svh-72px)] overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
        <div className="relative z-10 flex h-full flex-col mx-auto max-w-[1600px] px-5 md:px-10 pt-8 pb-8 pointer-events-none">
          <p className="label text-[#665b52] mb-4">Nuestro proceso de trabajo</p>
          <h2 className="display text-[clamp(40px,5vw,72px)] max-w-[560px] mb-5">
            Del levantamiento del espacio al diseño 3D.
          </h2>
          <p className="text-[16px] leading-relaxed text-[#4b3b31] max-w-[420px]">
            Visualiza tu proyecto antes de hacerlo realidad. Desplázate y mira cómo el espacio pasa del levantamiento al diseño, toma materiales y llega a la entrega final.
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
