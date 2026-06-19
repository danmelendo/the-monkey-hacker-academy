import { createFileRoute } from "@tanstack/react-router";
import { Youtube, Instagram, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { TikTokIcon } from "@/components/SocialIcons";
import { YouTubeEmbed, InstagramEmbed, TikTokEmbed } from "@/components/SocialEmbeds";
import { useI18n } from "@/lib/i18n";
import { SOCIAL, FEATURED } from "@/lib/site";

export const Route = createFileRoute("/comunidad")({
  head: () => ({
    meta: [
      { title: "Comunidad — MongoHacker" },
      {
        name: "description",
        content: "Sigue a MongoHacker en YouTube, TikTok e Instagram. Vídeos y shorts de ciberseguridad, IA y productividad.",
      },
      { property: "og:title", content: "Comunidad MongoHacker" },
      { property: "og:description", content: "Vídeos y shorts de ciberseguridad, IA y productividad." },
      { property: "og:url", content: "/comunidad" },
    ],
    links: [{ rel: "canonical", href: "/comunidad" }],
  }),
  component: CommunityPage,
});

const HANDLE = "@mongohacker";

const channels = [
  {
    name: "YouTube",
    url: SOCIAL.youtube,
    Icon: Youtube,
    desc: "Tutoriales y vídeos completos de ciberseguridad, IA y trucos digitales.",
    accent: "text-red-500",
    ring: "hover:border-red-500/50",
  },
  {
    name: "TikTok",
    url: SOCIAL.tiktok,
    Icon: TikTokIcon,
    desc: "Shorts rápidos, trucos y curiosidades tech en formato vertical.",
    accent: "text-foreground",
    ring: "hover:border-primary/50",
  },
  {
    name: "Instagram",
    url: SOCIAL.instagram,
    Icon: Instagram,
    desc: "Reels, novedades y el día a día detrás de MongoHacker.",
    accent: "text-pink-500",
    ring: "hover:border-pink-500/50",
  },
] as const;

function CommunityPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero eyebrow="comunidad" title={t("community.title")} subtitle={t("community.subtitle")} showMono />

      {/* Contenido destacado de cada red */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <div className="flex items-center gap-2 mb-6">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">~/lo-último</p>
        </div>

        <YouTubeEmbed url={FEATURED.youtubeUrl} handle={HANDLE} profileUrl={SOCIAL.youtube} />

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <InstagramEmbed postUrl={FEATURED.instagramPostUrl} handle={HANDLE} profileUrl={SOCIAL.instagram} />
          <TikTokEmbed videoUrl={FEATURED.tiktokVideoUrl} handle={HANDLE} profileUrl={SOCIAL.tiktok} />
        </div>
      </section>

      {/* Seguir en cada plataforma */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((c) => {
            const Icon = c.Icon;
            return (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`terminal-card group p-6 flex flex-col border transition ${c.ring}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center ${c.accent}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">{c.name}</h3>
                    <p className="text-xs font-mono text-muted-foreground">{HANDLE}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground flex-1">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-primary">
                  {t("community.follow")} <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition" />
                </span>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}
