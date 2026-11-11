import Link from "next/link";
import { Reveal } from "./Reveal";
import { site } from "@/lib/data";

export default function SiteFooter() {
  return (
    <footer className="bg-[#2b1f18] text-[#eeeae3]">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 pt-20 md:pt-28 pb-8">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 border-b border-white/15">
            <div className="max-w-[720px]">
              <p className="label text-[#a89a8d] mb-5">Empezar un proyecto</p>
              <h2 className="display text-[40px] md:text-[56px]">Transformemos tu espacio y mejoremos tu calidad de vida.</h2>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link href="/contact" className="btn-arrow inline-flex items-center gap-2 bg-[#eeeae3] text-[#2b1f18] font-medium px-6 py-3.5 rounded-[4px] text-[15px]">
                Empezar un proyecto <span className="arr">↗</span>
              </Link>
              <a href={`mailto:${site.email}`} className="link-line font-medium break-all">{site.email}</a>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 py-14 text-[15px]">
          <div>
            <p className="label text-[#a89a8d] mb-5">Dónde estamos</p>
            <p className="mb-3 leading-relaxed">{site.city}</p>
            <p className="leading-relaxed">{site.tagline}</p>
          </div>
          <div>
            <p className="label text-[#a89a8d] mb-5">Contacto</p>
            <a href={`mailto:${site.email}`} className="block mb-3 hover:text-white link-line w-fit break-all">{site.email}</a>
            <a href={site.phoneHref} className="block hover:text-white link-line w-fit">{site.phoneIntl}</a>
          </div>
          <div>
            <p className="label text-[#a89a8d] mb-5">Páginas</p>
            {[
              ["/projects", "Proyectos"],
              ["/studio", "Estudio"],
              ["/services", "Servicios"],
              ["/contact", "Contacto"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="block mb-3 link-line w-fit">{label}</Link>
            ))}
          </div>
          <div>
            <p className="label text-[#a89a8d] mb-5">Síguenos</p>
            <a href={site.instagram} target="_blank" rel="noreferrer" className="block mb-3 link-line w-fit">Instagram @{site.instagramHandle}</a>
            <a href={site.tiktok} target="_blank" rel="noreferrer" className="block mb-3 link-line w-fit">TikTok @{site.tiktokHandle}</a>
            <a href={site.whatsapp} target="_blank" rel="noreferrer" className="block link-line w-fit">WhatsApp {site.phoneDisplay}</a>
          </div>
        </div>

        <div className="flex items-start gap-4 md:gap-6 select-none" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-light.webp" alt="" width={167} height={137} loading="lazy" decoding="async" className="w-[clamp(72px,10vw,160px)] h-auto mt-[clamp(8px,1.5vw,20px)]" />
          <span className="display font-medium leading-[0.85] tracking-[-0.045em] text-[clamp(42px,7vw,132px)]">Bi Arq 1.0</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-3 pt-8 mt-4 border-t border-white/15 text-[13px] text-[#a89a8d]">
          <p>© 2026 Bi Arq 1.0. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#eeeae3]">Política de privacidad</a>
            <a href="#" className="hover:text-[#eeeae3]">Términos de uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
