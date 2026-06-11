import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Target, Users, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/comunidad")({
  head: () => ({
    meta: [
      { title: "Comunidad — MongoHacker" },
      {
        name: "description",
        content: "Únete a la comunidad MongoHacker en Discord. Ranking, retos mensuales y conexión con otros aprendices.",
      },
      { property: "og:title", content: "Comunidad MongoHacker" },
      { property: "og:description", content: "Discord, ranking y retos para curiosos digitales." },
      { property: "og:url", content: "/comunidad" },
    ],
    links: [{ rel: "canonical", href: "/comunidad" }],
  }),
  component: CommunityPage,
});

const ranking = [
  { name: "Lara M.", points: 1820, badge: "🥇" },
  { name: "Diego R.", points: 1640, badge: "🥈" },
  { name: "Marta L.", points: 1490, badge: "🥉" },
  { name: "Iván P.", points: 1320, badge: "" },
  { name: "Noa S.", points: 1185, badge: "" },
  { name: "Pablo T.", points: 1020, badge: "" },
];

function CommunityPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero eyebrow="comunidad" title={t("community.title")} subtitle={t("community.subtitle")} showMono />

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <div className="terminal-card p-8 md:p-10 text-center relative overflow-hidden">
          <div
            className="absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(closest-side, oklch(0.82 0.24 145 / 0.6), transparent)" }}
            aria-hidden
          />
          <div className="relative">
            <Users className="h-12 w-12 text-primary mx-auto" />
            <h2 className="mt-4 font-display text-3xl font-bold">+3.200 monos en Discord</h2>
            <p className="mt-2 text-muted-foreground">Charla, dudas, retos, recursos y mucho meme.</p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#5865F2] px-6 py-3 text-sm font-semibold text-white hover:bg-[#4752c4] transition"
            >
              {t("community.join")} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid lg:grid-cols-2 gap-8">
        <div className="terminal-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Trophy className="h-5 w-5 text-amber-400" />
            <h3 className="font-display text-xl font-bold">{t("community.ranking")}</h3>
          </div>
          <ul className="divide-y divide-border/60">
            {ranking.map((u, i) => (
              <li key={u.name} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-muted-foreground w-6">{i + 1}</span>
                  <span className="text-2xl">{u.badge}</span>
                  <span className="font-medium">{u.name}</span>
                </div>
                <span className="font-mono text-sm neon-text">{u.points} XP</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="terminal-card p-6 scanlines relative overflow-hidden">
          <div className="flex items-center gap-2 mb-5">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-display text-xl font-bold">{t("community.challenges")}</h3>
          </div>
          <div className="space-y-3">
            <div className="border border-primary/40 rounded-lg p-4 bg-primary/5">
              <div className="text-xs font-mono uppercase tracking-wider text-primary">
                {t("community.challenge.current")} · junio
              </div>
              <h4 className="mt-2 font-display text-lg font-bold">Caza el phishing</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Analiza 5 correos sospechosos y comparte tus hallazgos en el canal #retos.
              </p>
            </div>
            <div className="border border-border rounded-lg p-4 opacity-70">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">mayo</div>
              <h4 className="mt-1 font-display font-bold">Tu primer script en Python</h4>
            </div>
            <div className="border border-border rounded-lg p-4 opacity-70">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">abril</div>
              <h4 className="mt-1 font-display font-bold">Prompt golf</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
