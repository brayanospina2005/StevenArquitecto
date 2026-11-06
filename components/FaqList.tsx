"use client";

import { useState } from "react";

const faqs = [
  { q: "¿Cuánto cuesta un proyecto?", a: "Nuestros honorarios suelen ser del 10 al 15 por ciento del coste de obra en el servicio completo, y una tarifa fija para interiores y consultas. Compartimos un presupuesto claro después de la primera visita." },
  { q: "¿Trabajáis fuera de Portugal y Dinamarca?", a: "Sí, de forma selectiva. La mayor parte del trabajo está cerca de los dos estudios, pero aceptamos unos pocos proyectos en otros lugares de Europa cuando podemos visitar la obra con regularidad." },
  { q: "¿Podéis trabajar con nuestro constructor?", a: "Sí. A menudo trabajamos con el constructor del cliente y estamos en obra cada semana para revisar juntos detalles, muestras y presupuesto." },
  { q: "¿Cuánto tarda la licencia?", a: "Depende del municipio. En Lisboa y Copenhague una solicitud sencilla suele tardar de tres a seis meses; te damos un plazo realista después de la fase de concepto." },
  { q: "¿Qué necesitáis de nosotros para empezar?", a: "Un solar o un edificio, y una conversación. Trae los planos, las fotos o las referencias que tengas: la primera visita es gratuita y no hay un mal lugar por donde empezar." },
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
