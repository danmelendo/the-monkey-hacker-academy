import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { articleBySlug } from "@/data/articles";
import { categoryById } from "@/data/categories";
import { useI18n } from "@/lib/i18n";
import { Markdown } from "@/components/Markdown";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = articleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Artículo — MongoHacker" }] };
    const desc = a.metaDescription || a.excerpt.es;
    return {
      meta: [
        { title: `${a.title.es} — MongoHacker Blog` },
        { name: "description", content: desc },
        { property: "og:title", content: a.title.es },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${a.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${a.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title.es,
            description: a.excerpt.es,
            datePublished: a.date,
            author: { "@type": "Person", name: a.author },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h1 className="font-display text-3xl font-bold">Artículo no encontrado</h1>
      <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">
        ← Volver al blog
      </Link>
    </div>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: NonNullable<ReturnType<typeof import("@/data/articles").articleBySlug>> };
  const { t, lang } = useI18n();
  const cat = categoryById(article.category);

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 font-mono">
        <ArrowLeft className="h-4 w-4" /> {t("blog.back")}
      </Link>

      <div className={`text-xs font-mono uppercase tracking-wider ${cat.accent}`}>{t(cat.labelKey)}</div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">{article.title[lang]}</h1>

      <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground font-mono">
        <span>{new Date(article.date).toLocaleDateString(lang === "es" ? "es-ES" : "en-US", { dateStyle: "long" })}</span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> {article.minRead} {t("blog.minRead")}
        </span>
        <span>·</span>
        <span>{article.author}</span>
      </div>

      <p className="mt-8 text-lg text-muted-foreground border-l-2 border-primary/60 pl-4">{article.excerpt[lang]}</p>

      <div className="mt-8">
        <Markdown>{article.body[lang]}</Markdown>
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
