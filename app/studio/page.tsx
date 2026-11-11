import Link from "next/link";
import type { Metadata } from "next";
import { Reveal, SlatsImage } from "@/components/Reveal";
import { site, whyUs, IM } from "@/lib/data";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Estudio",
  description:
    "Bi Arq 1.0 nace para transformar espacios en Bogotá. Diseños personalizados, materiales de alta calidad y acompañamiento de la reunión a la entrega.",
  path: "/studio",
});

const principles = [
  { n: "01", title: "Diseño funcional", text: site.philosophy },
  { n: "02", title: "Calidad en cada detalle", text: site.materialsText },
  { n: "03", title: "Compromiso y confianza", text: "Acompañamiento completo y entrega profesional en cada proyecto, desde la reunión con el cliente hasta la entrega final." },
];

export default function StudioPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 md:px-10">
      <section className="py-16 md:py-24">
        <Reveal>
          <p className="label text-[#665b52] mb-5">Nuestra historia</p>
          <h1 className="display text-[clamp(44px,7.5vw,110px)] mb-8 max-w-[1000px]">Transformar espacios, mejorar la calidad de vida.</h1>
          <p className="text-[18px] leading-relaxed text-[#4b3b31] max-w-[640px]">
            {site.history}
          </p>
        </Reveal>
      </section>

      <SlatsImage src={IM.studioHero} alt="Interior de Bi Arq 1.0" ratio="aspect-[16/8]" />

      <section className="py-20 md:py-28">
        <Reveal>
          <p className="label text-[#665b52] mb-4">Nuestra filosofía</p>
          <h2 className="display text-[36px] md:text-[52px] mb-12">Cada espacio tiene el potencial de inspirar.</h2>
        </Reveal>
        <div>
          {principles.map((pr, i) => (
            <Reveal key={pr.n} delay={i * 0.05}>
              <article className="grid md:grid-cols-[80px_1fr_1fr] gap-4 py-10 border-t border-[#cec5b8] items-start">
                <span className="text-[14px] font-medium text-[#b83d1c]">{pr.n}</span>
                <h3 className="display text-[30px] md:text-[38px]">{pr.title}</h3>
                <p className="text-[16px] leading-relaxed text-[#4b3b31] md:pl-16 max-w-[520px]">{pr.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-24 border-t border-[#cec5b8]">
        <Reveal>
          <p className="label text-[#665b52] mb-4">¿Por qué elegir Bi Arq 1.0?</p>
          <h2 className="display text-[36px] md:text-[52px] mb-12">Diseñamos con propósito.</h2>
        </Reveal>
        <div>
          {whyUs.map((item, i) => (
            <Reveal key={item} delay={i * 0.04}>
              <div className="grid md:grid-cols-[80px_1fr] gap-4 py-6 border-t border-[#cec5b8] items-baseline">
                <span className="text-[14px] font-medium text-[#b83d1c]">0{i + 1}</span>
                <p className="text-[24px] md:text-[30px] font-light tracking-tight">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-24 border-t border-[#cec5b8] mb-8">
        <Reveal>
          <p className="label text-[#665b52] mb-4">Dónde estamos</p>
          <h2 className="display text-[36px] md:text-[52px] mb-12">{site.city}</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Reveal>
            <SlatsImage src={IM.contactStudio} alt="Espacio de trabajo de Bi Arq 1.0 en Bogotá" ratio="aspect-[16/10]" />
          </Reveal>
          <Reveal delay={0.08}>
            <dl className="text-[15px]">
              {[
                ["Ciudad", site.city],
                ["Teléfono", <a key="p" href={site.phoneHref} className="link-line">{site.phoneIntl}</a>],
                ["Correo", <a key="e" href={`mailto:${site.email}`} className="link-line break-all">{site.email}</a>],
                ["Instagram", <a key="i" href={site.instagram} target="_blank" rel="noreferrer" className="link-line">@{site.instagramHandle}</a>],
                ["TikTok", <a key="t" href={site.tiktok} target="_blank" rel="noreferrer" className="link-line">@{site.tiktokHandle}</a>],
              ].map(([k, v]) => (
                <div key={k as string} className="grid grid-cols-[120px_1fr] gap-4 py-4 border-t border-[#cec5b8]">
                  <dt className="text-[#665b52]">{k}</dt><dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <Link href="/contact" className="btn-arrow mt-8 inline-flex items-center gap-2 bg-[#2b1f18] text-[#eeeae3] px-6 py-3.5 rounded-[4px] font-medium text-[15px]">
              Empezar un proyecto <span className="arr">↗</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
