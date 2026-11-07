import dynamic from "next/dynamic";
import Link from "next/link";
import { Reveal, SlatsImage } from "@/components/Reveal";
import { Hero, Stats, IndexList } from "@/components/HomeSections";
import Photo from "@/components/Photo";
import { projects, materials, IM } from "@/lib/data";

const LightStudy = dynamic(() => import("@/components/LightStudy"));
const PlanDrawing = dynamic(() => import("@/components/PlanDrawing"));
const ProcessStage = dynamic(() => import("@/components/ProcessStage"));
const CompareSlider = dynamic(() => import("@/components/CompareSlider"));

const featured = projects[0];

const disciplines = [
  { n: "01", name: "Arquitectura", text: "Casas nuevas, ampliaciones y edificios pequeños, de la primera visita al solar a la última inspección.", del: "Viabilidad, concepto, permisos, dirección de obra", img: IM.services[0], alt: "Jamba profunda recortada en un muro grueso de cal" },
  { n: "02", name: "Interiores", text: "Interiores completos para casas, hoteles y restaurantes, hasta las luminarias y los tejidos.", del: "Distribución, carpintería, iluminación, estilismo", img: IM.services[1], alt: "Rincón de estar con sofá de lino, mesa auxiliar de roble y jarrón de cerámica" },
  { n: "03", name: "Rehabilitación", text: "Trabajo cuidadoso sobre edificios existentes: conservar lo que tiene carácter y corregir lo que no.", del: "Levantamientos, patrimonio, estructura, restauración", img: IM.services[2], alt: "Muro de piedra antiguo con una ventana nueva de acero fino" },
  { n: "04", name: "Objetos", text: "Mobiliario y herrajes pensados para nuestros proyectos y fabricados con talleres locales.", del: "Mesas, iluminación, herrajes, ediciones cortas", img: IM.services[3], alt: "Mesa auxiliar de travertino y lámpara de latón sobre un plinto de yeso" },
];

const steps = [
  { n: "01", dur: "1 a 2 semanas", title: "Primera visita", text: "Recorremos el solar o las estancias contigo, escuchamos, medimos y fotografiamos. Te vas con un encargo breve escrito con tus propias palabras." },
  { n: "02", dur: "3 a 6 semanas", title: "Concepto", text: "Bocetos, maquetas sencillas de cartón y una primera idea de coste, para acordar la dirección antes de que nada se vuelva caro." },
  { n: "03", dur: "2 a 4 meses", title: "Proyecto y permisos", text: "Planos de detalle, materiales y solicitudes, coordinados con los ingenieros desde el primer día." },
  { n: "04", dur: "6 a 14 meses", title: "Obra", text: "Estamos en obra cada semana con el constructor, revisando detalles, muestras y presupuesto, para que nada se decida por accidente." },
  { n: "05", dur: "2 a 4 semanas", title: "Entrega", text: "Repasos, estilismo y un último recorrido juntos. Volvemos al cabo de un año para ver cómo se vive el lugar." },
];

