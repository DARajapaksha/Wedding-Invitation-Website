import { useEffect, useMemo, useState } from "react";
import { SHEET_URL, buildAdminConfirmationMessage } from "../config";

type Row = {
  row: number;
  timestamp: string;
  name: string;
  whatsapp: string;
  mobile: string;
  attending: string;
  message: string;
};

export default function AdminPanel({ onExit }: { onExit: () => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${SHEET_URL}?action=list`);
      const data = await res.json();
      setRows(Array.isArray(data.rows) ? data.rows : []);
    } catch {
      setError(
        "Could not load entries. Confirm SHEET_URL is deployed with public access.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function remove(row: number) {
    if (!confirm("Delete this RSVP entry?")) return;
    setDeleting(row);
    try {
      await fetch(`${SHEET_URL}?action=delete&row=${row}`);
      // Optimistically drop it; row numbers below shift, so reload after.
      setRows((r) => r.filter((x) => x.row !== row));
      setTimeout(load, 600);
    } catch {
      setError("Delete failed. Please try again.");
    } finally {
      setDeleting(null);
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.name?.toLowerCase().includes(q) ||
        String(r.mobile ?? "").toLowerCase().includes(q) ||
        String(r.whatsapp ?? "").toLowerCase().includes(q),
    );
  }, [rows, query]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Wedding admin
          </p>
          <h1 className="mt-1 font-serif text-3xl text-foreground">
            RSVP Entries
          </h1>
        </div>
        <button
          type="button"
          onClick={onExit}
          className="text-xs tracking-[0.2em] text-primary uppercase underline-offset-4 hover:underline"
        >
          ← Back
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or mobile number…"
          className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
        <button
          type="button"
          onClick={load}
          className="rounded-md border border-border bg-secondary px-5 py-3 text-xs tracking-[0.2em] text-secondary-foreground uppercase transition-colors hover:bg-secondary/80"
        >
          Refresh
        </button>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        {loading
          ? "Loading…"
          : `${filtered.length} of ${rows.length} ${
              rows.length === 1 ? "entry" : "entries"
            }`}
      </p>

      {error && (
        <p className="mt-4 rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
          {error}
        </p>
      )}

      <div className="mt-4 space-y-3">
        {filtered.map((r) => (
          <div
            key={r.row}
            className="rounded-lg border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-serif text-lg text-foreground">{r.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {r.mobile} · WA {r.whatsapp}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] tracking-wide uppercase ${
                    String(r.attending).toLowerCase() === "yes"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {String(r.attending).toLowerCase() === "yes"
                    ? "Attending"
                    : "Declined"}
                </span>
                <div className="mt-1 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      // Only send if a whatsapp number is provided
                      if (!r.whatsapp) {
                        alert("No WhatsApp number provided for this guest.");
                        return;
                      }
                      
                      const cancelLink = `${window.location.origin}${window.location.pathname}#/cancel?row=${r.row}`;
                      const msg = buildAdminConfirmationMessage(r.name, cancelLink);
                      
                      // Format number: ensure it only has digits
                      const cleanNumber = String(r.whatsapp).replace(/\D/g, "");
                      window.open(
                        `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`,
                        "_blank"
                      );
                    }}
                    className="text-xs tracking-[0.15em] text-primary uppercase underline-offset-4 hover:underline"
                  >
                    Confirm via WA
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(r.row)}
                    disabled={deleting === r.row}
                    className="text-xs tracking-[0.15em] text-accent uppercase underline-offset-4 hover:underline disabled:opacity-50"
                  >
                    {deleting === r.row ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
            </div>
            {r.message && (
              <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground italic">
                "{r.message}"
              </p>
            )}
          </div>
        ))}

        {!loading && !error && filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No matching entries.
          </p>
        )}
      </div>
    </div>
  );
}
