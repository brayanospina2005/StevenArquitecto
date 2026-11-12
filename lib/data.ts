export const site = {
  name: "Bi Arq 1.0",
  tagline: "Diseño – Arquitectura – Remodelación",
  headline: "Remodelaciones de interiores",
  email: "biarqceo@gmail.com",
  phoneDisplay: "319 282 0726",
  phoneIntl: "+57 319 282 0726",
  phoneHref: "tel:+573192820726",
  whatsapp: "https://wa.me/573192820726",
  city: "Bogotá, Colombia",
  instagramHandle: "Biarq1.0",
  instagram: "https://www.instagram.com/biarq1.0/",
  tiktokHandle: "Bi.Arq.1.0",
  tiktok: "https://www.tiktok.com/@bi.arq.1.0",
  history:
    "Bi Arq 1.0 nace con la pasión de transformar espacios y mejorar la calidad de vida de las personas a través del diseño interior. Combinamos creatividad, funcionalidad y materialidad de alta calidad para crear ambientes únicos y atemporales.",
  philosophy:
    "Creemos que cada espacio tiene el potencial de inspirar. Diseñamos con propósito, cuidando cada detalle para lograr ambientes que reflejen tu estilo, necesidades y personalidad.",
  materialsText:
    "Trabajamos con materiales de alta calidad y proveedores de confianza para garantizar acabados duraderos y sofisticados.",
};

export const processSteps = [
  "Reunión con el cliente",
  "Levantamiento del espacio",
  "Diseño 3D",
  "Selección de materiales",
  "Presupuesto",
  "Ejecución",
  "Entrega final",
];

export const whyUs = [
  "Diseños personalizados",
  "Materiales de alta calidad",
  "Acompañamiento completo",
  "Atención al detalle",
  "Entrega profesional",
];

