import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Terminal, Shield, Brain, Code2, Zap, CheckCircle2, Sparkles } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useI18n } from "@/lib/i18n";
import { categories } from "@/data/categories";
import { courses } from "@/data/courses";
import { articles } from "@/data/articles";
import { CourseCard } from "@/components/CourseCard";
import { ArticleCard } from "@/components/ArticleCard";
import { NewsletterForm } from "@/components/NewsletterForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MongoHacker Academy — Ciberseguridad para humanos (y monos)" },
      {
        name: "description",
        content:
          "Aprende ciberseguridad, IA y programación con cursos sencillos, divertidos y visuales. Únete gratis a MongoHacker.",
      },
      { property: "og:title", content: "MongoHacker Academy" },
      {
        property: "og:description",
        content: "Ciberseguridad explicada sin rollos. Cursos, blog y comunidad.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const { t, lang } = useI18n();
  const featuredCourses = courses.filter((c) => c.featured).slice(0, 3);
  const featuredArticles = articles.filter((a) => a.featured).slice(0, 2);

  const stats = [
    { value: "12.000+", label: t("stats.students") },
    { value: "180+", label: t("stats.articles") },
    { value: "8.500+", label: t("stats.subscribers") },
    { value: "24", label: t("stats.courses") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(closest-side, oklch(0.82 0.24 145 / 0.6), transparent)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
                <Sparkles className="h-3 w-3" />
                {t("hero.eyebrow")}
              </p>
              <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
                {t("hero.title")}
                <br />
                <span className="neon-text">{t("hero.title.parens")}</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">{t("hero.subtitle")}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/academia"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition neon-glow"
                >
                  {t("hero.cta.primary")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/mongomail"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/60 hover:bg-secondary transition"
                >
                  {t("hero.cta.secondary")}
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {["A", "B", "C", "D"].map((n) => (
                    <div
                      key={n}
                      className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-primary/80 to-emerald-700 flex items-center justify-center text-[10px] font-bold text-primary-foreground"
                    >
                      {n}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  +12.000 alumnos ya están dentro
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-6 rounded-2xl bg-primary/10 blur-2xl" aria-hidden />
                <div className="relative terminal-card scanlines p-1">
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/60 bg-terminal/80">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                    <span className="ml-2 text-[10px] font-mono text-muted-foreground">
                      mongohacker — zsh
                    </span>
                  </div>
                  <div className="p-5 font-mono text-sm space-y-2 leading-relaxed">
                    <p>
                      <span className="text-primary">$</span> whoami
                    </p>
                    <p className="text-muted-foreground">mongo-hacker · curioso digital</p>
                    <p>
                      <span className="text-primary">$</span> ls ./skills
                    </p>
                    <p className="text-muted-foreground">
                      cybersec/ &nbsp; ai/ &nbsp; code/ &nbsp; productivity/
                    </p>
                    <p>
                      <span className="text-primary">$</span> ./{t("hero.terminal.cmd")}
                    </p>
                    <p className="neon-text">
                      [OK] sesión iniciada — bienvenido, humano
                      <span className="caret" />
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6">
                  <Logo size={88} className="ring-4 ring-background neon-glow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <div className="font-display text-3xl md:text-4xl font-bold neon-text">{s.value}</div>
                <div className="mt-1 text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-mono">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">~/rutas</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">{t("categories.title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("categories.subtitle")}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.id}
                to="/academia"
                search={{ cat: c.id }}
                className="terminal-card group p-6 flex flex-col"
              >
                <div className={`h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center ${c.accent}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold group-hover:text-primary transition">
                  {t(c.labelKey)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc[lang]}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-primary opacity-0 group-hover:opacity-100 transition">
                  Explorar <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured courses */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">~/cursos-destacados</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">Lo que están viendo todos</h2>
          </div>
          <Link to="/academia" className="text-sm text-primary hover:underline font-mono whitespace-nowrap">
            ver todos →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>

      {/* Why MongoHacker */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">~/por-qué</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">
              Tech complicada, <br />
              <span className="neon-text">explicada en humano</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Cero rollos académicos. Cada lección está pensada para que entiendas, practiques y aproveches lo aprendido
              desde el primer día. Sin pretender ser experto: solo más libre con la tecnología.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Lecciones cortas y visuales",
                "Misiones prácticas, no teoría aburrida",
                "Certificado al terminar cada curso",
                "Comunidad activa en Discord",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Shield, label: "Defensa", color: "text-emerald-400" },
              { icon: Brain, label: "IA", color: "text-cyan-400" },
              { icon: Code2, label: "Código", color: "text-lime-400" },
              { icon: Zap, label: "Flow", color: "text-amber-400" },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="terminal-card p-6 aspect-square flex flex-col justify-between">
                <Icon className={`h-8 w-8 ${color}`} />
                <div>
                  <div className="font-mono text-xs text-muted-foreground">module</div>
                  <div className="font-display text-2xl font-bold">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog highlights */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">~/blog</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">Última hora sin rollos</h2>
          </div>
          <Link to="/blog" className="text-sm text-primary hover:underline font-mono whitespace-nowrap">
            ir al blog →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {featuredArticles.map((a) => (
            <ArticleCard key={a.slug} article={a} featured />
          ))}
        </div>
      </section>

      {/* CTA Newsletter */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
        <div className="relative overflow-hidden rounded-2xl terminal-card p-8 md:p-12 scanlines">
          <div
            className="absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(closest-side, oklch(0.82 0.24 145 / 0.6), transparent)" }}
            aria-hidden
          />
          <div className="relative">
            <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-[0.2em]">
              <Terminal className="h-3.5 w-3.5" /> ~/mongomail
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold max-w-2xl">
              Únete al clan: <span className="neon-text">una newsletter semanal</span> que no apesta.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">{t("mongomail.subtitle")}</p>
            <div className="mt-6 max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
