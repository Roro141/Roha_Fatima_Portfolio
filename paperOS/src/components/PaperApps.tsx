

const projects = [
  {
    name: "Coding Portfolio",
    year: "'26",
    desc: "Paper like OS system to showcase my work",
    tech: ["react", "typescript", "tailwind"],  
  },
  {
    name: "Agent Jake",
    year: "'25",
    desc: "Voice agent powered by 8 APIs to help users understand their insurance",
    tech: ["python", "api 1", "api 2"],
  },
  {
    name: "Learnmips.com",
    year: "'25",
    desc: "Website that helps users learn MIPS assembly language",
    tech: ["react", "node", "tech"],
  },
  {
    name: "Coding Tracker",
    year: "'25",
    desc: "A coding journal that tracks leetcode questions with notes and filters",
    tech: ["react", "tech", "tech"],
  },
];

const experience = [
  {
    role: "Co-Founder",
    company: "SayCut",
    years: "2023 – now",
    bullets: ["bullet point about what you did", "another thing you did", "one more achievement"],
  },
  {
    role: "Your Role",
    company: "Company",
    years: "20XX – 20XX",
    bullets: ["bullet point about what you did", "another thing you did", "one more achievement"],
  },
];

const skills = ["Java","Pyhton", "SQL", "PostgreSQL", "CSS", "react", "typescript", "javascript", "html", "C++", "HTML" ,"figma", "whatever else"];

export function AboutApp() {
  return (
    <div className="font-hand space-y-4 text-foreground leading-relaxed">
      <p className="font-scribble text-2xl">
        hi, i'm <span className="highlight-yellow">Roha Fatima</span>
      </p>
      <p className="font-marker text-sm text-foreground/60">
        developer · Dallas
      </p>
      <p className="text-base">
        Hi I'm Roha, I love building applications for myself.
        This portfolio is inspired by little me, who would draw a phone on paper, with all the apps. I hope she would like this design

      </p>
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="sketch-box sketch-box-alt p-3">
          <p className="font-marker text-xs text-foreground/50 mb-1">right now</p>
          <p className="font-scribble text-xl">probably doom scrolling</p>
        </div>
        <div className="sketch-box p-3">
          <p className="font-marker text-xs text-foreground/50 mb-1">before that</p>
          <p className="font-scribble text-xl">Coding</p>
        </div>
      </div>
      <div className="pt-1">
        <p className="font-marker text-xs text-foreground/50 mb-2">skills</p>
        <div className="flex flex-wrap gap-2">
          {skills.map(s => (
            <span key={s} className="sketch-box px-2 py-0.5 font-scribble text-sm">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectsApp() {
  return (
    <ul className="font-hand space-y-3">
      {projects.map((p, i) => (
        <li
          key={p.name}
          className="sketch-box sketch-box-rough p-3 flex items-start gap-3 cursor-pointer hover:translate-x-0.5 transition-transform"
          style={{ transform: `rotate(${i % 2 === 0 ? -0.3 : 0.4}deg)` }}
        >
          <span className="font-scribble text-2xl text-foreground/25 w-8 shrink-0">
            0{i + 1}
          </span>

          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <h3 className="font-marker text-xl">{p.name}</h3>
              <span className="font-scribble text-sm text-foreground/45">
                {p.year}
              </span>
            </div>

            <p className="text-sm text-foreground/70 mb-2">{p.desc}</p>

            <div className="flex flex-wrap gap-1 mb-2">
              {p.tech.map(t => (
                <span
                  key={t}
                  className="font-marker text-[10px] px-1.5 py-0.5 border border-dashed border-foreground/30 rounded text-foreground/55"
                >
                  {t}
                </span>
              ))}
            </div>

          </div>
        </li>
      ))}
    </ul>
  );
}

export function ResumeApp() {
  return (
    <div className="font-hand space-y-4 text-foreground">
      <div className="space-y-4">
        <p className="font-marker text-xs text-foreground/50 uppercase tracking-wide">experience</p>
        {experience.map(e => (
          <div key={e.company} className="space-y-1">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-marker text-base">{e.role}</span>
                <span className="font-scribble text-foreground/55 ml-2 text-sm">@ {e.company}</span>
              </div>
              <span className="font-scribble text-xs text-foreground/40">{e.years}</span>
            </div>
            <ul className="space-y-0.5 pl-2">
              {e.bullets.map(b => (
                <li key={b} className="text-sm text-foreground/65 flex gap-2">
                  <span className="text-foreground/30 shrink-0">–</span>{b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
        <a
        href="/resume.pdf"
        className="sketch-btn text-sm inline-flex mt-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        download pdf →
      </a>

      
    </div>

    
  );
}

export function GithubApp() {
  return (
    <div className="font-hand space-y-3 text-foreground">
      <p className="font-scribble text-xl">github</p>
      <p className="text-sm text-foreground/70">all my code lives here.</p>
      <div className="border-t border-dashed border-foreground/20 pt-3">
        <a
          href="https://github.com/Roro141"
          target="_blank"
          rel="noopener noreferrer"
          className="sketch-btn text-sm inline-flex"
        >
          github.com/Roro141 →
        </a>
      </div>
    </div>
  );
}

export function LinkedinApp() {
  return (
    <div className="font-hand space-y-3 text-foreground">
      <p className="font-scribble text-xl">linkedin</p>
      <p className="text-sm text-foreground/70">let's connect.</p>
      <div className="border-t border-dashed border-foreground/20 pt-3">
        <a
          href="https://www.linkedin.com/in/roha-fatima-cs/"
          target="_blank"
          rel="noopener noreferrer"
          className="sketch-btn text-sm inline-flex"
        >
          linkedin.com/in/roha-fatima-cs →
        </a>
      </div>
    </div>
  );
}