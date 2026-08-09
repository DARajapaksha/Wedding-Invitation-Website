import { useState, type FormEvent } from "react";
import {
  SHEET_URL,
  WHATSAPP_NUMBER,
  buildWhatsAppMessage,
} from "../config";

type Status = "idle" | "submitting" | "done" | "error";

const inputClass =
  "w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30";

const labelClass =
  "mb-2 block text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase";

export default function RSVPForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    mobile: "",
    attending: true,
    message: "",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setStatus("submitting");

    const body = new URLSearchParams({
      action: "submit",
      name: form.name,
      whatsapp: form.whatsapp,
      mobile: form.mobile,
      attending: form.attending ? "Yes" : "No",
      message: form.message,
    });

    try {
      // Apps Script Web App accepts form-encoded POSTs without a CORS preflight.
      await fetch(SHEET_URL, { method: "POST", mode: "no-cors", body });
      setStatus("done");

      // Redirect to WhatsApp with the pre-filled invitation message.
      const text = encodeURIComponent(buildWhatsAppMessage(form.name));
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
        "_blank",
        "noopener,noreferrer",
      );
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <section id="rsvp" className="px-6 py-20">
        <div className="mx-auto max-w-md rounded-lg border border-border bg-card px-8 py-12 text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
          <span className="text-4xl text-primary/80">❧</span>
          <h2 className="mt-6 font-serif text-3xl font-light text-foreground">Thank you</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your RSVP has been received. We've opened WhatsApp so you can send
            your note to us — we can't wait to celebrate together.
          </p>
          <button
            type="button"
            onClick={() => {
              setForm({
                name: "",
                whatsapp: "",
                mobile: "",
                attending: true,
                message: "",
              });
              setStatus("idle");
            }}
            className="mt-6 text-xs tracking-[0.2em] text-primary uppercase underline-offset-4 hover:underline"
          >
            Submit another response
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="px-6 py-20">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <p className="text-[10px] font-medium tracking-[0.35em] text-muted-foreground uppercase">
            Kindly respond
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light text-foreground">RSVP</h2>
          <div className="mx-auto mt-6 h-px w-16 bg-primary/40" />
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label className={labelClass} htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              required
              className={inputClass}
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="whatsapp">
              WhatsApp number
            </label>
            <input
              id="whatsapp"
              type="tel"
              inputMode="tel"
              className={inputClass}
              placeholder="+1 555 123 4567"
              value={form.whatsapp}
              onChange={(e) => update("whatsapp", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="mobile">
              Mobile number
            </label>
            <input
              id="mobile"
              type="tel"
              inputMode="tel"
              className={inputClass}
              placeholder="+1 555 987 6543"
              value={form.mobile}
              onChange={(e) => update("mobile", e.target.value)}
            />
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-card px-4 py-3">
            <input
              type="checkbox"
              className="h-4 w-4 accent-[var(--primary)]"
              checked={form.attending}
              onChange={(e) => update("attending", e.target.checked)}
            />
            <span className="text-sm text-foreground">
              I will joyfully attend
            </span>
          </label>

          <div>
            <label className={labelClass} htmlFor="message">
              A note for the couple
            </label>
            <textarea
              id="message"
              rows={4}
              className={inputClass + " resize-none"}
              placeholder="Share your warm wishes…"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-accent">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-md bg-primary px-6 py-3.5 text-sm tracking-[0.2em] text-primary-foreground uppercase transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Send RSVP"}
          </button>
        </form>
      </div>
    </section>
  );
}
