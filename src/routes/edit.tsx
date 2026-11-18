import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SitePage } from "./index";

export const Route = createFileRoute("/edit")({
  head: () => ({
    meta: [
      { title: "Edit Site – Tree Plantation Drive | JRU Group 9" },
      { name: "description", content: "Password-protected editing for the JRU Group 9 tree plantation site." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EditPage,
});

const PASSWORD = import.meta.env.VITE_EDIT_PASSWORD ?? "";
const UNLOCK_KEY = "jru-edit-unlocked";

function EditPage() {
  const [unlocked, setUnlocked] = useState(() => {
    try { return sessionStorage.getItem(UNLOCK_KEY) === "1" && !!sessionStorage.getItem("jru-edit-pw"); } catch { return false; }
  });
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) return <SitePage edit />;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (PASSWORD && pw === PASSWORD) {
      try { sessionStorage.setItem(UNLOCK_KEY, "1"); sessionStorage.setItem("jru-edit-pw", pw); } catch {}
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-card rounded-2xl border-4 border-accent shadow-lg p-8 text-center">
        <div className="text-4xl">🔒</div>
        <h1 className="text-xl font-bold mt-3">Edit Mode</h1>
        <p className="text-sm text-muted-foreground mt-1">Site edit karne ke liye password daalein</p>
        <input
          type="password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setError(false); }}
          placeholder="Password"
          autoFocus
          className="mt-5 w-full rounded-lg border border-border bg-background px-3 py-2 text-center outline-none focus:border-primary"
        />
        {error && <p className="text-sm text-destructive mt-2">Galat password, dobara try karein</p>}
        <button type="submit" className="mt-4 w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2">
          Unlock
        </button>
      </form>
    </main>
  );
}
