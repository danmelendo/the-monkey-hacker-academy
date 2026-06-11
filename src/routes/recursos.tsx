import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Download, X } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/lib/i18n";
import { resources, type Resource } from "@/data/resources";

export const Route = createFileRoute("/recursos")({
  head: () => ({
    meta: [
      { title: "Recursos gratuitos — MongoHacker" },
      {
        name: "description",
        content: "Ebooks, checklists, plantillas y guías PDF gratuitas sobre ciberseguridad, IA y productividad.",
      },
      { property: "og:title", content: "Recursos gratuitos — MongoHacker" },
      { property: "og:description", content: "Ebooks, checklists y plantillas para avanzar más rápido." },
      { property: "og:url", content: "/recursos" },
    ],
    links: [{ rel: "canonical", href: "/recursos" }],
  }),
  component: ResourcesPage,
});

const emailSchema = z.string().email();

function ResourcesPage() {
  const { t, lang } = useI18n();
  const [gated, setGated] = useState<Resource | null>(null);
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSchema.safeParse(email).success) {
      toast.error(t("form.invalidEmail"));
      return;
    }
    toast.success(`Recurso enviado a ${email}`);
    setGated(null);
    setEmail("");
  };

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
                    {r.type} · {r.pages}p
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{r.title[lang]}</h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{r.description[lang]}</p>
                <button
                  onClick={() => setGated(r)}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
                >
                  <Download className="h-4 w-4" /> {t("resources.download")}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {gated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="relative terminal-card max-w-md w-full p-8 scanlines">
            <button
              onClick={() => setGated(null)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground p-1"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="text-xs font-mono text-primary uppercase tracking-wider">~/{gated.slug}</p>
            <h3 className="mt-2 font-display text-2xl font-bold">{t("resources.gate.title")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t("resources.gate.desc")}</p>
            <form onSubmit={submit} className="mt-5 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("mongomail.placeholder")}
                className="w-full rounded-md bg-input border border-border px-4 py-3 text-sm font-mono outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition neon-glow"
              >
                {t("resources.gate.cta")}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
