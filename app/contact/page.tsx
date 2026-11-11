"use client";
import { useState } from "react";
import { Reveal, SlatsImage } from "@/components/Reveal";
import { site, IM } from "@/lib/data";

const types = ["Diseño de interiores", "Remodelación de apartamento", "Remodelación de casa", "Diseño de cocina", "Diseño de baño", "Oficinas", "Renderizado 3D", "Otro"];

function Chips({ options, value, onChange, label }: { options: string[]; value: string; onChange: (v: string) => void; label: string }) {
  return (
    <fieldset>
      <legend className="text-[13px] font-medium text-[#665b52] mb-3">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button type="button" key={o} onClick={() => onChange(o)} aria-pressed={value === o}
            className={`px-4 py-2 rounded-full border text-[13px] font-medium transition-colors ${value === o ? "bg-[#2b1f18] text-[#eeeae3] border-[#2b1f18]" : "border-[#cec5b8] hover:border-[#2b1f18]"}`}>
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

const inputCls = "w-full bg-transparent border border-[#cec5b8] rounded-[4px] px-4 py-3.5 text-[15px] placeholder:text-[#a89a8d] transition-colors";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", location: "", message: "" });
  const [type, setType] = useState(types[0]);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { setError(true); return; }
    setError(false); setSent(true);
  };

  return (
    <div className="mx-auto max-w-[1600px] px-5 md:px-10">
      <section className="py-16 md:py-24">
        <Reveal>
          <p className="label text-[#665b52] mb-5">Empezar un proyecto</p>
          <h1 className="display text-[clamp(42px,7vw,100px)] mb-8 max-w-[900px]">Cuéntanos tu espacio.</h1>
          <p className="text-[18px] leading-relaxed text-[#4b3b31] max-w-[620px]">
            Todo empieza con una reunión con el cliente. {site.philosophy}
          </p>
        </Reveal>
      </section>

      <div className="grid lg:grid-cols-12 gap-12 pb-24">
        <div className="lg:col-span-5">
          <Reveal>
            <dl className="mb-10">
              {[
                ["Correo", <a key="e" href={`mailto:${site.email}`} className="link-line font-medium break-all">{site.email}</a>],
                ["Teléfono", <a key="p" href={site.phoneHref} className="link-line">{site.phoneIntl}</a>],
                ["WhatsApp", <a key="w" href={site.whatsapp} target="_blank" rel="noreferrer" className="link-line">{site.phoneDisplay}</a>],
                ["Instagram", <a key="i" href={site.instagram} target="_blank" rel="noreferrer" className="link-line">@{site.instagramHandle}</a>],
                ["TikTok", <a key="t" href={site.tiktok} target="_blank" rel="noreferrer" className="link-line">@{site.tiktokHandle}</a>],
                ["Ciudad", site.city],
              ].map(([k, v]) => (
                <div key={k as string} className="grid grid-cols-[120px_1fr] gap-4 py-4 border-t border-[#cec5b8] text-[15px]">
                  <dt className="text-[#665b52]">{k}</dt><dd>{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1}>
            <SlatsImage src={IM.contactStudio} alt="Bi Arq 1.0 en Bogotá, Colombia" ratio="aspect-[4/3]" />
            <p className="text-[13px] text-[#665b52] pt-4">Bi Arq 1.0, {site.city}. {site.tagline}.</p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            {sent ? (
              <div className="border border-[#cec5b8] bg-[#ded7cc]/50 p-10 md:p-14">
                <p className="label text-[#b83d1c] mb-4">Consulta de proyecto</p>
                <h2 className="display text-[36px] md:text-[44px] mb-4">Gracias, {form.name.split(" ")[0]}.</h2>
                <p className="text-[16px] text-[#4b3b31] max-w-[480px]">Tenemos tu consulta sobre {type.toLowerCase()}. También puedes escribirnos a {site.email} o llamarnos al {site.phoneIntl}.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="border border-[#cec5b8] p-6 md:p-10">
                <h2 className="text-[24px] font-light tracking-tight mb-8">Consulta de proyecto</h2>
                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  <label className="block">
                    <span className="text-[13px] font-medium text-[#665b52] block mb-2">Nombre *</span>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Tu nombre" />
                  </label>
                  <label className="block">
                    <span className="text-[13px] font-medium text-[#665b52] block mb-2">Correo *</span>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="tu@correo.com" />
                  </label>
                  <label className="block">
                    <span className="text-[13px] font-medium text-[#665b52] block mb-2">Teléfono</span>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} placeholder="+57 …" />
                  </label>
                  <label className="block">
                    <span className="text-[13px] font-medium text-[#665b52] block mb-2">Lugar del proyecto</span>
                    <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputCls} placeholder="Bogotá, Colombia" />
                  </label>
                </div>
                <div className="space-y-7 mb-7">
                  <Chips label="Tipo de proyecto" options={types} value={type} onChange={setType} />
                </div>
                <label className="block mb-6">
                  <span className="text-[13px] font-medium text-[#665b52] block mb-2">Mensaje *</span>
                  <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputCls} placeholder="Cuéntanos tu espacio, tu estilo y lo que necesitas…" />
                </label>
                {error && <p className="text-[14px] text-[#b83d1c] mb-4">Completa los campos obligatorios</p>}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="text-[12px] text-[#665b52] max-w-[340px]">Solo usamos tus datos para responderte. Lee nuestra política de privacidad.</p>
                  <button type="submit" className="btn-arrow inline-flex items-center gap-2 bg-[#2b1f18] text-[#eeeae3] px-7 py-3.5 rounded-[4px] font-medium text-[15px]">
                    Empezar un proyecto <span className="arr">↗</span>
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
