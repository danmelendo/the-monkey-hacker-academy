import { createFileRoute } from "@tanstack/react-router";
import { Mail, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { NewsletterForm } from "@/components/NewsletterForm";
import { useI18n } from "@/lib/i18n";
import { newsletters } from "@/data/newsletters";

export const Route = createFileRoute("/mongomail")({
  head: () => ({
    meta: [
      { title: "MongoMail — La newsletter de MongoHacker" },
      {
        name: "description",
        content: "Suscríbete a MongoMail: ciberseguridad, IA y productividad cada semana en tu inbox.",
      },
      { property: "og:title", content: "MongoMail" },
      { property: "og:description", content: "Newsletter semanal sin rollos." },
      { property: "og:url", content: "/mongomail" },
    ],
    links: [{ rel: "canonical", href: "/mongomail" }],
  }),
  component: MongoMailPage,
});

function MongoMailPage() {
  const { t, lang } = useI18n();

  return (
    <>
      <PageHero eyebrow="mongomail" title={t("mongomail.title")} subtitle={t("mongomail.subtitle")} />

      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <div className="terminal-card p-8 md:p-10 scanlines">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-mono text-primary uppercase tracking-wider">~/inbox</p>
              <p className="font-display text-lg font-bold">8.500+ suscriptores</p>
            </div>
          </div>
          <NewsletterForm />
          <p className="mt-3 text-xs text-muted-foreground font-mono">
            Cero spam · Cancelas con un clic · Cada lunes a las 8:00
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">{t("mongomail.archive")}</h2>
        <div className="grid gap-3">
          {newsletters.map((n) => (
            <a
              key={n.id}
              href="#"
              className="terminal-card group p-5 flex items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="font-mono text-xs text-primary shrink-0 w-12 pt-1">
                  #{String(n.number).padStart(3, "0")}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-foreground group-hover:text-primary transition truncate">
                    {n.title[lang]}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{n.preview[lang]}</p>
                  <p className="text-xs text-muted-foreground/70 font-mono mt-1">
                    {new Date(n.date).toLocaleDateString(lang === "es" ? "es-ES" : "en-US", { dateStyle: "long" })}
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0" />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
