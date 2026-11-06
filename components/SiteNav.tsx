"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Proyectos" },
  { href: "/studio", label: "Estudio" },
  { href: "/services", label: "Servicios" },
  { href: "/contact", label: "Contacto" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open ]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#eeeae3] border-b border-[#cec5b8]">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 h-[72px] flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Inicio de Bi ARQ 1.0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.webp" alt="" width={167} height={137} className="h-10 w-auto" />
            <span className="text-[18px] md:text-[20px] font-medium tracking-tight text-[#1c1714] leading-none">Bi ARQ 1.0</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => (
              <Link key={l.href} href={l.href} data-active={pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href))}
                className="link-line text-[15px] font-medium text-[#1c1714]">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn-arrow hidden sm:inline-flex items-center gap-2 bg-[#2b1f18] text-[#eeeae3] text-[15px] font-medium h-12 px-5 rounded-[4px]">
              Empezar un proyecto <span className="arr">↗</span>
            </Link>
            <button onClick={() => setOpen(!open)} aria-label="Abrir menú" className="md:hidden flex items-center gap-2 text-[14px] font-medium">
              {open ? "Cerrar" : "Menú"}
              <span className="flex flex-col gap-[5px] w-5">
                <span className={`h-px bg-[#1c1714] transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
                <span className={`h-px bg-[#1c1714] transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 bg-[#2b1f18] text-[#eeeae3] flex flex-col justify-between pt-28 px-6 pb-8 transition-all duration-500 md:hidden ${open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <nav className="flex flex-col gap-2">
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} className="display text-[52px] border-b border-white/15 pb-3 flex justify-between items-baseline">
              {l.label}<span className="text-[13px] text-[#a89a8d]">0{i + 1}</span>
            </Link>
          ))}
        </nav>
        <div>
          <Link href="/contact" className="flex items-center justify-center gap-2 bg-[#eeeae3] text-[#2b1f18] font-medium py-4 rounded-[4px] mb-5">Empezar un proyecto ↗</Link>
          <div className="flex justify-between text-[13px] text-[#a89a8d]">
            <a href="mailto:hola@biarq.com">hola@biarq.com</a>
            <a href="tel:+351213405120">+351 21 340 5120</a>
          </div>
        </div>
      </div>
      <div className="h-[72px]" />
    </>
  );
}
