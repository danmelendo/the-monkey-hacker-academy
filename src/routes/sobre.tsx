import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, ShieldCheck, Mic, Wrench, Mail } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre José Miguel Gómez Fernández — MongoHacker" },
      {
        name: "description",
        content:
          "Ingeniero Informático, Máster en Ciberseguridad, formador y fundador de MongoHacker y JMOrdenadores.",
      },
      { property: "og:title", content: "Sobre José Miguel — MongoHacker" },
      { property: "og:description", content: "Conoce al creador de MongoHacker." },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();

  const cred = [
    { icon: GraduationCap, label: "Ingeniero Informático" },
    { icon: ShieldCheck, label: "Máster en Ciberseguridad" },
    { icon: Mic, label: "Formador y creador de contenido" },
    { icon: Wrench, label: "Fundador de MongoHacker y JMOrdenadores" },
  ];

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 md:py-24">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="shrink-0">
          <Logo size={140} className="ring-4 ring-primary/40 neon-glow" />
        </div>
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">~/sobre-mí</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold">{t("about.title")}</h1>
          <p className="mt-2 text-lg text-primary font-medium">{t("about.role")}</p>
          <p className="mt-5 text-foreground/90 leading-relaxed">{t("about.bio")}</p>

          <a
            href="mailto:hola@mongohacker.com"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition neon-glow"
          >
            <Mail className="h-4 w-4" /> {t("about.contact")}
          </a>
        </div>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 gap-4">
        {cred.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="terminal-card p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-medium">{c.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
