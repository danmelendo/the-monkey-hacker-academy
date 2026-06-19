import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/lib/i18n";
import { resources } from "@/data/resources";

export const Route = createFileRoute("/recursos")({
  head: () => ({
    meta: [
      { title: "Recursos gratuitos — MongoHacker" },
      {
        name: "description",
        content: "Guías y manuales PDF gratuitos sobre VPS, servidores, ciberseguridad e IA. Descarga directa.",
      },
      { property: "og:title", content: "Recursos gratuitos — MongoHacker" },
      { property: "og:description", content: "Guías y manuales en PDF para avanzar más rápido." },
      { property: "og:url", content: "/recursos" },
    ],
    links: [{ rel: "canonical", href: "/recursos" }],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const { t, lang } = useI18n();

  return (
    <>
      <PageHero eyebrow="recursos" title={t("resources.title")} subtitle={t("resources.subtitle")} />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.slug} className="terminal-card p-6 flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    {r.type} · PDF
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{r.title[lang]}</h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{r.description[lang]}</p>
                <a
                  href={r.file}
                  download
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
                >
                  <Download className="h-4 w-4" /> {t("resources.download")}
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
