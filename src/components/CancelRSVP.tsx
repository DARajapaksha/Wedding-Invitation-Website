import { useEffect, useState } from "react";
import { SHEET_URL } from "../config";

export default function CancelRSVP({ onExit }: { onExit: () => void }) {
  const [row, setRow] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "cancelling" | "success" | "error">("idle");

  useEffect(() => {
    // Extract row from URL params, e.g. #/cancel?row=2
    const params = new URLSearchParams(window.location.hash.split("?")[1]);
    const r = params.get("row");
    if (r) {
      setRow(r);
    } else {
      setStatus("error");
    }
  }, []);

  async function handleCancel() {
    if (!row) return;
    setStatus("cancelling");
    try {
      await fetch(`${SHEET_URL}?action=delete&row=${row}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-20 text-center">
      <h1 className="font-serif text-3xl text-foreground">Cancel RSVP</h1>
      
      {status === "idle" && (
        <>
          <p className="mt-4 text-muted-foreground">
            Are you sure you want to cancel your RSVP?
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={onExit}
              className="rounded-md border border-border px-6 py-3 text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:bg-muted"
            >
              Keep RSVP
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-md bg-accent px-6 py-3 text-xs tracking-widest text-accent-foreground uppercase transition-colors hover:bg-accent/90"
            >
              Cancel RSVP
            </button>
          </div>
        </>
      )}

      {status === "cancelling" && (
        <p className="mt-6 animate-pulse text-muted-foreground tracking-widest uppercase text-xs">
          Cancelling...
        </p>
      )}

      {status === "success" && (
        <>
          <p className="mt-6 text-foreground">
            Your RSVP has been successfully cancelled.
          </p>
          <button
            type="button"
            onClick={onExit}
            className="mt-8 rounded-md bg-secondary px-6 py-3 text-xs tracking-widest text-secondary-foreground uppercase transition-colors hover:bg-secondary/80"
          >
            Return to Home
          </button>
        </>
      )}

      {status === "error" && (
        <>
          <p className="mt-6 text-accent">
            An error occurred while cancelling your RSVP. Please try again or contact the couple directly.
          </p>
          <button
            type="button"
            onClick={onExit}
            className="mt-8 rounded-md border border-border px-6 py-3 text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:bg-muted"
          >
            Return to Home
          </button>
        </>
      )}
    </div>
  );
}
