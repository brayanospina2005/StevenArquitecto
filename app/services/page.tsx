import Link from "next/link";
import { Reveal, SlatsImage } from "@/components/Reveal";
import FaqList from "@/components/FaqList";
import { IM } from "@/lib/data";

const services = [
  { n: "01", name: "Arquitectura", text: "Casas nuevas, ampliaciones y edificios públicos pequeños. Nos encargamos del estudio del solar, la licencia y cada visita de obra hasta la última inspección.", get: "Estudio de viabilidad, anteproyecto, licencia, planos técnicos, dirección de obra" },
  { n: "02", name: "Interiores", text: "Interiores completos para casas, hoteles, restaurantes y lugares de trabajo, hasta las luminarias, los tejidos y los tiradores.", get: "Distribución, diseño de carpintería, plan de iluminación, acabados y mobiliario, estilismo" },
  { n: "03", name: "Rehabilitación", text: "Trabajo cuidadoso sobre edificios existentes y protegidos. Conservamos lo que tiene carácter, reparamos lo que se puede y añadimos solo lo que el edificio necesita.", get: "Levantamiento, asesoría patrimonial, coordinación estructural, detalles de restauración" },
  { n: "04", name: "Objetos", text: "Mobiliario, iluminación y herrajes pensados para nuestros proyectos y fabricados en series cortas con talleres que conocemos.", get: "Diseño de mobiliario, prototipos, ediciones cortas, herrajes" },
];

const scopes = [
  { n: "01", dur: "12 a 36 meses", name: "Servicio completo", text: "Diseñamos el edificio, los interiores y el mobiliario, y seguimos en obra hasta la entrega.", includes: "Arquitectura, interiores, mobiliario, visitas de obra" },
  { n: "02", dur: "4 a 12 meses", name: "Solo interiores", text: "Para una casa, un hotel o un restaurante cuya estructura ya existe. Cada estancia, cada acabado y cada luminaria.", includes: "Distribución, carpintería, iluminación, estilismo" },
  { n: "03", dur: "2 a 4 semanas", name: "Consulta de diseño", text: "Unas sesiones concentradas para probar un solar, un presupuesto o una idea antes de comprometerte con un proyecto completo.", includes: "Visita al solar, opciones en boceto, orientación de coste" },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 md:px-10">
      <section className="py-16 md:py-24">
        <Reveal>
          <p className="label text-[#665b52] mb-5">Servicios</p>
          <h1 className="display text-[clamp(44px,7.5vw,110px)] mb-8 max-w-[1000px]">Del primer boceto a la última silla.</h1>
          <p className="text-[18px] leading-relaxed text-[#4b3b31] max-w-[640px]">
            Cuatro disciplinas bajo el mismo techo, para que el edificio, las estancias y el mobiliario los dibujen las mismas personas y estén de acuerdo entre sí.
          </p>
        </Reveal>
      </section>

      <section className="pb-10">
        {services.map((s, i) => (
          <Reveal key={s.n}>
            <article className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center py-12 border-t border-[#cec5b8] ${i % 2 === 1 ? "" : ""}`}>
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <SlatsImage src={IM.services[i]} alt={s.name} ratio="aspect-[4/3]" />
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <span className="text-[14px] font-medium text-[#b83d1c]">{s.n}</span>
                <h2 className="display text-[38px] md:text-[48px] mt-3 mb-5">{s.name}</h2>
                <p className="text-[17px] leading-relaxed text-[#4b3b31] max-w-[520px] mb-8">{s.text}</p>
                <p className="label text-[#665b52] mb-2">Qué incluye</p>
                <p className="text-[15px] max-w-[520px]">{s.get}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="py-20 md:py-24 border-t border-[#cec5b8]">
        <Reveal>
          <p className="label text-[#665b52] mb-4">Formas de trabajar con nosotros</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="display text-[36px] md:text-[52px] max-w-[640px] mb-4">Empieza por la casa entera, o por una sola conversación.</h2>
              <p className="text-[16px] text-[#4b3b31] max-w-[560px]">Todo proyecto empieza con una conversación y una visita al lugar. Elige el alcance que encaja hoy y amplíalo cuando el proyecto tome forma.</p>
            </div>
            <Link href="/contact" className="btn-arrow inline-flex items-center gap-2 bg-[#2b1f18] text-[#eeeae3] px-6 py-3.5 rounded-[4px] font-medium text-[15px] shrink-0">Reservar una primera llamada <span className="arr">↗</span></Link>
          </div>
        </Reveal>
        <div className="grid lg:grid-cols-3 gap-5">
          {scopes.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <article className="border border-[#cec5b8] p-8 flex flex-col min-h-[340px] hover:bg-[#ded7cc]/50 transition-colors h-full">
                <div className="flex justify-between items-baseline mb-8">
                  <span className="text-[14px] font-medium text-[#b83d1c]">{s.n}</span>
                  <span className="text-[13px] text-[#665b52]">{s.dur}</span>
                </div>
                <h3 className="text-[28px] font-light tracking-tight mb-4">{s.name}</h3>
                <p className="text-[15px] leading-relaxed text-[#4b3b31] mb-8">{s.text}</p>
                <div className="mt-auto">
                  <p className="label text-[#665b52] mb-2">Incluye</p>
                  <p className="text-[14px] mb-7">{s.includes}</p>
                  <Link href="/contact" className="link-line font-medium text-[15px]">Hablar de este alcance</Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
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
