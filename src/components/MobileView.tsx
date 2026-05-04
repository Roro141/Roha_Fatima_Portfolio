import { useState, useEffect } from "react";
import {
  AboutApp, ProjectsApp, ResumeApp, GithubApp, LinkedinApp
} from "@/components/PaperApps";
import {
  SketchUser, SketchFolder, SketchBook, SketchGithub, SketchLinkedin
} from "@/components/SketchSvg";

type AppId = "about" | "projects" | "resume" | "github" | "linkedin";

const APPS = [
  { id: "about"    as AppId, label: "about",    Icon: SketchUser,     accent: "yellow" as const, component: AboutApp    },
  { id: "projects" as AppId, label: "projects", Icon: SketchFolder,   accent: "pink"   as const, component: ProjectsApp },
  { id: "resume"   as AppId, label: "resume",   Icon: SketchBook,     accent: "blue"   as const, component: ResumeApp   },
  { id: "github"   as AppId, label: "github",   Icon: SketchGithub,   accent: "green"  as const, component: GithubApp   },
  { id: "linkedin" as AppId, label: "linkedin", Icon: SketchLinkedin, accent: "yellow" as const, component: LinkedinApp },
];

const accentBg: Record<string, string> = {
  yellow: "hsl(var(--highlight-yellow) / 0.5)",
  pink:   "hsl(var(--highlight-pink) / 0.4)",
  blue:   "hsl(var(--highlight-blue) / 0.4)",
  green:  "hsl(var(--highlight-green) / 0.4)",
};

export function MobileView() {
  const [active, setActive] = useState<AppId | null>(null);
  const [time, setTime]     = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const t = setInterval(tick, 60000);
    return () => clearInterval(t);
  }, []);

  const open = (id: AppId) => {
    if (id === "github")   { window.open("https://github.com/Roro141", "_blank"); return; }
    if (id === "linkedin") { window.open("https://www.linkedin.com/in/roha-fatima-cs/", "_blank"); return; }
    setActive(id);
  };

  const activeApp = APPS.find(a => a.id === active);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden flex flex-col"
      style={{
        background: "hsl(var(--paper))",
        backgroundImage: `
          repeating-linear-gradient(
            to bottom,
            transparent 0px, transparent 31px,
            hsl(var(--rule-line) / 0.3) 31px,
            hsl(var(--rule-line) / 0.3) 32px
          )
        `,
      }}
    >
      {/* status bar */}
      <div className="shrink-0 flex items-center justify-between px-5 pt-10 pb-3">
        <span className="font-marker text-2xl text-foreground leading-none">Roha Fatima</span>
        <span className="font-scribble text-foreground/50 text-lg">{time}</span>
      </div>

      <p className="font-scribble text-foreground/45 text-base px-5 mb-6">
        full stack developer · Texas
      </p>

      {/* icon grid */}
      <div className="flex-1 overflow-y-auto px-5">
        <div className="grid grid-cols-3 gap-5">
          {APPS.map(a => (
            <button
              key={a.id}
              onClick={() => open(a.id)}
              className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              <div
                className="w-16 h-16 sketch-box flex items-center justify-center"
                style={{ background: accentBg[a.accent] }}
              >
                <a.Icon className="w-8 h-8 text-foreground" />
              </div>
              <span className="font-marker text-xs text-foreground/60">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* bottom bar */}
      <div className="shrink-0 border-t-2 border-dashed border-foreground/20 px-5 py-3 bg-paper/80">
        <p className="font-marker text-xs text-foreground/35 text-center">paperOS · mobile</p>
      </div>

      {/* sheet overlay */}
      {active && activeApp && (
        <div
          className="absolute inset-0 z-50 flex flex-col"
          style={{ background: "hsl(var(--paper))" }}
        >
          {/* sheet header */}
          <div
            className="shrink-0 flex items-center justify-between px-5 pt-10 pb-3 border-b-2 border-dashed border-foreground/20"
            style={{ background: accentBg[activeApp.accent] }}
          >
            <h2 className="font-marker text-xl text-foreground">{activeApp.label}</h2>
            <button
              onClick={() => setActive(null)}
              className="font-marker text-sm text-foreground/60 border border-dashed border-foreground/30 px-3 py-1 rounded"
            >
              ← back
            </button>
          </div>

          {/* sheet content */}
          <div className="flex-1 overflow-y-auto p-5">
            <activeApp.component />
          </div>
        </div>
      )}
    </div>
  );
}