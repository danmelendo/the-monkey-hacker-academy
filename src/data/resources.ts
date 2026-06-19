import type { LucideIcon } from "lucide-react";
import { ShieldCheck, Server, Terminal } from "lucide-react";

export type ResourceType = "guía" | "manual";

export interface Resource {
  slug: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  type: ResourceType;
  icon: LucideIcon;
  // Ruta al PDF dentro de /public. Descarga directa, sin backend.
  file: string;
}

export const resources: Resource[] = [
  {
    slug: "asegurar-tu-vps-2026",
    title: { es: "Cómo asegurar tu VPS en 2026", en: "How to secure your VPS in 2026" },
    description: {
      es: "Guía práctica para blindar un servidor VPS desde cero: firewall, SSH, fail2ban y buenas prácticas de hardening.",
      en: "Practical guide to harden a VPS from scratch: firewall, SSH, fail2ban and hardening best practices.",
    },
    type: "guía",
    icon: ShieldCheck,
    file: "/recursos/asegurar-tu-vps-2026.pdf",
  },
  {
    slug: "instalar-trilium-notes-vps",
    title: { es: "Instalar Trilium Notes en tu VPS", en: "Install Trilium Notes on your VPS" },
    description: {
      es: "Paso a paso para montar tu propio gestor de notas autoalojado Trilium en un VPS.",
      en: "Step-by-step setup to self-host your own Trilium notes manager on a VPS.",
    },
    type: "guía",
    icon: Server,
    file: "/recursos/instalar-trilium-notes-vps.pdf",
  },
  {
    slug: "wsl-ubuntu-stable-diffusion",
    title: {
      es: "WSL + Ubuntu + Stable Diffusion WebUI en Windows",
      en: "WSL + Ubuntu + Stable Diffusion WebUI on Windows",
    },
    description: {
      es: "Manual completo para instalar Ubuntu sobre WSL y poner en marcha Stable Diffusion WebUI en Windows.",
      en: "Complete manual to install Ubuntu on WSL and get Stable Diffusion WebUI running on Windows.",
    },
    type: "manual",
    icon: Terminal,
    file: "/recursos/wsl-ubuntu-stable-diffusion-webui-windows.pdf",
  },
];