const awards = [
  { year: "2025", award: "Dezeen Awards, preselección", project: "Hotel Mira", cat: "Interior hotelero" },
  { year: "2024", award: "Wallpaper* Design Awards, mejor lugar de trabajo", project: "Nord Workplace", cat: "Oficinas" },
  { year: "2024", award: "Publicado en AD España, número 189", project: "Casa Alba", cat: "Publicación" },
  { year: "2023", award: "Danish Design Award, mención de honor", project: "Apartamento Linen", cat: "Interior" },
  { year: "2022", award: "ArchDaily Building of the Year, nominado", project: "Pabellón Ora", cat: "Edificio pequeño" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <LightStudy />
      <Stats />

      {/* Selected work */}
      <section className="bg-[#2b1f18] text-[#eeeae3]">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-4 pb-5 border-b border-white/15 text-[13px]">
            <p>Obra seleccionada</p>
            <p className="hidden md:block text-center text-[#a89a8d]">Casas, hoteles y lugares de trabajo, 2019 a 2025</p>
            <Link href="/projects" className="link-line justify-self-end font-medium">Índice completo de 8 proyectos</Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 mt-12 items-end">
            <div className="lg:col-span-4 flex flex-col justify-between gap-16 min-h-[220px]">
              <div>
                <p className="text-[13px] text-[#a89a8d] mb-4">Proyecto destacado</p>
                <p className="text-[18px] leading-snug font-light max-w-[280px]">{featured.summary}</p>
              </div>
              <p className="display text-[clamp(42px,5.2vw,78px)] leading-[0.92] tracking-[-0.045em]">Casa Alba</p>
            </div>
            <div className="lg:col-span-8 relative">
              <Link href={`/projects/${featured.slug}`} className="block">
                <SlatsImage src={featured.cover} alt={featured.name} ratio="aspect-[4/5] md:aspect-[5/4]" sizes="(max-width: 1024px) 100vw, 60vw" />
              </Link>
              <div className="bg-[#eeeae3] text-[#1c1714] p-6 md:p-7 md:absolute md:right-5 md:bottom-5 md:w-[340px] shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                <h3 className="text-[26px] font-medium tracking-tight mb-4">{featured.name}</h3>
                <dl>
                  {[["Lugar", featured.location], ["Año", featured.year], ["Tipo", featured.typology], ["Superficie", featured.area]].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 py-2.5 border-t border-[#cec5b8] text-[14px]">
                      <dt className="text-[#665b52]">{k}</dt>
                      <dd className="font-medium text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
                <Link href={`/projects/${featured.slug}`} className="btn-arrow mt-5 inline-flex items-center gap-2 bg-[#2b1f18] text-[#eeeae3] h-11 px-4 rounded-[4px] text-[14px] font-medium">
                  Ver proyecto <span className="arr">↗</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <IndexList dark />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link href="/projects" className="btn-arrow inline-flex items-center gap-2 border border-[#eeeae3] px-6 h-12 rounded-[4px] font-medium text-[15px] hover:bg-[#eeeae3] hover:text-[#2b1f18]">
              Ver el índice completo <span className="arr">↗</span>
            </Link>
            <p className="text-[14px] text-[#a89a8d]">Ocho proyectos, de Comporta a Oslo</p>
          </div>
        </div>
      </section>

      {/* Plan study */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-20 md:py-28 border-t border-[#cec5b8]">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="label text-[#665b52] mb-4">Estudio de planta</p>
              <h2 className="display text-[38px] md:text-[52px] mb-6">Cada estancia empieza como una línea en el plano.</h2>
              <p className="text-[16px] leading-relaxed text-[#4b3b31] mb-8 max-w-[420px]">
                Antes de los materiales y la luz está el plano. Desplázate y mira cómo se dibuja Casa Alba, igual que cada proyecto: muros, huecos, cotas, mobiliario y, al final, las ideas que lo sostienen.
              </p>
              <Link href={`/projects/${featured.slug}`} className="btn-arrow inline-flex items-center gap-2 bg-[#2b1f18] text-[#eeeae3] px-5 py-3 rounded-[4px] text-[14px] font-medium">
                Ver el proyecto <span className="arr">↗</span>
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <PlanDrawing />
          </div>
        </div>
      </section>

      {/* Drawing to built */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-20 md:py-28 border-t border-[#cec5b8]">
        <Reveal>
          <p className="display text-[clamp(44px,8vw,110px)] mb-10">Dibujado <span className="text-[#a89a8d]">y luego</span> construido</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <h2 className="display text-[38px] md:text-[52px]">Del dibujo a la obra</h2>
            <p className="text-[16px] leading-relaxed text-[#4b3b31] max-w-[520px]">
              Cada estancia que entregamos existió primero como un dibujo. Desliza el Apartamento Linen y mira cuánto se parece la vivienda terminada a la sección del primer día.
            </p>
          </div>
        </Reveal>
        <CompareSlider drawing={IM.drawing} built={IM.built} caption="Apartamento Linen, Copenhague, 2023" />
      </section>

      {/* Disciplines */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-20 md:py-28 border-t border-[#cec5b8]">
        <Reveal>
          <p className="label text-[#665b52] mb-4">Disciplinas</p>
          <h2 className="display text-[38px] md:text-[60px] max-w-[900px] mb-6">Un estudio, de la primera línea a la última silla.</h2>
          <p className="text-[16px] leading-relaxed text-[#4b3b31] max-w-[560px] mb-14">
            La mayoría llega por una sola cosa y se queda por el resto. Arquitectura, interiores, rehabilitación y los objetos los dibuja el mismo equipo pequeño.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 border-t border-l border-[#cec5b8]">
          {disciplines.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.08} className="border-b border-r border-[#cec5b8]">
              <Link href="/services" className="flex flex-col h-full hover:bg-[#ded7cc]/50 transition-colors">
                <SlatsImage src={d.img} alt={d.alt} ratio="aspect-[4/3]" />
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-[26px] font-light tracking-tight">{d.name}</h3>
                    <span className="text-[13px] text-[#b83d1c] font-medium">{d.n}</span>
                  </div>
                  <p className="text-[15px] leading-relaxed text-[#4b3b31] mb-6">{d.text}</p>
                  <p className="mt-auto text-[13px] text-[#665b52] border-t border-[#cec5b8] pt-4">{d.del}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-20 md:py-28 border-t border-[#cec5b8]">
        <div className="grid lg:grid-cols-2 gap-12">
          <ProcessStage />
          <div>
            <Reveal>
              <p className="label text-[#665b52] mb-4">Cómo trabajamos</p>
              <h2 className="display text-[clamp(36px,4.5vw,72px)] mb-10">Cinco pasos, de la primera visita al día en que te mudas.</h2>
            </Reveal>
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <article className="grid grid-cols-[auto_1fr] gap-6 py-9 border-t border-[#cec5b8]">
                  <span className="display text-[44px] text-[#a89a8d]">{s.n}</span>
                  <div>
                    <p className="text-[13px] text-[#b83d1c] font-medium mb-2">{s.dur}</p>
                    <h3 className="text-[26px] font-light tracking-tight mb-3">{s.title}</h3>
                    <p className="text-[15px] leading-relaxed text-[#4b3b31] max-w-[480px]">{s.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-20 md:py-28 border-t border-[#cec5b8] overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <Reveal>
            <p className="label text-[#665b52] mb-4">Biblioteca de materiales</p>
            <h2 className="display text-[38px] md:text-[56px] max-w-[800px] mb-6">Ocho materiales a los que volvemos una y otra vez.</h2>
            <p className="text-[16px] leading-relaxed text-[#4b3b31] max-w-[560px] mb-12">
              Preferimos usar pocos materiales honestos y bien, antes que muchos y mal. Cada uno se elige para envejecer despacio y verse mejor después de diez años de uso.
            </p>
          </Reveal>
        </div>
        <div className="marquee-track gap-5 px-5">
          {[...materials, ...materials].map((m, i) => (
            <article key={m.name + i} className="w-[260px] md:w-[300px] shrink-0 bg-[#ded7cc]/60 border border-[#cec5b8]">
              <div className="relative aspect-square overflow-hidden">
                <Photo src={m.swatch} alt={m.name} className="img-cover hover:scale-105 transition-transform duration-700" sizes="300px" quality={60} />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-baseline gap-3">
                  <h3 className="text-[19px] font-medium">{m.name}</h3>
                  <span className="text-[12px] text-[#665b52]">{m.origin}</span>
                </div>
                <p className="text-[13px] text-[#665b52] mt-2">{m.spec}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Quote + Recognition */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-20 md:py-28 border-t border-[#cec5b8]">
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <div className="lg:col-span-3">
            <Reveal>
              <div className="relative overflow-hidden aspect-[3/4] bg-[#ded7cc]">
                <Photo src={IM.portrait} alt="Marta Reis, propietaria de Casa Alba" className="img-cover" sizes="320px" quality={64} />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-9 flex flex-col justify-center">
            <Reveal>
              <blockquote className="display text-[30px] md:text-[44px] max-w-[900px] mb-8">
                “Escucharon mucho tiempo antes de dibujar una sola línea. Dos años después, la casa sigue sorprendiéndonos por cómo se mueve la luz al atardecer.”
              </blockquote>
              <p className="font-medium">Marta Reis</p>
              <p className="text-[14px] text-[#665b52]">Propietaria, Casa Alba</p>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
            <div>
              <p className="label text-[#665b52] mb-3">Reconocimiento</p>
              <h2 className="display text-[34px] md:text-[44px]">Premios y publicaciones seleccionados</h2>
            </div>
          </div>
        </Reveal>
        <div>
          {awards.map((a) => (
            <div key={a.award} className="grid md:grid-cols-[80px_1fr_220px_160px] gap-3 py-5 border-t border-[#cec5b8] items-baseline hover:bg-[#ded7cc]/50 transition-colors px-2 -mx-2">
              <span className="font-medium">{a.year}</span>
              <span className="text-[17px]">{a.award}</span>
              <span className="text-[14px] text-[#665b52]">{a.project}</span>
              <span className="text-[14px] text-[#665b52] md:text-right">{a.cat}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
