import { useEffect } from "react";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

// Carga un script externo una sola vez (client-side) y, si ya existe, intenta
// reprocesar los embeds de Instagram.
function useExternalScript(src: string, enabled: boolean) {
  useEffect(() => {
    if (!enabled || typeof document === "undefined") return;
    const w = window as unknown as { instgrm?: { Embeds?: { process?: () => void } } };
    if (document.querySelector(`script[src="${src}"]`)) {
      w.instgrm?.Embeds?.process?.();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    document.body.appendChild(s);
  }, [src, enabled]);
}

// Marco común con la estética terminal del sitio.
function EmbedFrame({
  label,
  handle,
  accent,
  children,
}: {
  label: string;
  handle: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <div className="terminal-card overflow-hidden flex flex-col">
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-border/60 bg-terminal/60">
        <span className={`font-mono text-xs uppercase tracking-wider ${accent}`}>{label}</span>
        <span className="font-mono text-[11px] text-muted-foreground">{handle}</span>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

// Tarjeta enlazada genérica: para "próximamente" o para contenido que no se
// puede incrustar (p. ej. una publicación de la comunidad de YouTube).
function EmbedCard({ href, note, cta }: { href: string; note: string; cta: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center gap-3 p-8 min-h-[280px]">
      <p className="font-mono text-xs text-muted-foreground">{note}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        {cta} <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}

// Analiza una URL de YouTube y devuelve el ID y si es un Short (vertical).
// Devuelve id=null para URLs no incrustables (p. ej. publicaciones /post/).
function parseYouTube(url: string): { id: string | null; isShort: boolean } {
  const short = url.match(/\/shorts\/([\w-]{11})/);
  if (short) return { id: short[1], isShort: true };
  const patterns = [/[?&]v=([\w-]{11})/, /youtu\.be\/([\w-]{11})/, /\/embed\/([\w-]{11})/];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return { id: m[1], isShort: false };
  }
  return { id: null, isShort: false };
}

export function YouTubeEmbed({
  url,
  handle,
  profileUrl,
}: {
  url: string;
  handle: string;
  profileUrl: string;
}) {
  const { id: videoId, isShort } = url ? parseYouTube(url) : { id: null, isShort: false };
  return (
    <EmbedFrame label="YouTube" handle={handle} accent="text-red-500">
      {videoId ? (
        <div className={isShort ? "bg-black py-4" : "aspect-video w-full bg-black"}>
          <div className={isShort ? "aspect-[9/16] w-full max-w-[340px] mx-auto" : "h-full w-full"}>
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
              title={isShort ? "Short de YouTube" : "Vídeo de portada de YouTube"}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      ) : url ? (
        // URL no incrustable (p. ej. publicación de la comunidad): tarjeta enlazada.
        <EmbedCard href={url} note="// publicación de la comunidad" cta="Ver en YouTube" />
      ) : (
        <EmbedCard href={profileUrl} note="// contenido en camino" cta="Ver el canal" />
      )}
    </EmbedFrame>
  );
}

export function InstagramEmbed({
  postUrl,
  handle,
  profileUrl,
}: {
  postUrl: string;
  handle: string;
  profileUrl: string;
}) {
  useExternalScript("https://www.instagram.com/embed.js", !!postUrl);
  // El embed oficial espera el permalink canónico /p/ o /reel/ (sin el usuario).
  const permalink = postUrl.replace(/instagram\.com\/[^/]+\/(p|reel)\//, "instagram.com/$1/");
  return (
    <EmbedFrame label="Instagram" handle={handle} accent="text-pink-500">
      {postUrl ? (
        <div className="bg-background p-2 overflow-auto max-h-[640px]">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={permalink}
            data-instgrm-version="14"
            style={{ margin: 0, width: "100%", minWidth: 0 }}
          >
            <a href={permalink} target="_blank" rel="noopener noreferrer">
              Ver este post en Instagram
            </a>
          </blockquote>
        </div>
      ) : (
        <EmbedCard href={profileUrl} note="// contenido en camino" cta="Ver Instagram" />
      )}
    </EmbedFrame>
  );
}

export function TikTokEmbed({
  videoUrl,
  handle,
  profileUrl,
}: {
  videoUrl: string;
  handle: string;
  profileUrl: string;
}) {
  const videoId = videoUrl.match(/video\/(\d+)/)?.[1] ?? "";
  useExternalScript("https://www.tiktok.com/embed.js", !!(videoUrl && videoId));
  return (
    <EmbedFrame label="TikTok" handle={handle} accent="text-foreground">
      {videoUrl && videoId ? (
        <div className="bg-background p-2 overflow-auto max-h-[640px]">
          <blockquote
            className="tiktok-embed"
            cite={videoUrl}
            data-video-id={videoId}
            style={{ maxWidth: "100%", minWidth: 0, margin: 0 }}
          >
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
              Ver este vídeo en TikTok
            </a>
          </blockquote>
        </div>
      ) : (
        <EmbedCard href={profileUrl} note="// contenido en camino" cta="Ver TikTok" />
      )}
    </EmbedFrame>
  );
}
