import Link from "next/link";
import type { Metadata } from "next";
import { Reveal, SlatsImage } from "@/components/Reveal";
import { IM } from "@/lib/data";

export const metadata: Metadata = {
  title: "Estudio | Bi ARQ 1.0",
  description: "Un estudio pequeño para lugares serenos y duraderos. 38 arquitectos, interioristas y artesanos en Lisboa y Copenhague.",
};

const principles = [
  { n: "01", title: "La luz antes que la forma", text: "Estudiamos por dónde sale y se pone el sol en cada solar antes de dibujar un solo muro. Las estancias se colocan según las horas en que se usan." },
  { n: "02", title: "Pocos materiales, bien usados", text: "La mayoría de nuestros edificios usa cuatro o cinco materiales. Menos juntas, menos acabados y menos cosas que reparar dentro de veinte años." },
  { n: "03", title: "Diseñar para el siguiente dueño", text: "Una buena casa sobrevive a su primera familia. Pensamos estancias que puedan cambiar de uso sin derribar muros." },
];

export default function StudioPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 md:px-10">
      <section className="py-16 md:py-24">
        <Reveal>
          <p className="label text-[#665b52] mb-5">Estudio</p>
          <h1 className="display text-[clamp(44px,7.5vw,110px)] mb-8 max-w-[1000px]">Un estudio pequeño para lugares serenos y duraderos.</h1>
          <p className="text-[18px] leading-relaxed text-[#4b3b31] max-w-[640px]">
            Bi ARQ 1.0 son 38 arquitectos, interioristas y artesanos en Lisboa y Copenhague. Aceptamos pocos proyectos al año y seguimos cada uno desde la primera visita hasta el día en que se entregan las llaves.
          </p>
        </Reveal>
      </section>

      <SlatsImage src={IM.studioHero} alt="Estudio Bi ARQ 1.0" ratio="aspect-[16/8]" />

      <section className="py-20 md:py-28">
        <Reveal>
          <p className="label text-[#665b52] mb-4">Cómo pensamos</p>
          <h2 className="display text-[36px] md:text-[52px] mb-12">Tres cosas a las que nos aferramos.</h2>
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
          <div className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div>
              <p className="label text-[#665b52] mb-4">Personas</p>
              <h2 className="display text-[36px] md:text-[52px]">Quienes lo dibujan.</h2>
            </div>
            <Link href="/contact" className="link-line font-medium">Trabaja con nosotros</Link>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {IM.team.map((person, i) => (
            <Reveal key={person.name} delay={(i % 3) * 0.07}>
              <div className="relative overflow-hidden aspect-[3/4] bg-[#ded7cc] group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={person.photo} alt={person.name} className="img-cover absolute inset-0 group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
              </div>
              <h3 className="text-[21px] font-medium mt-4">{person.name}</h3>
              <p className="text-[14px] text-[#665b52]">{person.role}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-24 border-t border-[#cec5b8] mb-8">
        <Reveal>
          <p className="label text-[#665b52] mb-4">Estudios</p>
          <h2 className="display text-[36px] md:text-[52px] mb-12">Dos salas, una misma forma de trabajar.</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { city: "Lisboa", address: "Rua das Flores 28, 1200-195 Lisboa", text: "Nuestro primer estudio, en un antiguo taller de encuadernación sobre el Chiado, con la sala de maquetas en la planta baja.", img: IM.lisbon },
            { city: "Copenhague", address: "Bredgade 36, 1260 Copenhague", text: "Abierto en 2019 para los proyectos nórdicos, a dos minutos del puerto y de los talleres de mobiliario con los que trabajamos.", img: IM.copenhagen },
          ].map((s, i) => (
            <Reveal key={s.city} delay={i * 0.08}>
              <SlatsImage src={s.img} alt={`Estudio de ${s.city}`} ratio="aspect-[16/10]" />
              <h3 className="display text-[32px] mt-6 mb-2">{s.city}</h3>
              <p className="font-medium text-[15px] mb-3">{s.address}</p>
              <p className="text-[15px] leading-relaxed text-[#4b3b31] max-w-[460px]">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
