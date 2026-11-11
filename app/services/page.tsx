import Link from "next/link";
import type { Metadata } from "next";
import { Reveal, SlatsImage } from "@/components/Reveal";
import FaqList from "@/components/FaqList";
import { processSteps, site, IM } from "@/lib/data";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Servicios",
  description:
    "Diseño de interiores, remodelación de apartamentos y casas, cocinas, baños, iluminación, mobiliario, renderizado 3D y supervisión de obra en Bogotá.",
  path: "/services",
});

const allServices = [
  "Diseño de interiores",
  "Remodelación de apartamentos",
  "Remodelación de casas",
  "Diseño de cocinas",
  "Diseño de baños",
  "Iluminación arquitectónica",
  "Mobiliario personalizado",
  "Renderizado 3D",
  "Supervisión de obra",
  "Asesoría en materiales",
];

const details = [
  { n: "01", name: "Diseño de cocinas", text: "Creamos cocinas que combinan estética, funcionalidad y tecnología, adaptadas a tu estilo de vida.", get: "Distribución inteligente · Material de alta calidad · Diseño personalizado", img: "/projects/01/09.webp" },
  { n: "02", name: "Diseño de baños", text: "Transformamos baños en espacios de bienestar y relajación, cuidando cada detalle y acabado.", get: "Diseño moderno y funcional · Material de alta calidad · Iluminación y ventilación estratégica", img: "/projects/02/01.webp" },
  { n: "03", name: "Salas y espacios sociales", text: "Diseñamos espacios acogedores y elegantes para compartir momentos inolvidables en familia y con amigos.", get: "Espacios acogedores y elegantes, para compartir", img: "/projects/03/01.webp" },
  { n: "04", name: "Habitaciones", text: "Creamos habitaciones que transmiten confort y tranquilidad, adaptadas a tu estilo personal.", get: "Confort y tranquilidad, a tu estilo personal", img: "/projects/01/01.webp" },
  { n: "05", name: "Oficinas", text: "Diseñamos oficinas funcionales y modernas que mejoran la productividad y reflejan la identidad de tu marca.", get: "Funcionalidad, productividad e identidad de marca", img: IM.services[1] },
  { n: "06", name: "Renderizados 3D", text: "Visualiza tu proyecto antes de hacerlo realidad. Imágenes realistas que te permiten tomar decisiones con confianza.", get: "Imágenes realistas para decidir con confianza", img: IM.built },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 md:px-10">
      <section className="py-16 md:py-24">
        <Reveal>
          <p className="label text-[#665b52] mb-5">Nuestros servicios</p>
          <h1 className="display text-[clamp(44px,7.5vw,110px)] mb-8 max-w-[1000px]">Diseño, arquitectura y remodelación.</h1>
          <p className="text-[18px] leading-relaxed text-[#4b3b31] max-w-[640px]">
            {site.philosophy}
          </p>
        </Reveal>
      </section>

      <section className="pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#cec5b8]">
          {allServices.map((name, i) => (
            <Reveal key={name} delay={(i % 3) * 0.06} className="border-b border-r border-[#cec5b8]">
              <div className="p-6 md:p-7 flex items-baseline gap-4 h-full hover:bg-[#ded7cc]/50 transition-colors">
                <span className="text-[13px] font-medium text-[#b83d1c]">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-[20px] font-light tracking-tight">{name}</h2>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-10">
        {details.map((s, i) => (
          <Reveal key={s.n}>
            <article className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center py-12 border-t border-[#cec5b8]">
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <SlatsImage src={s.img} alt={s.name} ratio="aspect-[4/3]" />
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <span className="text-[14px] font-medium text-[#b83d1c]">{s.n}</span>
                <h2 className="display text-[38px] md:text-[48px] mt-3 mb-5">{s.name}</h2>
                <p className="text-[17px] leading-relaxed text-[#4b3b31] max-w-[520px] mb-8">{s.text}</p>
                <p className="label text-[#665b52] mb-2">Incluye</p>
                <p className="text-[15px] max-w-[520px]">{s.get}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="py-20 md:py-24 border-t border-[#cec5b8]">
        <Reveal>
          <p className="label text-[#665b52] mb-4">Nuestro proceso de trabajo</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <h2 className="display text-[36px] md:text-[52px] max-w-[640px]">De la reunión con el cliente a la entrega final.</h2>
            <Link href="/contact" className="btn-arrow inline-flex items-center gap-2 bg-[#2b1f18] text-[#eeeae3] px-6 py-3.5 rounded-[4px] font-medium text-[15px] shrink-0">Empezar un proyecto <span className="arr">↗</span></Link>
          </div>
        </Reveal>
        <div>
          {processSteps.map((step, i) => (
            <Reveal key={step} delay={i * 0.03}>
              <div className="grid grid-cols-[auto_1fr] gap-6 py-6 border-t border-[#cec5b8] items-baseline">
                <span className="display text-[36px] text-[#a89a8d]">0{i + 1}</span>
                <h3 className="text-[24px] md:text-[28px] font-light tracking-tight">{step}</h3>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="text-[16px] leading-relaxed text-[#4b3b31] max-w-[560px] mt-12">
            {site.materialsText}
          </p>
        </Reveal>
      </section>

      <section className="py-20 md:py-24 border-t border-[#cec5b8] mb-8">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="label text-[#665b52] mb-4">Preguntas</p>
              <h2 className="display text-[34px] md:text-[44px]">Lo que los clientes suelen preguntar primero.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <FaqList />
          </div>
        </div>
      </section>
    </div>
  );
}
