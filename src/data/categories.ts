import { Shield, Brain, Code2, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CategoryId = "cyber" | "ai" | "dev" | "productivity";

export interface CategoryDef {
  id: CategoryId;
  labelKey: "cat.cyber" | "cat.ai" | "cat.dev" | "cat.productivity";
  icon: LucideIcon;
  accent: string; // tailwind color class for accent
  desc: { es: string; en: string };
}

export const categories: CategoryDef[] = [
  {
    id: "cyber",
    labelKey: "cat.cyber",
    icon: Shield,
    accent: "text-emerald-400",
    desc: {
      es: "Protégete del phishing, ransomware y filtraciones. Hackea legalmente y aprende a defenderte.",
      en: "Defend against phishing, ransomware and breaches. Hack legally and learn to defend yourself.",
    },
  },
  {
    id: "ai",
    labelKey: "cat.ai",
    icon: Brain,
    accent: "text-cyan-400",
    desc: {
      es: "Domina ChatGPT, prompt engineering, agentes y construye tus propias herramientas con IA.",
      en: "Master ChatGPT, prompt engineering, agents and build your own AI-powered tools.",
    },
  },
  {
    id: "dev",
    labelKey: "cat.dev",
    icon: Code2,
    accent: "text-lime-400",
    desc: {
      es: "Python, JavaScript y bases del desarrollo web. De cero a tu primer proyecto real.",
      en: "Python, JavaScript and web dev fundamentals. From zero to your first real project.",
    },
  },
  {
    id: "productivity",
    labelKey: "cat.productivity",
    icon: Zap,
    accent: "text-amber-400",
    desc: {
      es: "Automatiza tu vida digital, organiza tu cerebro y trabaja como un mono con caña.",
      en: "Automate your digital life, organize your brain and work like a caffeinated monkey.",
    },
  },
];

export const categoryById = (id: CategoryId) => categories.find((c) => c.id === id)!;
