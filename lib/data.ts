export type Project = {
  slug: string; index: string; name: string; location: string; year: string;
  typology: string; area: string; summary: string; cover: string;
  client: string; duration: string; team: string; materials: string;
  brief: string; approach: string; outcome: string; gallery: string[];
};

const img = (id: string) => `/datum/${id}.jpg`;

export const projects: Project[] = [
  {
    slug: "casa-alba-residence", index: "01", name: "Casa Alba", location: "Comporta, Portugal", year: "2025", typology: "Residencial", area: "380 m²",
    summary: "Una casa patio de cal y madera, organizada alrededor de un olivo viejo y de la luz de la tarde.",
    cover: img("4GFMP8H0lezltVYJVf2TFHOAxtk"), client: "Cliente particular", duration: "26 meses", team: "Arquitectura, interiores, paisaje", materials: "Cal, roble claro, arenisca local, latón sin lacar",
    brief: "Una familia de Lisboa quería una casa de fin de semana serena en el calor de agosto y cálida con la lluvia de enero, construida alrededor del olivo que ya estaba en la parcela.",
    approach: "Cerramos cuatro alas bajas en torno a un patio para que cada estancia mire al árbol. Los muros gruesos de cal guardan el fresco de la noche y los aleros profundos apartan el sol de verano del vidrio.",
    outcome: "La casa no necesita aire acondicionado en verano. Las estancias siguen el recorrido del sol: el desayuno mira al este y el estar recoge la última luz sobre el patio.",
    gallery: [img("thgPiyc9aDZuExMX1gnX00Es"), img("Q7ybXH0179hf7U6Lnz911sEyM"), img("yrMW3at7r3KujLNiYS6E5VXgY"), img("iLmJExTdy69xJbhUUK177hl7bpw"), img("rGKcfaYbVd3vOEaxTHovTAkDQw")],
  },
  {
    slug: "hotel-mira", index: "02", name: "Hotel Mira", location: "Lisboa, Portugal", year: "2025", typology: "Hostelería", area: "3.600 m²",
    summary: "Un hotel de 42 habitaciones en una casa restaurada, con travertino, roble y arcos en todo el edificio.",
    cover: img("2WMXXYZwCaddKvxvAdpBbqXVzuo"), client: "Mira Hospitality", duration: "34 meses", team: "Arquitectura, interiores, mobiliario", materials: "Travertino, roble, estuco de cal, latón, lana",
    brief: "Convertir una casa del siglo XIX, cansada, en el Chiado, en un hotel de 42 habitaciones sin perder la escalera, los techos ni la sensación de una casa privada.",
    approach: "Conservamos la escalera de piedra original como espina del edificio y dispusimos las habitaciones a su alrededor, en travertino y roble. Las salas de la planta baja se abren por completo a la calle cuando hace buen tiempo.",
    outcome: "Los huéspedes lo describen como quedarse en casa de un amigo. Los techos y la escalera restaurados sostienen la identidad del hotel, y las piezas nuevas se quedan en segundo plano.",
    gallery: [img("ntKfPBlF1FOwCbbcqd9I8nbHM"), img("fp8WRchs1VrByGqvyRN6yhJzju4"), img("ARhRqkoefynzJSDW8XbSOs9I"), img("DTd16pqUOvUrGioi62zj8WTqXM"), img("9AQSdCMAZs3p3qhcE7Hg1Nz9Ww")],
  },
  {
    slug: "nord-workplace", index: "03", name: "Oficinas Nord", location: "Oslo, Noruega", year: "2024", typology: "Oficinas", area: "1.250 m²",
    summary: "Un lugar de trabajo para 90 personas, organizado alrededor de la luz natural, las mesas compartidas y los rincones en silencio.",
    cover: img("xMaFjmN8EGw861xrHx1J8XesuI"), client: "Nord Collective", duration: "18 meses", team: "Interiores, mobiliario, iluminación", materials: "Roble, hormigón visto, fieltro de lana, acero",
    brief: "Un estudio de diseño en crecimiento necesitaba una planta para 90 personas que sirviera para el trabajo concentrado, los talleres ruidosos y las cenas del viernes.",
    approach: "Dividimos la planta por el ruido, no por departamentos. Las mesas compartidas van junto a las ventanas, las salas silenciosas se revisten de fieltro y una mesa larga de cocina, en el centro, es la sala de reuniones casi todos los días.",
    outcome: "Las reservas de salas bajaron a la mitad porque los equipos se reúnen en la mesa larga. La planta funciona con luz natural la mayor parte del año.",
    gallery: [img("e8XwIXC7dv0V0uECnVP6nK1c"), img("sToWhM6wZkfXSXESXn3kXRt0fzQ"), img("Flm4bqKPEfbLxzH1NPkmiHyoZbQ"), img("PhMD98ZTjhalPR87el1hzAxcR2A"), img("3eL98fHU1lCEnEr99JnpjSxG0")],
  },
  {
    slug: "linen-apartment", index: "04", name: "Apartamento Linen", location: "Copenhague, Dinamarca", year: "2023", typology: "Interiores", area: "240 m²",
    summary: "Un interior completo para un piso familiar, vestido de lino, roble claro y cal.",
    cover: img("HNXY7bV4B87atGSVLHu1fwKZw8k"), client: "Cliente particular", duration: "11 meses", team: "Interiores, carpintería", materials: "Roble claro, lino, cal, terrazo",
    brief: "Poner orden y luz en un piso de los años treinta para una familia de cuatro, con sitio para todo y sin desorden a la vista.",
    approach: "Dibujamos primero cada muro de carpintería y después las estancias. Los armarios de roble de suelo a techo esconden el almacenaje, las puertas e incluso la lavandería, para que las habitaciones puedan quedarse casi vacías.",
    outcome: "El piso se siente más grande que sus 240 metros cuadrados. Las cortinas de lino y el roble claro suavizan la luz de las ventanas al norte.",
    gallery: [img("Jx1L2nHXx1ivUsvB0YUoVjrQM"), img("jsxTQzKHZlxhQyVaGq7gCpcmRIc"), img("bEmnJZtG8ZrRaYByVC1DSnl32A"), img("bf0XapLRuHs3XfA2RxOwd14PzM0"), img("2HY1HsJlDY18NQVx4Qw8apCkU")],
  },
  {
    slug: "ora-pavilion", index: "05", name: "Pabellón Ora", location: "Aarhus, Dinamarca", year: "2022", typology: "Cultural", area: "95 m²",
    summary: "Un pabellón pequeño de madera para lecturas y encuentros tranquilos en un jardín público.",
    cover: img("A43FGN4hRQTP7KAYuAGranMQys"), client: "Municipio de Aarhus", duration: "9 meses", team: "Arquitectura, paisaje", materials: "Alerce, hormigón, acero",
    brief: "Un pabellón público pequeño para lecturas, música y tardes tranquilas en un jardín de la ciudad, abierto a todos y fácil de mantener.",
    approach: "Una cubierta de madera sobre pilares esbeltos, abierta por tres lados, con un único muro cerrado para el escenario. El suelo baja con suavidad para que la gente pueda sentarse en los bordes.",
    outcome: "El pabellón acoge más de 200 eventos al año y se usa cada día por quien solo busca sentarse a resguardo de la lluvia.",
    gallery: [img("Xvk1P3MVo3fhz4opz2RpuLtU0Yo"), img("vbMKvdgQyXSnxsT01atiUaXx6U8"), img("daDt4U3TkWkbUddM9aHvClzTg"), img("WVzD780BT5I8c9F26I1Elj6lqVc"), img("OqG352TCkjD7wnWqglsRVex2s")],
  },
  {
    slug: "rue-bistro", index: "06", name: "Rue Bistro", location: "París, Francia", year: "2021", typology: "Hostelería", area: "180 m²",
    summary: "Un restaurante de barrio con suelo de terrazo, un banco curvo de cuero óxido y una luz baja y cálida.",
    cover: img("WWq2Gz50VmkObQQV2os6fumFvw"), client: "Rue Restaurant Group", duration: "7 meses", team: "Interiores, iluminación, mobiliario", materials: "Terrazo, roble, cuero óxido, yeso acústico, latón",
    brief: "Un bistró de barrio para 60 comensales, en un local estrecho de París, que debía sentirse generoso, cálido y nunca ruidoso.",
    approach: "Un banco largo y curvo de cuero óxido, sobre un zócalo de roble, recorre la sala. El suelo es de terrazo y el techo, de yeso acústico. La luz queda baja, sobre las mesas, y el techo permanece oscuro.",
    outcome: "La sala sienta a más gente que antes y es más silenciosa. Casi todas las noches están reservadas con dos semanas de antelación.",
    gallery: [img("dQc6JL1ZnSrTRFXw9kzPoia6I"), img("gznkS4QS3gpejIyykbbA3Zk6Ns"), img("fXNvJKHwkUBEatuFzUtoGulR8jQ"), img("nyBOqoSN9UFmh3oGXXZs7OtPsI"), img("jE2yMGoClXW14OfJRdhv9KZkU")],
  },
  {
    slug: "rift-cliff-house", index: "07", name: "Casa Rift", location: "Madeira, Portugal", year: "2020", typology: "Residencial", area: "310 m²",
    summary: "Una casa de hormigón que se asoma al Atlántico, con todas las estancias mirando al horizonte.",
    cover: img("W64rFGfiV4QnMccVm9O6GdWJUW0"), client: "Cliente particular", duration: "30 meses", team: "Arquitectura, interiores, ingeniería", materials: "Hormigón encofrado con tabla, roble, basalto local",
    brief: "Una casa en un acantilado empinado sobre el Atlántico, capaz de resistir el viento y la sal, y de abrir cada estancia al horizonte.",
    approach: "La casa es un único volumen de hormigón anclado a la roca, con un voladizo largo sobre la pendiente. Las ventanas quedan profundas en el muro para protegerse del tiempo.",
    outcome: "Desde cada estancia la única vista es el mar. El hormigón ha tomado el color del acantilado que lo rodea.",
    gallery: [img("nBnEN6DvhWzqRUMuWqhZJKjmXE"), img("uDnTaznHApyb1DiPJHWLDhOTfXs"), img("WcueXGIHJOchj58UF8RQ7YNSc"), img("aVA88c4wFmOQMeXSPQ1MXykk"), img("4jqvPLUdtiGTDkhTfwMvnnDOms")],
  },
  {
    slug: "sol-gallery", index: "08", name: "Galería Sol", location: "Amberes, Bélgica", year: "2019", typology: "Comercio", area: "420 m²",
    summary: "Una antigua sala de imprenta convertida en galería y tienda, iluminada desde arriba por un lucernario largo.",
    cover: img("n6WnlYw66RfcddIwT0JxpPuQYoI"), client: "Galería Sol", duration: "10 meses", team: "Arquitectura, interiores, iluminación", materials: "Estuco de cal, hormigón, roble, vidrio",
    brief: "Convertir una antigua sala de imprenta en una galería y tienda donde la obra se ilumine con luz natural, no con focos.",
    approach: "Abrimos un lucernario largo a lo largo de la cubierta y pintamos la sala con estuco de cal cálido. Los plintos de yeso y los muros móviles permiten cambiar la galería en cada exposición.",
    outcome: "La mayoría de las muestras se cuelgan de día sin luz artificial. La tienda cubre los gastos de funcionamiento del edificio.",
    gallery: [img("C9D3MKZKDdGNf70jHB7qE6AY"), img("i8m1sdaLRNHdRQTFgYt0bOeuXQ"), img("VgXhTA9P77Vm6lEXbnXpYQ9G9zI"), img("EEiFmrfuyd6r8RqQSa1rmXBjs"), img("OOMeKSdypWm3x0RSegUbnyQV39M")],
  },
];

