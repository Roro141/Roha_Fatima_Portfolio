import { useEffect, useState } from "react";
import { PaperWindow } from "@/components/PaperWindow";
import {
  AboutApp, ProjectsApp, ResumeApp, GithubApp, LinkedinApp
} from "@/components/PaperApps";
import {
  SketchUser, SketchFolder, SketchBook, SketchGithub, SketchLinkedin
} from "@/components/SketchSvg";

type AppId = "about" | "projects" | "resume" | "github" | "linkedin";

const APPS = [
  { id: "about"    as AppId, label: "about",    Icon: SketchUser,     accent: "yellow" as const, component: AboutApp,    initial: { x: 140, y: 70,  w: 500, h: 440 } },
  { id: "projects" as AppId, label: "projects", Icon: SketchFolder,   accent: "pink"   as const, component: ProjectsApp, initial: { x: 560, y: 90,  w: 460, h: 420 } },
  { id: "resume"   as AppId, label: "resume",   Icon: SketchBook,     accent: "blue"   as const, component: ResumeApp,   initial: { x: 160, y: 370, w: 400, h: 280 } },
  { id: "github"   as AppId, label: "github",   Icon: SketchGithub,   accent: "green"  as const, component: GithubApp,   initial: { x: 580, y: 380, w: 320, h: 200 } },
  { id: "linkedin" as AppId, label: "linkedin", Icon: SketchLinkedin, accent: "yellow" as const, component: LinkedinApp, initial: { x: 780, y: 240, w: 320, h: 200 } },
];

export default function Index() {
  const [open,      setOpen]      = useState<AppId[]>(["about"]);
  const [minimized, setMinimized] = useState<AppId[]>([]);
  const [zMap,      setZMap]      = useState<Record<string, number>>({ about: 1 });
  const [topZ,      setTopZ]      = useState(1);
  const [time,      setTime]      = useState("");

  useEffect(() => {
    document.title = "Roha Fatima · portfolio";
    const tick = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const t = setInterval(tick, 60000);
    return () => clearInterval(t);
  }, []);

  const raise = (id: AppId) =>
    setTopZ(z => {
      const n = z + 1;
      setZMap(m => ({ ...m, [id]: n }));
      return n;
    });

  // open or bring to front (if minimized, restore it)
  const toggle = (id: AppId) => {
    if (minimized.includes(id)) {
      setMinimized(m => m.filter(x => x !== id));
      raise(id);
      return;
    }
    if (!open.includes(id)) setOpen(o => [...o, id]);
    raise(id);
  };

  const close    = (id: AppId) => {
    setOpen(o => o.filter(x => x !== id));
    setMinimized(m => m.filter(x => x !== id));
  };

  const minimize = (id: AppId) => {
    setMinimized(m => m.includes(id) ? m : [...m, id]);
  };

  const restore  = (id: AppId) => {
    setMinimized(m => m.filter(x => x !== id));
    raise(id);
  };

  // windows that are open but NOT minimized → render on desktop
  const visible = open.filter(id => !minimized.includes(id));

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col">

      {/* top bar */}
      <header className="shrink-0 z-50 flex items-center justify-between px-4 py-1.5 border-b-2 border-dashed border-foreground/25 bg-paper/80">
        <span className="font-marker text-base text-foreground/70">Roha F.</span>
        <span className="font-scribble text-foreground/45 text-sm">{time}</span>
      </header>

      <div className="flex flex-1 overflow-hidden" style={{ marginBottom: 44 }}>

        {/* sidebar */}
        <aside className="shrink-0 z-40 w-20 flex flex-col items-center gap-1 pt-4 pb-4 border-r-2 border-dashed border-foreground/25 bg-paper/60">
          {APPS.map(a => (
            <button
              key={a.id}
              onClick={() => toggle(a.id)}
              className="group relative flex flex-col items-center gap-1 w-16 py-2 rounded transition-all hover:bg-foreground/5"
              aria-label={a.label}
            >
              <a.Icon className="w-9 h-9 text-foreground group-hover:scale-110 transition-transform" />
              <span className="font-marker text-[10px] text-foreground/50 leading-tight">{a.label}</span>
              {open.includes(a.id) && !minimized.includes(a.id) && (
                <span className="w-1 h-1 rounded-full bg-foreground/40" />
              )}
              {minimized.includes(a.id) && (
                <span className="w-1 h-1 rounded-full bg-foreground/20" />
              )}
            </button>
          ))}
        </aside>

        {/* desktop */}
        <main className="relative flex-1 overflow-hidden">
          <div className="absolute top-4 left-5 z-10 pointer-events-none select-none">
            <p className="font-marker text-3xl text-foreground leading-none">Roha Fatima</p>
            <p className="font-scribble text-foreground/50 text-lg mt-0.5">Full stack developer</p>
          </div>

          {APPS.filter(a => visible.includes(a.id)).map(a => {
            const Comp = a.component;
            return (
              <PaperWindow
                key={a.id}
                id={a.id}
                title={a.label}
                accent={a.accent}
                initial={a.initial}
                z={(zMap[a.id] ?? 1) + 10}
                onClose={() => close(a.id)}
                onMinimize={() => minimize(a.id)}
                onFocus={() => raise(a.id)}
              >
                <Comp />
              </PaperWindow>
            );
          })}
        </main>
      </div>

      {/* taskbar — shows minimized windows + clock */}
      <footer className="absolute bottom-0 left-0 right-0 z-50 h-11 flex items-center gap-2 px-3 border-t-2 border-dashed border-foreground/25 bg-paper/80">
        <span className="font-marker text-sm text-foreground/50 mr-2">Roha F.</span>

        {/* minimized window chips */}
        {minimized.map(id => {
          const app = APPS.find(a => a.id === id);
          if (!app) return null;
          return (
            <button
              key={id}
              onClick={() => restore(id)}
              className="flex items-center gap-1.5 px-2 py-1 sketch-box text-xs font-marker text-foreground/70 hover:text-foreground transition-colors"
              style={{ fontSize: 11 }}
            >
              <app.Icon className="w-4 h-4" />
              {app.label}
            </button>
          );
        })}

        <span className="ml-auto font-scribble text-sm text-foreground/45">{time}</span>
      </footer>
    </div>
  );
}
