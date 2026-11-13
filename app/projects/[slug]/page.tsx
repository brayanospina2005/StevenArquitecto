import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Reveal, SlatsImage } from "@/components/Reveal";
import { GalleryProvider, OpenablePhoto } from "@/components/GalleryViewer";
import CompareSlider from "@/components/CompareSlider";
import { projects, IM } from "@/lib/data";
import { pageMeta, projectJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return { title: "Proyecto" };
  return pageMeta({
    title: p.name,
    description: `${p.summary} Remodelación de Bi Arq 1.0 en ${p.location}.`,
    path: `/projects/${p.slug}`,
    image: {
      url: `/og/apartamento-${p.index}.jpg`,
      width: 1200,
      height: 630,
      alt: `${p.name}, ${p.typology.toLowerCase()} en ${p.location}`,
    },
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = projects.findIndex((x) => x.slug === slug);
  if (idx === -1) notFound();
  const p = projects[idx];
  const next = projects[idx + 1];

  const story = [
    { n: "01", title: "El encargo", text: p.brief },
    { n: "02", title: "El enfoque", text: p.approach },
    { n: "03", title: "El resultado", text: p.outcome },
  ];
  const facts: [string, string][] = [
    ["Servicios", p.services], ["Proceso", "Reunión con el cliente, levantamiento del espacio, diseño 3D, selección de materiales, presupuesto, ejecución y entrega final"], ["Materiales", p.materials], ["Ubicación", p.location],
  ];

  return (
    <GalleryProvider name={p.name} images={[p.cover, ...p.gallery]}>
    <div className="mx-auto max-w-[1600px] px-5 md:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(p)) }} />
      {/* Hero */}
      <section className="pt-12 md:pt-16 pb-10">
        <Reveal>
          <div className="flex items-center justify-between mb-10">
            <Link href="/projects" className="link-line text-[14px] font-medium">← Todos los proyectos</Link>
            <div className="flex gap-6 text-[13px] text-[#665b52]"><span>{p.index}</span><span>{p.typology}</span></div>
          </div>
          <h1 className="display text-[clamp(44px,7.5vw,110px)] mb-6">{p.name}</h1>
          <p className="text-[20px] md:text-[24px] font-light leading-snug max-w-[640px] mb-12">{p.summary}</p>
          <dl className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-[#cec5b8]">
            {[["Lugar", p.location], ["Tipo", p.typology], ["Estado", "Terminado"], ["Galería", `${p.gallery.length + 1} fotos`]].map(([k, v]) => (
              <div key={k} className="py-5 pr-6">
                <dt className="text-[12px] uppercase tracking-wide text-[#665b52]">{k}</dt>
                <dd className="font-medium mt-1.5">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <OpenablePhoto index={0} src={p.cover} alt={p.name} ratio="aspect-[16/9]" sizes="100vw" priority />

      {/* Story */}
      <section className="grid lg:grid-cols-12 gap-10 py-20 md:py-28">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <Reveal>
              <p className="label text-[#665b52] mb-6">Ficha</p>
              <dl>
                {facts.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[110px_1fr] gap-4 py-4 border-t border-[#cec5b8] text-[14px]">
                    <dt className="text-[#665b52]">{k}</dt><dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </aside>
        <div className="lg:col-span-8">
          {story.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <article className="grid md:grid-cols-[80px_1fr] gap-4 py-10 border-t border-[#cec5b8]">
                <span className="text-[14px] font-medium text-[#b83d1c]">{s.n}</span>
                <div className="md:pl-16">
                  <h2 className="display text-[32px] md:text-[40px] mb-4">{s.title}</h2>
                  <p className="text-[17px] leading-relaxed text-[#4b3b31] max-w-[560px]">{s.text}</p>
                </div>
              </article>
            </Reveal>
          ))}

          {/* Gallery */}
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            <OpenablePhoto index={1} src={p.gallery[0]} alt={`Galería de ${p.name}`} ratio="aspect-[3/4]" />
            <div className="md:pt-24"><OpenablePhoto index={2} src={p.gallery[1]} alt={`Galería de ${p.name}`} ratio="aspect-square" /></div>
          </div>
          <div className="mt-5"><OpenablePhoto index={3} src={p.gallery[2]} alt={`Galería de ${p.name}`} ratio="aspect-[16/9]" /></div>
          <div className="grid md:grid-cols-2 gap-5 mt-5">
            <OpenablePhoto index={4} src={p.gallery[3]} alt={`Galería de ${p.name}`} ratio="aspect-[16/10]" />
            <OpenablePhoto index={5} src={p.gallery[4]} alt={`Galería de ${p.name}`} ratio="aspect-[16/10]" />
          </div>
          {p.gallery.length > 5 && (
            <div className="grid md:grid-cols-2 gap-5 mt-5">
              {p.gallery.slice(5).map((src, i) => (
                <OpenablePhoto key={src} index={6 + i} src={src} alt={`Galería de ${p.name}`} ratio="aspect-[3/4]" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Drawing to built */}
      <section className="py-16 md:py-24 border-t border-[#cec5b8]">
        <Reveal>
          <p className="label text-[#665b52] mb-4">Renderizados 3D</p>
          <h2 className="display text-[36px] md:text-[48px] mb-10">Visualiza tu proyecto antes de hacerlo realidad.</h2>
        </Reveal>
        <CompareSlider drawing={IM.drawing} built={p.gallery[2]} caption={`${p.name}, ${p.location}`} />
      </section>

      {/* Next project */}
      {next && (
        <section className="py-16 md:py-24 border-t border-[#cec5b8]">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
            <p className="label text-[#665b52]">Siguiente proyecto</p>
            <Link href="/projects" className="btn-arrow inline-flex items-center gap-2 border border-[#2b1f18] px-5 py-3 rounded-[4px] text-[14px] font-medium hover:bg-[#2b1f18] hover:text-[#eeeae3]">Todos los proyectos <span className="arr">↗</span></Link>
          </div>
          <Link href={`/projects/${next.slug}`} className="group grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="display text-[clamp(40px,6vw,84px)] group-hover:translate-x-2 transition-transform mb-8">{next.name}</h2>
              <dl className="grid grid-cols-3 gap-6 text-[14px] max-w-[480px] mb-8">
                {[["Tipo", next.typology], ["Lugar", next.location], ["Galería", `${next.gallery.length + 1} fotos`]].map(([k, v]) => (
                  <div key={k}><dt className="text-[#665b52] text-[12px] uppercase tracking-wide">{k}</dt><dd className="font-medium mt-1">{v}</dd></div>
                ))}
              </dl>
              <span className="btn-arrow inline-flex items-center gap-2 bg-[#2b1f18] text-[#eeeae3] px-5 py-3 rounded-[4px] text-[14px] font-medium">Ver proyecto <span className="arr">↗</span></span>
            </div>
            <SlatsImage src={next.cover} alt={next.name} ratio="aspect-[4/3]" />
          </Link>
        </section>
      )}
      {!next && (
        <section className="py-16 border-t border-[#cec5b8]">
          <Link href="/projects" className="btn-arrow inline-flex items-center gap-2 bg-[#2b1f18] text-[#eeeae3] px-6 py-3.5 rounded-[4px] font-medium">Todos los proyectos <span className="arr">↗</span></Link>
        </section>
      )}
    </div>
    </GalleryProvider>
  );
}
