export interface Newsletter {
  id: string;
  number: number;
  title: { es: string; en: string };
  preview: { es: string; en: string };
  date: string;
}

export const newsletters: Newsletter[] = [
  {
    id: "mm-042",
    number: 42,
    title: {
      es: "El día que la IA descubrió un 0-day",
      en: "The day an AI uncovered a 0-day",
    },
    preview: {
      es: "Resumen de la semana en ciber, una herramienta IA que recomiendo y un truco de productividad para lunes.",
      en: "Week recap in cyber, an AI tool worth trying and a productivity trick for Mondays.",
    },
    date: "2026-06-02",
  },
  {
    id: "mm-041",
    number: 41,
    title: { es: "Passkeys para tu familia", en: "Passkeys for your family" },
    preview: {
      es: "Cómo migrar a passkeys sin volver locos a tus padres. Spoiler: es más fácil de lo que parece.",
      en: "How to switch to passkeys without driving your parents crazy. Spoiler: easier than it sounds.",
    },
    date: "2026-05-26",
  },
  {
    id: "mm-040",
    number: 40,
    title: { es: "El mejor curso gratuito de Python", en: "The best free Python course" },
    preview: {
      es: "Mi recomendación de la semana, una noticia de ciber importante y un atajo de macOS que te encantará.",
      en: "My pick of the week, a big cyber news story and a macOS shortcut you'll love.",
    },
    date: "2026-05-19",
  },
  {
    id: "mm-039",
    number: 39,
    title: { es: "Agentes IA que ya merecen la pena", en: "AI agents that finally deliver" },
    preview: {
      es: "Tras seis meses probando agentes, estos son los que han pasado el corte.",
      en: "After six months testing agents, these are the ones that passed the bar.",
    },
    date: "2026-05-12",
  },
];
