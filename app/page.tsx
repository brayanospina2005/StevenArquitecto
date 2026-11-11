import Link from "next/link";
import { Reveal, SlatsImage } from "@/components/Reveal";
import { Hero, Stats, IndexList } from "@/components/HomeSections";
import { LazyCompareSlider, LazyLightStudy, LazyPlanDrawing, LazyProcessStage } from "@/components/LazySections";
import Photo from "@/components/Photo";
import { projects, materialSwatches, processSteps, site, whyUs, IM } from "@/lib/data";

const featured = projects[0];

const disciplines = [
  { n: "01", name: "Diseño de cocinas", text: "Creamos cocinas que combinan estética, funcionalidad y tecnología, adaptadas a tu estilo de vida.", del: "Distribución inteligente · Material de alta calidad · Diseño personalizado", img: "/projects/01/09.webp", alt: "Cocina diseñada por Bi Arq 1.0" },
  { n: "02", name: "Diseño de baños", text: "Transformamos baños en espacios de bienestar y relajación, cuidando cada detalle y acabado.", del: "Diseño moderno y funcional · Material de alta calidad · Iluminación y ventilación estratégica", img: "/projects/02/01.webp", alt: "Baño diseñado por Bi Arq 1.0" },
  { n: "03", name: "Salas y espacios sociales", text: "Diseñamos espacios acogedores y elegantes para compartir momentos inolvidables en familia y con amigos.", del: "Salas · Espacios sociales", img: "/projects/03/01.webp", alt: "Sala diseñada por Bi Arq 1.0" },
  { n: "04", name: "Habitaciones", text: "Creamos habitaciones que transmiten confort y tranquilidad, adaptadas a tu estilo personal.", del: "Habitaciones a tu estilo", img: "/projects/01/01.webp", alt: "Habitación diseñada por Bi Arq 1.0" },
];

const steps = processSteps.map((title, i) => ({ n: `0${i + 1}`, title }));

