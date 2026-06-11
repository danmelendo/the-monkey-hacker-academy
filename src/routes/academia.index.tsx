import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageHero } from "@/components/PageHero";
import { CourseCard } from "@/components/CourseCard";
import { useI18n } from "@/lib/i18n";
import { categories, type CategoryId } from "@/data/categories";
import { courses } from "@/data/courses";

const searchSchema = z.object({
  cat: z.enum(["cyber", "ai", "dev", "productivity"]).optional(),
});

export const Route = createFileRoute("/academia/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Academia — MongoHacker" },
      {
        name: "description",
        content:
          "Catálogo de cursos de ciberseguridad, inteligencia artificial, programación y productividad digital. Cursos sencillos y prácticos.",
      },
      { property: "og:title", content: "Academia MongoHacker" },
      { property: "og:description", content: "Cursos para humanos: ciber, IA, código y productividad." },
      { property: "og:url", content: "/academia" },
    ],
    links: [{ rel: "canonical", href: "/academia" }],
  }),
  component: AcademyPage,
});

function AcademyPage() {
  const { t } = useI18n();
  const initial = Route.useSearch().cat;
  const [filter, setFilter] = useState<CategoryId | "all">(initial ?? "all");

  const filtered = filter === "all" ? courses : courses.filter((c) => c.category === filter);

  return (
    <>
      <PageHero
        eyebrow="academia"
        title={t("academy.title")}
        subtitle={t("academy.subtitle")}
        showMono
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          <FilterBtn active={filter === "all"} onClick={() => setFilter("all")} label={t("academy.filter.all")} />
          {categories.map((c) => (
            <FilterBtn
              key={c.id}
              active={filter === c.id}
              onClick={() => setFilter(c.id)}
              label={t(c.labelKey)}
            />
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground py-12 text-center">{t("academy.empty")}</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function FilterBtn({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm font-medium font-mono transition ${
        active
          ? "bg-primary text-primary-foreground neon-glow"
          : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border"
      }`}
    >
      {label}
    </button>
  );
}
