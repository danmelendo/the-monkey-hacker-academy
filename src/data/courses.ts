import type { CategoryId } from "./categories";

export type Level = "beginner" | "intermediate" | "advanced";

export interface Course {
  slug: string;
  title: { es: string; en: string };
  summary: { es: string; en: string };
  description: { es: string; en: string };
  category: CategoryId;
  level: Level;
  durationHours: number;
  lessons: number;
  featured?: boolean;
  isNew?: boolean;
  syllabus: { es: string[]; en: string[] };
}

export const courses: Course[] = [
  {
    slug: "ciberseguridad-desde-cero",
    title: { es: "Ciberseguridad desde cero", en: "Cybersecurity from scratch" },
    summary: {
      es: "Tu primer paso para entender cómo te atacan y cómo defenderte.",
      en: "Your first step to understand how attacks work and how to defend.",
    },
    description: {
      es: "Un curso pensado para no técnicos. Aprende los conceptos clave de ciberseguridad con ejemplos de la vida real y misiones prácticas que harás sin instalar nada raro.",
      en: "Built for non-technical folks. Learn key cybersecurity concepts with real-life examples and hands-on missions you can do without scary tools.",
    },
    category: "cyber",
    level: "beginner",
    durationHours: 6,
    lessons: 28,
    featured: true,
    isNew: true,
    syllabus: {
      es: [
        "¿Qué es la ciberseguridad y por qué te importa?",
        "Contraseñas, gestores y 2FA explicados como a tu abuela",
        "Phishing, smishing y engaños modernos",
        "Wifis públicas, VPN y navegación segura",
        "Tu primer plan de defensa personal",
      ],
      en: [
        "What is cybersecurity and why you should care",
        "Passwords, managers and 2FA explained simply",
        "Phishing, smishing and modern scams",
        "Public Wi-Fi, VPNs and safe browsing",
        "Your first personal defense plan",
      ],
    },
  },
  {
    slug: "hacking-etico-practico",
    title: { es: "Hacking ético práctico", en: "Practical ethical hacking" },
    summary: {
      es: "Aprende a pensar como atacante para defender mejor.",
      en: "Learn to think like an attacker to defend better.",
    },
    description: {
      es: "Montaremos un laboratorio en tu propio ordenador y aprenderás reconocimiento, escaneo, explotación básica y reporte. Todo legal, todo divertido.",
      en: "We'll set up a lab on your machine and you'll learn recon, scanning, basic exploitation and reporting. All legal, all fun.",
    },
    category: "cyber",
    level: "intermediate",
    durationHours: 14,
    lessons: 42,
    featured: true,
    syllabus: {
      es: [
        "Monta tu laboratorio con máquinas virtuales",
        "Reconocimiento pasivo y activo",
        "Escaneo con Nmap explicado paso a paso",
        "Explotación básica con Metasploit",
        "Tu primer informe de pentest",
      ],
      en: [
        "Build your lab with virtual machines",
        "Passive and active recon",
        "Nmap scanning step by step",
        "Basic exploitation with Metasploit",
        "Your first pentest report",
      ],
    },
  },
  {
    slug: "ia-para-todos",
    title: { es: "IA para todos", en: "AI for everyone" },
    summary: {
      es: "Saca el máximo a ChatGPT, Claude y compañía en tu día a día.",
      en: "Get the most out of ChatGPT, Claude and friends in your daily life.",
    },
    description: {
      es: "Sin matemáticas, sin código. Aprenderás a usar IA para escribir mejor, automatizar tareas y resolver problemas reales.",
      en: "No math, no code. You'll learn to use AI to write better, automate tasks and solve real problems.",
    },
    category: "ai",
    level: "beginner",
    durationHours: 4,
    lessons: 22,
    isNew: true,
    syllabus: {
      es: [
        "Cómo funciona realmente un modelo de IA",
        "Prompts que funcionan (y los que no)",
        "Construye tu asistente personal",
        "IA para estudiar, trabajar y crear",
        "Ética y límites prácticos",
      ],
      en: [
        "How an AI model actually works",
        "Prompts that work (and those that don't)",
        "Build your personal assistant",
        "AI for studying, working and creating",
        "Ethics and practical limits",
      ],
    },
  },
  {
    slug: "agentes-ia-no-code",
    title: { es: "Agentes de IA sin código", en: "No-code AI agents" },
    summary: {
      es: "Crea agentes que trabajan por ti sin escribir una línea.",
      en: "Build agents that work for you without writing code.",
    },
    description: {
      es: "Conectarás herramientas como n8n, Zapier y modelos LLM para automatizar tareas, atención al cliente y flujos completos.",
      en: "Connect tools like n8n, Zapier and LLM models to automate tasks, customer support and full workflows.",
    },
    category: "ai",
    level: "intermediate",
    durationHours: 8,
    lessons: 30,
    syllabus: {
      es: ["Anatomía de un agente", "Tu primer flujo con n8n", "Integraciones útiles", "Despliegue y monitorización", "Casos reales"],
      en: ["Agent anatomy", "Your first n8n flow", "Useful integrations", "Deploy and monitor", "Real-world cases"],
    },
  },
  {
    slug: "python-desde-cero",
    title: { es: "Python desde cero", en: "Python from scratch" },
    summary: {
      es: "Aprende a programar con el lenguaje más amigable del planeta.",
      en: "Learn to code with the friendliest language on the planet.",
    },
    description: {
      es: "Empezarás escribiendo tu primer Hola Mundo y acabarás haciendo scripts que te ahorran tiempo todos los días.",
      en: "You'll start with your first Hello World and end up writing scripts that save you time every day.",
    },
    category: "dev",
    level: "beginner",
    durationHours: 10,
    lessons: 36,
    featured: true,
    syllabus: {
      es: ["Variables, tipos y estructuras", "Funciones y módulos", "Trabaja con ficheros y APIs", "Automatiza tu vida", "Tu primer proyecto real"],
      en: ["Variables, types and structures", "Functions and modules", "Files and APIs", "Automate your life", "Your first real project"],
    },
  },
  {
    slug: "javascript-moderno",
    title: { es: "JavaScript moderno", en: "Modern JavaScript" },
    summary: {
      es: "El lenguaje de la web actual, explicado en humano.",
      en: "Today's language of the web, explained in plain words.",
    },
    description: {
      es: "ES2024, async/await, módulos y los patrones que de verdad se usan en producción.",
      en: "ES2024, async/await, modules and the patterns actually used in production.",
    },
    category: "dev",
    level: "intermediate",
    durationHours: 12,
    lessons: 40,
    syllabus: {
      es: ["Fundamentos modernos", "Asincronía sin dolor", "Módulos y tooling", "DOM y eventos", "Mini-proyectos"],
      en: ["Modern fundamentals", "Painless async", "Modules and tooling", "DOM and events", "Mini-projects"],
    },
  },
  {
    slug: "productividad-digital",
    title: { es: "Productividad digital", en: "Digital productivity" },
    summary: {
      es: "Organiza tu cerebro y trabaja como un mono con caña.",
      en: "Organize your brain and work like a caffeinated monkey.",
    },
    description: {
      es: "Sistemas, herramientas y rutinas para hacer más en menos tiempo sin quemarte.",
      en: "Systems, tools and routines to do more in less time without burning out.",
    },
    category: "productivity",
    level: "beginner",
    durationHours: 3,
    lessons: 18,
    syllabus: {
      es: ["Tu segundo cerebro", "Inbox zero de verdad", "Atajos y automatizaciones", "Bloques de tiempo", "Auditoría semanal"],
      en: ["Your second brain", "True inbox zero", "Shortcuts and automations", "Time blocks", "Weekly audit"],
    },
  },
  {
    slug: "automatiza-con-shortcuts",
    title: { es: "Automatiza con Shortcuts", en: "Automate with Shortcuts" },
    summary: {
      es: "Crea automatizaciones potentes en tu móvil y ordenador.",
      en: "Build powerful automations on your phone and laptop.",
    },
    description: {
      es: "Atajos de iOS, Tasker en Android y Power Automate para Windows. Todo conectado, todo automático.",
      en: "iOS Shortcuts, Android Tasker and Power Automate. All connected, all automatic.",
    },
    category: "productivity",
    level: "intermediate",
    durationHours: 5,
    lessons: 24,
    isNew: true,
    syllabus: {
      es: ["Conceptos clave", "Atajos iOS desde cero", "Tasker en Android", "Power Automate", "Recetas listas para copiar"],
      en: ["Key concepts", "iOS Shortcuts from zero", "Android Tasker", "Power Automate", "Ready-to-copy recipes"],
    },
  },
];

export const courseBySlug = (slug: string) => courses.find((c) => c.slug === slug);
