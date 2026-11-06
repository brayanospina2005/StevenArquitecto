import Link from "next/link";
import { Reveal } from "./Reveal";

export default function SiteFooter() {
  return (
    <footer className="bg-[#2b1f18] text-[#eeeae3]">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 pt-20 md:pt-28 pb-8">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 border-b border-white/15">
            <div className="max-w-[720px]">
              <p className="label text-[#a89a8d] mb-5">Empezar un proyecto</p>
              <h2 className="display text-[40px] md:text-[56px]">¿Tienes un solar, una estructura o un boceto? Dibujemos la siguiente línea juntos.</h2>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link href="/contact" className="btn-arrow inline-flex items-center gap-2 bg-[#eeeae3] text-[#2b1f18] font-medium px-6 py-3.5 rounded-[4px] text-[15px]">
                Empezar un proyecto <span className="arr">↗</span>
              </Link>
              <a href="mailto:hola@biarq.com" className="link-line font-medium">hola@biarq.com</a>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 py-14 text-[15px]">
          <div>
            <p className="label text-[#a89a8d] mb-5">Estudios</p>
            <p className="mb-3 leading-relaxed">Lisboa, Rua das Flores 28,<br />1200-195</p>
            <p className="leading-relaxed">Copenhague, Bredgade 36,<br />1260</p>
          </div>
          <div>
            <p className="label text-[#a89a8d] mb-5">Contacto</p>
            <a href="mailto:hola@biarq.com" className="block mb-3 hover:text-white link-line w-fit">hola@biarq.com</a>
            <a href="tel:+351213405120" className="block hover:text-white link-line w-fit">+351 21 340 5120</a>
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
            {["Instagram", "LinkedIn", "Pinterest"].map((p) => (
              <a key={p} href="#" className="block mb-3 link-line w-fit">{p}</a>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-4 md:gap-6 select-none" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/datum/vW55VmO8YczY7gyuVCEY7bFmOg.svg" alt="" className="w-[clamp(36px,6vw,90px)] mt-[clamp(10px,2vw,28px)] invert opacity-90" />
          <span className="display font-medium leading-[0.85] tracking-[-0.045em] text-[clamp(42px,7vw,132px)]">Bi ARQ 1.0</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-3 pt-8 mt-4 border-t border-white/15 text-[13px] text-[#a89a8d]">
          <p>© 2026 Bi ARQ 1.0. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#eeeae3]">Política de privacidad</a>
            <a href="#" className="hover:text-[#eeeae3]">Términos de uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