export default function Home() {
  return (
    <>
      <Hero />
      <LazyLightStudy />
      <Stats />

      {/* Selected work */}
      <section className="bg-[#2b1f18] text-[#eeeae3]">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-4 pb-5 border-b border-white/15 text-[13px]">
            <p>Obra seleccionada</p>
            <p className="hidden md:block text-center text-[#a89a8d]">Remodelaciones de apartamentos en Bogotá, Colombia</p>
            <Link href="/projects" className="link-line justify-self-end font-medium">Índice completo de 3 proyectos</Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 mt-12 items-end">
            <div className="lg:col-span-4 flex flex-col justify-between gap-16 min-h-[220px]">
              <div>
                <p className="text-[13px] text-[#a89a8d] mb-4">Proyecto destacado</p>
                <p className="text-[18px] leading-snug font-light max-w-[280px]">{featured.summary}</p>
              </div>
              <p className="display text-[clamp(42px,5.2vw,78px)] leading-[0.92] tracking-[-0.045em]">{featured.name}</p>
            </div>
            <div className="lg:col-span-8 relative">
              <Link href={`/projects/${featured.slug}`} className="block">
                <SlatsImage src={featured.cover} alt={featured.name} ratio="aspect-[4/5] md:aspect-[5/4]" sizes="(max-width: 1024px) 100vw, 60vw" />
              </Link>
              <div className="bg-[#eeeae3] text-[#1c1714] p-6 md:p-7 md:absolute md:right-5 md:bottom-5 md:w-[340px] shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                <h3 className="text-[26px] font-medium tracking-tight mb-4">{featured.name}</h3>
                <dl>
                  {[["Lugar", featured.location], ["Tipo", featured.typology], ["Galería", `${featured.gallery.length + 1} fotos`], ["Ciudad", site.city]].map(([k, v]) => (
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
            <p className="text-[14px] text-[#a89a8d]">Tres remodelaciones de apartamento en Bogotá</p>
          </div>
        </div>
      </section>

      {/* Plan study */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-20 md:py-28 border-t border-[#cec5b8]">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="label text-[#665b52] mb-4">Nuestro proceso de trabajo</p>
              <h2 className="display text-[38px] md:text-[52px] mb-6">Cada proyecto empieza con una reunión y un levantamiento.</h2>
              <p className="text-[16px] leading-relaxed text-[#4b3b31] mb-8 max-w-[420px]">
                Después del levantamiento del espacio llega el diseño 3D: visualiza tu proyecto antes de hacerlo realidad, con imágenes realistas que te permiten tomar decisiones con confianza.
              </p>
              <Link href={`/projects/${featured.slug}`} className="btn-arrow inline-flex items-center gap-2 bg-[#2b1f18] text-[#eeeae3] px-5 py-3 rounded-[4px] text-[14px] font-medium">
                Ver el proyecto <span className="arr">↗</span>
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <LazyPlanDrawing />
          </div>
        </div>
      </section>

      {/* Drawing to built */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-20 md:py-28 border-t border-[#cec5b8]">
        <Reveal>
          <p className="display text-[clamp(44px,8vw,110px)] mb-10">Antes <span className="text-[#a89a8d]">y</span> después</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <h2 className="display text-[38px] md:text-[52px]">Renderizados 3D</h2>
            <p className="text-[16px] leading-relaxed text-[#4b3b31] max-w-[520px]">
              Visualiza tu proyecto antes de hacerlo realidad. Imágenes realistas que te permiten tomar decisiones con confianza.
            </p>
          </div>
        </Reveal>
        <LazyCompareSlider drawing={IM.drawing} built={IM.built} caption="Antes y después, Bi Arq 1.0" />
      </section>

      {/* Disciplines */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-20 md:py-28 border-t border-[#cec5b8]">
        <Reveal>
          <p className="label text-[#665b52] mb-4">Nuestros servicios</p>
          <h2 className="display text-[38px] md:text-[60px] max-w-[900px] mb-6">Espacios que diseñamos y remodelamos.</h2>
          <p className="text-[16px] leading-relaxed text-[#4b3b31] max-w-[560px] mb-14">
            {site.philosophy}
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
          <LazyProcessStage />
          <div>
            <Reveal>
              <p className="label text-[#665b52] mb-4">Cómo trabajamos</p>
              <h2 className="display text-[clamp(36px,4.5vw,72px)] mb-10">Siete pasos, de la reunión con el cliente a la entrega final.</h2>
            </Reveal>
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <article className="grid grid-cols-[auto_1fr] gap-6 py-9 border-t border-[#cec5b8]">
                  <span className="display text-[44px] text-[#a89a8d]">{s.n}</span>
                  <div>
                    <h3 className="text-[26px] font-light tracking-tight">{s.title}</h3>
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
            <p className="label text-[#665b52] mb-4">Materiales que utilizamos</p>
            <h2 className="display text-[38px] md:text-[56px] max-w-[800px] mb-6">Acabados duraderos y sofisticados.</h2>
            <p className="text-[16px] leading-relaxed text-[#4b3b31] max-w-[560px] mb-12">
              {site.materialsText}
            </p>
          </Reveal>
        </div>
        <div className="marquee-track gap-5 px-5">
          {[...materialSwatches, ...materialSwatches].map((src, i) => (
            <article key={src + i} className="w-[260px] md:w-[300px] shrink-0 bg-[#ded7cc]/60 border border-[#cec5b8]">
              <div className="relative aspect-square overflow-hidden">
                <Photo src={src} alt="Materiales que utilizamos en Bi Arq 1.0" className="img-cover hover:scale-105 transition-transform duration-700" sizes="300px" quality={60} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-20 md:py-28 border-t border-[#cec5b8]">
        <Reveal>
          <p className="label text-[#665b52] mb-4">Nuestra filosofía</p>
          <blockquote className="display text-[30px] md:text-[44px] max-w-[900px] mb-16">
            {site.philosophy}
          </blockquote>
        </Reveal>
        <Reveal>
          <p className="label text-[#665b52] mb-3">¿Por qué elegir Bi Arq 1.0?</p>
          <h2 className="display text-[34px] md:text-[44px] mb-8">Lo que nos define en cada proyecto</h2>
        </Reveal>
        <div>
          {whyUs.map((item, i) => (
            <div key={item} className="grid md:grid-cols-[80px_1fr] gap-3 py-5 border-t border-[#cec5b8] items-baseline hover:bg-[#ded7cc]/50 transition-colors px-2 -mx-2">
              <span className="font-medium text-[#b83d1c]">0{i + 1}</span>
              <span className="text-[20px] md:text-[24px] font-light tracking-tight">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
