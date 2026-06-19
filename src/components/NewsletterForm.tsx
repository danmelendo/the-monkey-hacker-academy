import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { SUBSCRIBE_EMAIL } from "@/lib/site";

const schema = z.object({ email: z.string().email() });

export function NewsletterForm({ variant = "default" }: { variant?: "default" | "compact" }) {
  const { t } = useI18n();
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse({ email });
    if (!r.success) {
      toast.error(t("form.invalidEmail"));
      return;
    }
    // Sin backend: abrimos la app de correo del usuario con un alta prerrellenada.
    const subject = encodeURIComponent("Alta en MongoMail");
    const body = encodeURIComponent(
      `¡Hola! Quiero suscribirme a MongoMail.\n\nMi email: ${email}\n\n¡Gracias!`,
    );
    window.location.href = `mailto:${SUBSCRIBE_EMAIL}?subject=${subject}&body=${body}`;
    toast.success(t("mongomail.success"));
    setEmail("");
  };

  return (
    <form
      onSubmit={submit}
      className={`flex w-full ${variant === "compact" ? "flex-row" : "flex-col sm:flex-row"} gap-2`}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("mongomail.placeholder")}
        required
        maxLength={255}
        className="flex-1 rounded-md bg-input border border-border px-4 py-3 text-sm font-mono outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition placeholder:text-muted-foreground/60"
      />
      <button
        type="submit"
        className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition neon-glow whitespace-nowrap"
      >
        {t("mongomail.cta")}
      </button>
    </form>
  );
}
