import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { getSiteData, saveSiteData } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tree Plantation Drive – Jharkhand Rai University | Group 9" },
      { name: "description", content: "Group 9 team of the Jharkhand Rai University campus tree plantation drive." },
      { property: "og:title", content: "Tree Plantation Drive – Jharkhand Rai University" },
      { property: "og:description", content: "Meet Group 9, led by Sakshi Yadav." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Member = { id: string; name: string; enroll: string; role: string; phone: string; photo: string };
type Data = { college: string; title: string; note: string; group: string; date: string; venue: string; photos: string[]; members: Member[] };

const roll = (n: number) => `BB/26/${String(n).padStart(3, "0")}`;
const makeSeed = (): Data => ({
  college: "Jharkhand Rai University",
  title: "Campus Tree Plantation Drive",
  note: "Planting one tree today for a greener campus tomorrow. 🌱",
  group: "Group 9",
  date: "November 2026",
  venue: "JRU Campus, Ranchi",
  photos: ["", ""],
  members: [
    ["Sakshi Yadav", 68, "Team Leader", "8540996955"],
    ["Pallavi Kujur", 86, "Member", ""],
    ["Chahat Kumari", 81, "Member", ""],
    ["Laxmi Baitha", 48, "Member", ""],
    ["Muktamani Kumari", 67, "Member", ""],
    ["Manju Baraik", 29, "Member", ""],
    ["Shweta Kumari", 43, "Member", ""],
    ["Megha Mandal", 33, "Member", ""],
    ["Rishav Raj", 40, "Member", ""],
    ["Zainab Praveen", 45, "Member", ""],
  ].map(([name, n, role, phone], i) => ({ id: "m" + i, name: name as string, enroll: roll(n as number), role: role as string, phone: phone as string, photo: "" })),
});


function Edit({ value, onChange, className = "" }: { value: string; onChange: (v: string) => void; className?: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full bg-transparent text-center rounded px-1 outline-none focus:bg-muted ${className}`}
    />
  );
}

function View({ value, className = "" }: { value: string; onChange?: (v: string) => void; className?: string }) {
  return <div className={className}>{value}</div>;
}

function Photo({ m, big, onPhoto, edit = false }: { m: Member; big?: boolean; onPhoto: (url: string) => void; edit?: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  const size = big ? "h-32 w-32" : "h-24 w-24";
  const cls = `${size} mx-auto rounded-full overflow-hidden border-4 ${big ? "border-accent" : "border-primary"} bg-muted flex items-center justify-center text-sm text-muted-foreground`;
  const inner = m.photo ? <img src={m.photo} alt={m.name} className="h-full w-full object-cover" /> : <span>{edit ? "📷 Add photo" : "🌱"}</span>;
  if (!edit) return <div className={cls}>{inner}</div>;
  return (
    <button type="button" onClick={() => ref.current?.click()} className={cls} aria-label={`Change photo of ${m.name}`}>
      {inner}
      <input ref={ref} type="file" accept="image/*" hidden onChange={(e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const img = new Image();
        img.onload = () => {
          const c = document.createElement("canvas");
          const s = 300; c.width = s; c.height = s;
          const r = Math.min(img.width, img.height);
          c.getContext("2d")!.drawImage(img, (img.width - r) / 2, (img.height - r) / 2, r, r, 0, 0, s, s);
          onPhoto(c.toDataURL("image/jpeg", 0.8));
        };
        img.src = URL.createObjectURL(f);
      }} />
    </button>
  );
}

function WidePhoto({ url, onPhoto, edit = false, label }: { url: string; onPhoto: (u: string) => void; edit?: boolean; label: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const cls = "w-full aspect-video rounded-xl overflow-hidden border-2 border-border bg-muted flex items-center justify-center text-sm text-muted-foreground shadow";
  const inner = url ? <img src={url} alt={label} className="h-full w-full object-cover" /> : <span>{edit ? "📷 Photo lagayein" : "🌱 Event photo"}</span>;
  if (!edit) return <div className={cls}>{inner}</div>;
  return (
    <button type="button" onClick={() => ref.current?.click()} className={cls} aria-label={`Change ${label}`}>
      {inner}
      <input ref={ref} type="file" accept="image/*" hidden onChange={(e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const img = new Image();
        img.onload = () => {
          const c = document.createElement("canvas");
          c.width = 800; c.height = 450;
          const r = Math.max(800 / img.width, 450 / img.height);
          const w = img.width * r, h = img.height * r;
          c.getContext("2d")!.drawImage(img, (800 - w) / 2, (450 - h) / 2, w, h);
          onPhoto(c.toDataURL("image/jpeg", 0.8));
        };
        img.src = URL.createObjectURL(f);
      }} />
    </button>
  );
}

function Tree({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Tree">
      <path d="M60 108 L60 62" stroke="var(--color-tree-trunk)" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M60 84 L44 70 M60 74 L76 62" stroke="var(--color-tree-trunk)" strokeWidth="5" strokeLinecap="round" fill="none" />
      <ellipse cx="42" cy="56" rx="18" ry="15" fill="var(--color-tree-leaf-deep)" />
      <ellipse cx="78" cy="56" rx="18" ry="15" fill="var(--color-tree-leaf-deep)" />
      <ellipse cx="60" cy="44" rx="28" ry="23" fill="var(--color-tree-leaf)" />
      <ellipse cx="60" cy="30" rx="17" ry="13" fill="var(--color-tree-leaf-deep)" />
      <ellipse cx="50" cy="46" rx="9" ry="7" fill="var(--color-tree-leaf)" opacity="0.75" />
    </svg>
  );
}

export function SitePage({ edit = false }: { edit?: boolean }) {
  const [d, setD] = useState<Data>(() => makeSeed());
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState("");
  useEffect(() => {
    getSiteData().then(({ json }) => {
      if (json) {
        const parsed = { ...makeSeed(), ...JSON.parse(json) } as Data;
        if (!Array.isArray(parsed.photos) || parsed.photos.length < 2) parsed.photos = ["", ""];
        setD(parsed);
      }
    }).catch(() => {}).finally(() => setLoaded(true));
  }, []);
  const first = useRef(true);
  useEffect(() => {
    if (!loaded || !edit) return;
    if (first.current) { first.current = false; return; }
    setStatus("Saving...");
    const t = setTimeout(() => {
      let password = "";
      try { password = sessionStorage.getItem("jru-edit-pw") ?? ""; } catch {}
      saveSiteData({ data: { password, json: JSON.stringify(d) } })
        .then(() => setStatus("Saved ✓ (sabko dikhega)"))
        .catch(() => setStatus("Save nahi hua — dobara try karein"));
    }, 800);
    return () => clearTimeout(t);
  }, [d, loaded, edit]);

  const set = (k: keyof Data) => (v: string) => setD({ ...d, [k]: v });
  const setM = (id: string, patch: Partial<Member>) => setD({ ...d, members: d.members.map((m) => (m.id === id ? { ...m, ...patch } : m)) });
  const leader = d.members.find((m) => m.role.toLowerCase().includes("leader"));
  const others = d.members.filter((m) => m !== leader);

  const Field = edit ? Edit : View;

  return (
    <main className="min-h-screen bg-background text-foreground pb-16">
      <header className="bg-gradient-to-b from-primary to-maroon-deep text-primary-foreground px-4 py-12 text-center border-b-4 border-accent">
        <Tree className="h-24 w-24 mx-auto drop-shadow" />
        <Field value={d.college} onChange={set("college")} className="text-lg mt-2 opacity-90 focus:text-foreground" />
        <Field value={d.title} onChange={set("title")} className="text-3xl md:text-4xl font-bold mt-1 focus:text-foreground" />
        <Field value={d.note} onChange={set("note")} className="mt-2 opacity-90 focus:text-foreground" />
      </header>

      <section className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 px-4 -mt-6">
        {([["Group", "group"], ["Date", "date"], ["Venue", "venue"]] as const).map(([label, k]) => (
          <div key={k} className="bg-card rounded-xl shadow p-3 text-center border border-border">
            <div className="text-xs text-muted-foreground">{label}</div>
            <Field value={d[k]} onChange={set(k)} className="font-semibold" />
          </div>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-4 mt-8">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-primary mb-3">📸 Event Photos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(d.photos ?? ["", ""]).map((p, i) => (
            <WidePhoto key={i} url={p} edit={edit} label={`Event photo ${i + 1}`} onPhoto={(u) => setD({ ...d, photos: (d.photos ?? ["", ""]).map((x, j) => (j === i ? u : x)) })} />
          ))}
        </div>
      </section>

      {leader && (
        <section className="max-w-md mx-auto px-4 mt-10">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-primary mb-3">⭐ Team Leader</h2>
          <div className="bg-card rounded-2xl border-4 border-accent shadow-lg p-6 text-center">
            <Photo m={leader} big edit={edit} onPhoto={(photo) => setM(leader.id, { photo })} />
            <Field value={leader.name} onChange={(name) => setM(leader.id, { name })} className="text-2xl font-bold mt-3" />
            <div className="inline-block bg-accent text-accent-foreground text-xs font-semibold rounded-full px-3 py-1 mt-1">
              {edit
                ? <input value={leader.role} onChange={(e) => setM(leader.id, { role: e.target.value })} className="bg-transparent text-center outline-none w-28" />
                : leader.role}
            </div>
            <div className="mt-3 text-sm text-muted-foreground">Enrollment No.</div>
            <Field value={leader.enroll} onChange={(enroll) => setM(leader.id, { enroll })} className="font-medium" />
            <div className="mt-2 text-sm text-muted-foreground">Contact</div>
            <Field value={leader.phone} onChange={(phone) => setM(leader.id, { phone })} className="font-medium" />
          </div>
        </section>
      )}

      <section className="max-w-5xl mx-auto px-4 mt-12">
        <h2 className="text-center text-2xl font-bold mb-6">Our Team Members</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {others.map((m) => (
            <div key={m.id} className="relative bg-card rounded-xl border border-border shadow-sm p-4 text-center">
              {edit && <button onClick={() => confirm(`Remove ${m.name}?`) && setD({ ...d, members: d.members.filter((x) => x.id !== m.id) })} className="absolute top-1 right-2 text-muted-foreground hover:text-destructive" aria-label="Remove">×</button>}
              <Photo m={m} edit={edit} onPhoto={(photo) => setM(m.id, { photo })} />
              <Field value={m.name} onChange={(name) => setM(m.id, { name })} className="font-semibold mt-2" />
              <Field value={m.enroll} onChange={(enroll) => setM(m.id, { enroll })} className="text-sm text-muted-foreground" />
              <Field value={m.role} onChange={(role) => setM(m.id, { role })} className="text-xs text-primary" />
            </div>
          ))}
        </div>
        {edit && <p className="text-center text-xs text-muted-foreground mt-8">Tip: Kisi bhi text pe tap karke edit karein, photo pe tap karke apni photo lagayein. Sab automatic save hota hai.</p>}
        {edit && status && <p className="fixed bottom-3 right-3 rounded-full bg-primary text-primary-foreground text-xs px-3 py-1.5 shadow">{status}</p>}
      </section>

      <footer className="mt-16 border-t-4 border-accent bg-primary text-primary-foreground px-4 py-6 text-center text-sm">
        <p>
          Made by{" "}
          <a href="https://github.com/ashswin-git" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
            ashswin-git
          </a>
        </p>
        <a
          href="https://github.com/ashswin-git/bba-pal-plantation"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-1 opacity-90 underline underline-offset-2 break-all"
        >
          github.com/ashswin-git/bba-pal-plantation
        </a>
      </footer>
    </main>
  );
}

function Index() {
  return <SitePage />;
}
