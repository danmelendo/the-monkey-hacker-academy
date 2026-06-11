import type { CategoryId } from "./categories";

export interface Article {
  slug: string;
  title: { es: string; en: string };
  excerpt: { es: string; en: string };
  body: { es: string; en: string };
  category: CategoryId;
  tags: string[];
  minRead: number;
  date: string;
  featured?: boolean;
  author: string;
}

export const articles: Article[] = [
  {
    slug: "phishing-2026-como-detectarlo",
    title: {
      es: "Phishing en 2026: cómo detectarlo sin ser técnico",
      en: "Phishing in 2026: spot it without being technical",
    },
    excerpt: {
      es: "Los ataques han evolucionado. Aquí van las pistas más útiles para no caer.",
      en: "Attacks have evolved. Here are the most useful clues to avoid falling for them.",
    },
    body: {
      es: "Los correos de phishing ya no son los de antes. Hoy usan IA generativa para personalizar mensajes y suenan creíbles. En este artículo repasamos las señales clave: dominios sutilmente alterados, urgencia falsa, archivos adjuntos extraños y enlaces acortados. También verás un checklist práctico para entrenar tu olfato cada vez que abres el buzón.",
      en: "Phishing emails aren't what they used to be. Today they use generative AI to personalize messages and sound believable. In this article we go through the key signals: subtly altered domains, fake urgency, weird attachments and shortened links. You'll also see a practical checklist to train your gut every time you open your inbox.",
    },
    category: "cyber",
    tags: ["phishing", "email", "principiantes"],
    minRead: 6,
    date: "2026-05-30",
    featured: true,
    author: "José Miguel",
  },
  {
    slug: "passkeys-fin-passwords",
    title: { es: "Passkeys: ¿el fin de las contraseñas?", en: "Passkeys: the end of passwords?" },
    excerpt: {
      es: "Qué son las passkeys, cómo funcionan y por qué deberías activarlas hoy.",
      en: "What passkeys are, how they work and why you should turn them on today.",
    },
    body: {
      es: "Las passkeys son la forma más cómoda y segura de iniciar sesión. Sin contraseñas que olvidar, sin frases extrañas. Te explico cómo activarlas en Google, Apple y Microsoft y qué hacer si cambias de móvil.",
      en: "Passkeys are the easiest and safest way to log in. No passwords to forget, no weird phrases. I'll show you how to enable them on Google, Apple and Microsoft and what to do if you change phones.",
    },
    category: "cyber",
    tags: ["passwords", "passkeys"],
    minRead: 5,
    date: "2026-05-18",
    author: "José Miguel",
  },
  {
    slug: "prompts-que-funcionan",
    title: { es: "10 prompts de IA que sí funcionan", en: "10 AI prompts that actually work" },
    excerpt: {
      es: "Plantillas listas para copiar y pegar en ChatGPT y Claude.",
      en: "Templates ready to copy and paste into ChatGPT and Claude.",
    },
    body: {
      es: "Selección de prompts probados para escribir, estudiar, programar, planificar y aprender más rápido. Cada uno con la explicación de por qué funciona y cómo adaptarlo.",
      en: "A selection of tested prompts to write, study, code, plan and learn faster. Each one explains why it works and how to adapt it.",
    },
    category: "ai",
    tags: ["prompts", "chatgpt"],
    minRead: 7,
    date: "2026-05-05",
    featured: true,
    author: "José Miguel",
  },
  {
    slug: "agentes-vs-asistentes",
    title: { es: "Agentes vs asistentes de IA", en: "AI agents vs assistants" },
    excerpt: {
      es: "Diferencias clave y cuándo usar cada uno en tu trabajo.",
      en: "Key differences and when to use each one in your work.",
    },
    body: {
      es: "Un asistente responde. Un agente actúa. Te enseño qué significa eso en la práctica con casos reales y cuándo elegir uno u otro según el problema.",
      en: "An assistant replies. An agent acts. I'll show you what that means in practice with real cases and when to pick one over the other.",
    },
    category: "ai",
    tags: ["agentes", "automatización"],
    minRead: 5,
    date: "2026-04-22",
    author: "José Miguel",
  },
  {
    slug: "python-en-30-minutos",
    title: { es: "Python en 30 minutos para no técnicos", en: "Python in 30 minutes for non-techies" },
    excerpt: {
      es: "Un mini-curso express para entender lo básico sin estresarte.",
      en: "A fast mini-course to understand the basics without stress.",
    },
    body: {
      es: "Variables, condicionales, listas y funciones explicadas con analogías de la vida real. Al final tendrás claro cómo funciona Python y por qué se usa tanto.",
      en: "Variables, conditionals, lists and functions explained with real-life analogies. By the end you'll understand how Python works and why it's everywhere.",
    },
    category: "dev",
    tags: ["python", "principiantes"],
    minRead: 8,
    date: "2026-04-10",
    author: "José Miguel",
  },
  {
    slug: "rutina-deep-work",
    title: { es: "Mi rutina diaria de deep work", en: "My daily deep work routine" },
    excerpt: {
      es: "Cómo organizo el día para crear sin interrupciones.",
      en: "How I organize my day to create without interruptions.",
    },
    body: {
      es: "Bloques de 90 minutos, herramientas que uso, cómo gestiono notificaciones y qué hago cuando me distraigo. Mi sistema completo, listo para que lo copies.",
      en: "90-minute blocks, the tools I use, how I handle notifications and what I do when I get distracted. My full system, ready to copy.",
    },
    category: "productivity",
    tags: ["productividad", "rutina"],
    minRead: 6,
    date: "2026-03-28",
    author: "José Miguel",
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
