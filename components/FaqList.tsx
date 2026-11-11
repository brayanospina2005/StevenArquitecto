"use client";

import { useState } from "react";

const faqs = [
  { q: "¿Qué servicios ofrece Bi Arq 1.0?", a: "Diseño de interiores, remodelación de apartamentos y de casas, diseño de cocinas y de baños, iluminación arquitectónica, mobiliario personalizado, renderizado 3D, supervisión de obra y asesoría en materiales." },
  { q: "¿Cómo es el proceso de trabajo?", a: "Reunión con el cliente, levantamiento del espacio, diseño 3D, selección de materiales, presupuesto, ejecución y entrega final." },
  { q: "¿Puedo ver mi proyecto antes de la obra?", a: "Sí. Con los renderizados 3D visualizas tu proyecto antes de hacerlo realidad, con imágenes realistas que te permiten tomar decisiones con confianza." },
  { q: "¿Qué materiales utilizan?", a: "Trabajamos con materiales de alta calidad y proveedores de confianza para garantizar acabados duraderos y sofisticados." },
  { q: "¿Por qué elegir Bi Arq 1.0?", a: "Diseños personalizados, materiales de alta calidad, acompañamiento completo, atención al detalle y entrega profesional." },
  { q: "¿Dónde están y cómo los contacto?", a: "Estamos en Bogotá, Colombia. Escríbenos a creacionesdeinterioresbiarq@gmail.com o llámanos al 319 282 0726. Instagram: @Biarq1.0. TikTok: @Bi.Arq.1.0." },
];

export default function FaqList() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      {faqs.map((f, i) => {
        const open = openFaq === i;
        return (
          <div key={f.q} className="border-t border-[#cec5b8]">
            <button onClick={() => setOpenFaq(open ? -1 : i)} className="w-full flex items-center justify-between gap-6 py-6 text-left" aria-expanded={open}>
              <span className="text-[19px] md:text-[21px] font-light">{f.q}</span>
              <span className={`text-[24px] font-light shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
            </button>
            <div className="grid transition-all duration-500" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="text-[15px] leading-relaxed text-[#4b3b31] max-w-[620px] pb-7">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
