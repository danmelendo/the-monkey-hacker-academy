import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, BookOpen, CheckCircle2, Video, Award, ListChecks, Users } from "lucide-react";
import { toast } from "sonner";
import { courseBySlug } from "@/data/courses";
import { categoryById } from "@/data/categories";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/academia/$slug")({
  loader: ({ params }) => {
    const course = courseBySlug(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.course;
    if (!c) return { meta: [{ title: "Curso — MongoHacker" }] };
    return {
      meta: [
        { title: `${c.title.es} — MongoHacker` },
        { name: "description", content: c.summary.es },
        { property: "og:title", content: c.title.es },
        { property: "og:description", content: c.summary.es },
        { property: "og:url", content: `/academia/${c.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/academia/${c.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h1 className="font-display text-3xl font-bold">Curso no encontrado</h1>
      <Link to="/academia" className="mt-4 inline-block text-primary hover:underline">
        ← Volver al catálogo
      </Link>
    </div>
  ),
  component: CoursePage,
});

function CoursePage() {
  const { course } = Route.useLoaderData() as { course: NonNullable<ReturnType<typeof import("@/data/courses").courseBySlug>> };
  const { t, lang } = useI18n();
  const cat = categoryById(course.category);
  const Icon = cat.icon;

  const features = [
    { icon: Video, key: "academy.feat.video" as const },
    { icon: ListChecks, key: "academy.feat.progress" as const },
    { icon: Award, key: "academy.feat.cert" as const },
    { icon: CheckCircle2, key: "academy.feat.quiz" as const },
    { icon: Users, key: "academy.feat.community" as const },
  ];

  return (
    <article>
      <section className="relative border-b border-border/60 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-12 md:py-20">
          <Link
            to="/academia"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 font-mono"
          >
            <ArrowLeft className="h-4 w-4" /> {t("academy.back")}
          </Link>

          <div className={`inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider ${cat.accent}`}>
            <Icon className="h-4 w-4" /> {t(cat.labelKey)}
          </div>

          <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold tracking-tight">
            {course.title[lang]}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{course.description[lang]}</p>

          <div className="mt-8 flex flex-wrap gap-4 text-sm font-mono">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" /> {course.durationHours}h
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4 text-primary" /> {course.lessons} {t("academy.lessons")}
            </span>
            <span className="text-primary">{t(`common.${course.level}` as const)}</span>
          </div>

          <button
            onClick={() => toast.success("Pronto disponible — suscríbete a MongoMail para enterarte.")}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition neon-glow"
          >
            {t("academy.enroll")}
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-bold mb-6">{t("academy.syllabus")}</h2>
          <ol className="space-y-3">
            {course.syllabus[lang].map((item, i) => (
              <li key={i} className="terminal-card p-4 flex gap-4 items-start">
                <span className="font-mono text-primary text-sm shrink-0 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <aside>
          <div className="terminal-card p-6 sticky top-24">
            <h3 className="font-display text-lg font-bold mb-4">{t("academy.included")}</h3>
            <ul className="space-y-3">
              {features.map((f) => {
                const Fi = f.icon;
                return (
                  <li key={f.key} className="flex items-center gap-3 text-sm">
                    <Fi className="h-4 w-4 text-primary shrink-0" />
                    <span>{t(f.key)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </section>
    </article>
  );
}
