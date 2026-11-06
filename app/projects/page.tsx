import Link from "next/link";
import type { Metadata } from "next";
import { Reveal, SlatsImage } from "@/components/Reveal";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Proyectos | Bi ARQ 1.0",
  description: "Ocho proyectos entre casas, hoteles, lugares de trabajo y espacios públicos, de 2019 a 2025.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 md:px-10">
      <section className="py-16 md:py-24">
        <Reveal>
          <p className="label text-[#665b52] mb-5">Proyectos</p>
          <h1 className="display text-[clamp(48px,8vw,120px)] mb-8">Obra construida, 2019 a 2025.</h1>
          <p className="text-[18px] leading-relaxed text-[#4b3b31] max-w-[620px]">
            Ocho proyectos entre casas, hoteles, lugares de trabajo y espacios públicos. Cada uno empezó con una visita, un boceto y una conversación larga sobre la luz.
          </p>
        </Reveal>
      </section>

      <section className="grid md:grid-cols-2 gap-x-8 gap-y-16 pb-24">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08}>
            <Link href={`/projects/${p.slug}`} className="group block">
              <SlatsImage src={p.cover} alt={p.name} ratio="aspect-[4/3]" className="group-hover:[&_img]:scale-[1.03] [&_img]:transition-transform [&_img]:duration-700" />
              <div className="flex items-baseline gap-4 pt-5 text-[13px] text-[#665b52]">
                <span className="font-medium text-[#b83d1c]">{p.index}</span>
                <span>{p.typology}</span><span>{p.location}</span><span>{p.year}</span>
              </div>
              <h2 className="text-[28px] md:text-[34px] font-light tracking-tight mt-2 group-hover:translate-x-1 transition-transform">{p.name}</h2>
            </Link>
          </Reveal>
        ))}
      </section>

      <section className="py-20 border-t border-[#cec5b8] mb-10">
        <Reveal>
          <p className="label text-[#665b52] mb-4">Índice completo</p>
          <h2 className="display text-[36px] md:text-[48px] mb-10">Todos los proyectos, de un vistazo.</h2>
        </Reveal>
        <div>
          {projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[60px_1fr_160px_80px_140px_100px] items-baseline gap-4 py-5 border-t border-[#cec5b8] hover:bg-[#ded7cc]/60 transition-colors px-2 -mx-2">
              <span className="text-[14px] text-[#665b52]">{p.index}</span>
              <span className="text-[20px] md:text-[26px] font-light tracking-tight group-hover:translate-x-2 transition-transform">{p.name}</span>
              <span className="hidden md:block text-[14px] text-[#665b52]">{p.location}</span>
              <span className="hidden md:block text-[14px] text-[#665b52]">{p.year}</span>
              <span className="hidden md:block text-[14px] text-[#665b52]">{p.typology}</span>
              <span className="text-[14px] text-[#665b52] text-right">{p.area}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
