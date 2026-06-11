import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/data/articles";
import { categories } from "@/data/categories";
import { useI18n } from "@/lib/i18n";
import type { CategoryId } from "@/data/categories";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — MongoHacker" },
      {
        name: "description",
        content:
          "Artículos sobre ciberseguridad, inteligencia artificial y programación, explicados sin tecnicismos.",
      },
      { property: "og:title", content: "Blog MongoHacker" },
      { property: "og:description", content: "Ciberseguridad, IA y código explicados sin rollos." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const [tag, setTag] = useState<string | null>(null);

  const allTags = useMemo(() => Array.from(new Set(articles.flatMap((a) => a.tags))), []);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (cat !== "all" && a.category !== cat) return false;
      if (tag && !a.tags.includes(tag)) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          a.title[lang].toLowerCase().includes(q) ||
          a.excerpt[lang].toLowerCase().includes(q) ||
          a.tags.some((x) => x.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [cat, tag, query, lang]);

  const featured = articles.filter((a) => a.featured);

  return (
    <>
      <PageHero eyebrow="blog" title={t("blog.title")} subtitle={t("blog.subtitle")} />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-3 space-y-8">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("blog.search")}
                  className="w-full rounded-md bg-input border border-border pl-9 pr-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-3">Categorías</h3>
              <div className="flex flex-col gap-1">
                <CatBtn active={cat === "all"} onClick={() => setCat("all")} label={t("academy.filter.all")} />
                {categories.map((c) => (
                  <CatBtn key={c.id} active={cat === c.id} onClick={() => setCat(c.id)} label={t(c.labelKey)} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-3">{t("blog.tags")}</h3>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tg) => (
                  <button
                    key={tg}
                    onClick={() => setTag(tag === tg ? null : tg)}
                    className={`text-[11px] font-mono px-2 py-1 rounded-full transition ${
                      tag === tg
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    #{tg}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            {featured.length > 0 && !query && cat === "all" && !tag && (
              <div className="mb-10">
                <h2 className="font-display text-xl font-bold mb-4">{t("blog.featured")}</h2>
                <div className="grid gap-5 md:grid-cols-2">
                  {featured.map((a) => (
                    <ArticleCard key={a.slug} article={a} featured />
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              {filtered.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-muted-foreground text-center py-16">{t("blog.empty")}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function CatBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-3 py-1.5 rounded-md text-sm transition ${
        active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      }`}
    >
      {label}
    </button>
  );
}
