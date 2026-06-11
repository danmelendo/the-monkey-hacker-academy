import type { LucideIcon } from "lucide-react";
import { BookOpen, ListChecks, FileText, Notebook } from "lucide-react";

export type ResourceType = "ebook" | "checklist" | "template" | "guide";

export interface Resource {
  slug: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  type: ResourceType;
  icon: LucideIcon;
  pages: number;
}

export const resources: Resource[] = [
  {
    slug: "ebook-ciberseguridad-familiar",
    title: { es: "Ebook: Ciberseguridad familiar", en: "Ebook: Family cybersecurity" },
    description: {
      es: "Guía completa para proteger a tu familia online: niños, mayores y todo lo que hay en medio.",
      en: "Full guide to protect your family online: kids, elders and everyone in between.",
    },
    type: "ebook",
    icon: BookOpen,
    pages: 48,
  },
  {
    slug: "checklist-cuenta-segura",
    title: { es: "Checklist: cuenta 100% segura", en: "Checklist: 100% secure account" },
    description: {
      es: "30 puntos para blindar cualquier cuenta importante (banco, email, redes).",
      en: "30 points to harden any important account (bank, email, socials).",
    },
    type: "checklist",
    icon: ListChecks,
    pages: 4,
  },
  {
    slug: "plantilla-prompts-trabajo",
    title: { es: "Plantilla: prompts para el trabajo", en: "Template: prompts for work" },
    description: {
      es: "20 plantillas de prompts probados para emails, reuniones, reportes y más.",
      en: "20 tested prompt templates for emails, meetings, reports and more.",
    },
    type: "template",
    icon: FileText,
    pages: 12,
  },
  {
    slug: "guia-pdf-monta-tu-lab",
    title: { es: "Guía PDF: monta tu laboratorio hacker", en: "PDF guide: build your hacker lab" },
    description: {
      es: "Setup paso a paso para practicar pentesting en tu propio ordenador sin riesgo.",
      en: "Step-by-step setup to practice pentesting on your own machine risk-free.",
    },
    type: "guide",
    icon: Notebook,
    pages: 26,
  },
  {
    slug: "ebook-ia-para-estudiar",
    title: { es: "Ebook: IA para estudiar mejor", en: "Ebook: AI to study better" },
    description: {
      es: "Cómo usar IA sin hacer trampas y aprender más rápido. Para estudiantes y curiosos.",
      en: "How to use AI without cheating and learn faster. For students and curious minds.",
    },
    type: "ebook",
    icon: BookOpen,
    pages: 32,
  },
  {
    slug: "checklist-productividad",
    title: { es: "Checklist: semana productiva", en: "Checklist: productive week" },
    description: {
      es: "El ritual de domingo y viernes que cambia tu semana entera.",
      en: "The Sunday and Friday ritual that changes your whole week.",
    },
    type: "checklist",
    icon: ListChecks,
    pages: 3,
  },
];