export const serviceNames = [
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

export const faqs = [
  { q: "¿Qué servicios ofrece Bi Arq 1.0?", a: "Diseño de interiores, remodelación de apartamentos y de casas, diseño de cocinas y de baños, iluminación arquitectónica, mobiliario personalizado, renderizado 3D, supervisión de obra y asesoría en materiales." },
  { q: "¿Cómo es el proceso de trabajo?", a: "Reunión con el cliente, levantamiento del espacio, diseño 3D, selección de materiales, presupuesto, ejecución y entrega final." },
  { q: "¿Puedo ver mi proyecto antes de la obra?", a: "Sí. Con los renderizados 3D visualizas tu proyecto antes de hacerlo realidad, con imágenes realistas que te permiten tomar decisiones con confianza." },
  { q: "¿Cuánto cuesta remodelar un apartamento?", a: "Cada proyecto es distinto: la inversión depende del tamaño del espacio, de los ambientes a intervenir y de los materiales elegidos. Por eso el proceso incluye el levantamiento del espacio y la selección de materiales antes del presupuesto, para que conozcas el costo con el diseño ya definido y sin sorpresas." },
  { q: "¿Cuánto tiempo toma una remodelación?", a: "Depende del alcance del proyecto y de los ambientes a intervenir. Antes de ejecutar definimos contigo el plan de trabajo y los tiempos de cada etapa, y te acompañamos durante toda la obra hasta la entrega final." },
  { q: "¿También diseñan oficinas?", a: "Sí. Diseñamos oficinas funcionales y modernas que mejoran la productividad y reflejan la identidad de tu marca." },
  { q: "¿Qué materiales utilizan?", a: "Trabajamos con materiales de alta calidad y proveedores de confianza para garantizar acabados duraderos y sofisticados." },
  { q: "¿Por qué elegir Bi Arq 1.0?", a: "Diseños personalizados, materiales de alta calidad, acompañamiento completo, atención al detalle y entrega profesional." },
  { q: "¿Cómo empiezo mi proyecto?", a: "Escríbenos por correo o WhatsApp y agendamos la reunión inicial. Ahí escuchamos tus ideas, hacemos el levantamiento del espacio y empezamos el diseño 3D de tu proyecto." },
  { q: "¿Dónde están y cómo los contacto?", a: "Estamos en Bogotá, Colombia. Escríbenos a biarqceo@gmail.com o llámanos al 319 282 0726. Instagram: @Biarq1.0. TikTok: @Bi.Arq.1.0." },
];

export type Project = {
  slug: string; index: string; name: string; location: string;
  typology: string; summary: string; cover: string;
  services: string; materials: string;
  brief: string; approach: string; outcome: string; gallery: string[];
};

const img = (id: string) => `/datum/${id}.jpg`;

const processText =
  "El trabajo siguió el proceso de Bi Arq 1.0: reunión con el cliente, levantamiento del espacio, diseño 3D, selección de materiales y presupuesto, antes de la ejecución y la entrega final.";
const outcomeText =
  "Diseños personalizados, materiales de alta calidad, acompañamiento completo, atención al detalle y una entrega profesional, para lograr un ambiente que refleja el estilo, las necesidades y la personalidad de quien lo habita.";

export const projects: Project[] = [
  {
    slug: "remodelacion-apartamento-01", index: "01", name: "Apartamento 01", location: "Bogotá, Colombia", typology: "Remodelación de apartamento",
    summary: "Remodelación integral de apartamento: sala, cocina, baño y habitación renovados con materiales de alta calidad.",
    cover: "/projects/01/05.webp", services: "Diseño de interiores, diseño de cocinas, diseño de baños, habitaciones, iluminación arquitectónica, mobiliario personalizado", materials: "Materiales de alta calidad, de proveedores de confianza",
    brief: "El proyecto reúne los espacios principales de la vivienda: la sala, la cocina, el baño y la habitación, además del registro del antes y el después de la obra.",
    approach: processText,
    outcome: outcomeText,
    gallery: ["01", "03", "09", "02", "12", "13", "04", "06", "07", "08", "10", "11"].map((n) => `/projects/01/${n}.webp`),
  },
  {
    slug: "remodelacion-apartamento-02", index: "02", name: "Apartamento 02", location: "Bogotá, Colombia", typology: "Remodelación de apartamento",
    summary: "Cocina abierta, closets y mobiliario a medida, habitación y baño, dentro de una remodelación integral de apartamento.",
    cover: "/projects/02/07.webp", services: "Diseño de interiores, diseño de cocinas, diseño de baños, mobiliario personalizado, iluminación arquitectónica", materials: "Materiales de alta calidad, de proveedores de confianza",
    brief: "La cocina abierta, los closets, la habitación y el baño son los espacios centrales de esta remodelación, junto al registro del estado anterior del apartamento.",
    approach: processText,
    outcome: outcomeText,
    gallery: ["09", "01", "04", "08", "03", "02", "05", "06", "10"].map((n) => `/projects/02/${n}.webp`),
  },
  {
    slug: "remodelacion-apartamento-03", index: "03", name: "Apartamento 03", location: "Bogotá, Colombia", typology: "Remodelación de apartamento",
    summary: "Sala y espacios sociales, habitación y baño renovados, con el antes y el después de cada ambiente.",
    cover: "/projects/03/08.webp", services: "Diseño de interiores, salas y espacios sociales, habitaciones, diseño de baños, iluminación arquitectónica", materials: "Materiales de alta calidad, de proveedores de confianza",
    brief: "La sala y los espacios sociales, la habitación y el baño concentran esta remodelación, documentada desde el estado original hasta la entrega final.",
    approach: processText,
    outcome: outcomeText,
    gallery: ["10", "17", "01", "12", "07", "04", "06", "09", "11", "02", "03", "05", "13", "14", "15", "16", "18", "19"].map((n) => `/projects/03/${n}.webp`),
  },
];

export const materialSwatches = [
  img("2SRlbAxNNMZUaEHv2gZVcynM5N8"),
  img("5YlJqBkqvCFw2pEUWjgQlO54I"),
  img("D2roZsMPZ4u7JSEbXS6ly7zDV9A"),
  img("jnQWjpLXWeI5g98EvUCe7gqeZsE"),
  img("PVC6uKpy1gN2kfQ0Jr3o8TE3ZBs"),
  img("achgaJDx7zT8qc3VpH3NlbCDP7E"),
  img("soqp5n9WB9cDt Zigb4CciQxHPc"),
  img("N2ScD11fLkhgQI1XwiNYwVJJkI"),
];

export const IM = {
  hero: img("Z3Aia30Ln4si3eQRw85PtMgplA"),
  studioIntro: img("mvVm5NMMz7mstuk48Q6bawc8w"),
  drawing: img("aQPu8ahRVC4pmulufbrT9qpGIU"),
  built: img("5RrNzUnEg10vGKxm5AvfWLvRlZE"),
  process: img("xTqAEw6ptJPPosL9Z6UVYWARZTc"),
  contactStudio: img("QxPDju5tuAc8Whf0iTS60QrAI4"),
  studioHero: img("wIcXIdDxZE7BOsD52RNa6CKL2WY"),
  lightStages: [
    img("xTqAEw6ptJPPosL9Z6UVYWARZTc"),
    img("Pq0a4Ss1p8LsbqpiovXlxIKQ"),
    img("mLWr4P3AyFpkGBRTJ5KLCi7Q6dI"),
    img("w6IPGtI8bSTouqYEk17QeIxSWPY"),
  ],
  services: [
    img("J6eTsIuGz2JZkYZ8qwCrtXHfZN0"),
    img("65tnBgRRtkeHQXPEiqHL1g27RoY"),
    img("HwJMSVcJQeYNRXkdmBO3exrDdjA"),
    img("jRpSZJW2TniR3X7OcXyZzAfArnc"),
  ],
};