export const materials = [
  { name: "Travertino", origin: "Tívoli, Italia", spec: "Travertino romano, pulido y sellado", swatch: img("2SRlbAxNNMZUaEHv2gZVcynM5N8") },
  { name: "Roble claro", origin: "Jutlandia, Dinamarca", spec: "Roble europeo, aceite blanco", swatch: img("5YlJqBkqvCFw2pEUWjgQlO54I") },
  { name: "Cal", origin: "Alentejo, Portugal", spec: "Estuco de cal en tres capas", swatch: img("D2roZsMPZ4u7JSEbXS6ly7zDV9A") },
  { name: "Latón cepillado", origin: "Birmingham, Reino Unido", spec: "Latón macizo, sin lacar", swatch: img("jnQWjpLXWeI5g98EvUCe7gqeZsE") },
  { name: "Terrazo", origin: "Venecia, Italia", spec: "Terrazo fundido, árido de 12 mm", swatch: img("PVC6uKpy1gN2kfQ0Jr3o8TE3ZBs") },
  { name: "Lino", origin: "Cortrique, Bélgica", spec: "Lino grueso lavado", swatch: img("achgaJDx7zT8qc3VpH3NlbCDP7E") },
  { name: "Hormigón encofrado", origin: "Oporto, Portugal", spec: "In situ, marca de tabla de pino", swatch: img("soqp5n9WB9cDt Zigb4CciQxHPc") },
  { name: "Nogal", origin: "Ohio, Estados Unidos", spec: "Nogal negro, aceite de cera dura", swatch: img("N2ScD11fLkhgQI1XwiNYwVJJkI") },
];

