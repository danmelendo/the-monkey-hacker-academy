import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Globe } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const links = [
    { to: "/academia", label: t("nav.academy") },
    { to: "/blog", label: t("nav.blog") },
    { to: "/mongomail", label: t("nav.mongomail") },
    { to: "/recursos", label: t("nav.resources") },
    { to: "/comunidad", label: t("nav.community") },
    { to: "/sobre", label: t("nav.about") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <Logo size={36} className="ring-2 ring-primary/40 group-hover:ring-primary transition" />
          <div className="font-display text-lg font-bold tracking-tight">
            Mongo<span className="neon-text">Hacker</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-2 text-sm font-medium rounded-md transition ${
                  active
                    ? "text-primary bg-primary/10"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="flex items-center gap-1.5 text-xs font-mono uppercase text-muted-foreground hover:text-primary transition"
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4" />
            {lang}
          </button>
          <Link
            to="/mongomail"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition neon-glow"
          >
            {t("nav.subscribe")}
          </Link>
        </div>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur">
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-foreground/80 hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center justify-between mt-2 pt-3 border-t border-border/60">
              <button
                onClick={() => setLang(lang === "es" ? "en" : "es")}
                className="flex items-center gap-1.5 text-xs font-mono uppercase text-muted-foreground"
              >
                <Globe className="h-4 w-4" /> {lang === "es" ? "Español" : "English"}
              </button>
              <Link
                to="/mongomail"
                onClick={() => setOpen(false)}
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                {t("nav.subscribe")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