export const IM = {
  hero: img("Z3Aia30Ln4si3eQRw85PtMgplA"),
  studioIntro: img("mvVm5NMMz7mstuk48Q6bawc8w"),
  drawing: img("aQPu8ahRVC4pmulufbrT9qpGIU"),
  built: img("5RrNzUnEg10vGKxm5AvfWLvRlZE"),
  process: img("xTqAEw6ptJPPosL9Z6UVYWARZTc"),
  portrait: img("wjoFKFf7G0tjRjcozLZDrZ7co"),
  contactStudio: img("QxPDju5tuAc8Whf0iTS60QrAI4"),
  studioHero: img("wIcXIdDxZE7BOsD52RNa6CKL2WY"),
  lisbon: img("QxPDju5tuAc8Whf0iTS60QrAI4"),
  copenhagen: img("tIBdLz0dLJ2o2wa9bZxkNY9w0"),
  lightStages: [
    img("xTqAEw6ptJPPosL9Z6UVYWARZTc"),
    img("Pq0a4Ss1p8LsbqpiovXlxIKQ"),
    img("mLWr4P3AyFpkGBRTJ5KLCi7Q6dI"),
    img("w6IPGtI8bSTouqYEk17QeIxSWPY"),
  ],
  team: [
    { name: "Inês Carvalho", role: "Fundadora, arquitecta", photo: img("FyQzWcSCC0BhS8lRtI0jyNxkuZg") },
    { name: "Mads Holm", role: "Fundador, arquitecto de interiores", photo: img("ilLs4pNvbSRGlrV65C4HihdDdWs") },
    { name: "Rita Sousa", role: "Socia, arquitecta", photo: img("1rNSVSml9iugAEspp1cfQlb42Dc") },
    { name: "Jonas Berg", role: "Arquitecto de proyecto", photo: img("ho6ZVdLXLpjafiNPmt3wXjFmyFg") },
    { name: "Leonor Pires", role: "Interiorista", photo: img("HCKqgBQB6OlAw0q0FTRsCQOvtg") },
    { name: "Tobias Lund", role: "Taller y mobiliario", photo: img("DbhzE2ojZvrpIBqt3xzpYrolGM") },
  ],
  services: [
    img("J6eTsIuGz2JZkYZ8qwCrtXHfZN0"),
    img("65tnBgRRtkeHQXPEiqHL1g27RoY"),
    img("HwJMSVcJQeYNRXkdmBO3exrDdjA"),
    img("jRpSZJW2TniR3X7OcXyZzAfArnc"),
  ],
};
