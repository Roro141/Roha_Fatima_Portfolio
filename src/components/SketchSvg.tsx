import { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const SketchUser = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M24 6 C 16 6 14 14 16 19 C 17 23 20 25 24 25 C 28 25 31 23 32 19 C 34 14 32 6 24 6 Z" />
    <path d="M8 42 C 10 32 16 28 24 28 C 32 28 38 32 40 42" />
  </svg>
);

export const SketchFolder = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M5 14 L 18 13 L 22 17 L 43 18 L 42 39 L 6 40 Z" />
    <path d="M5 14 q 18 -3 38 4" />
    <path d="M11 24 l 6 0 M14 30 l 8 0" />
  </svg>
);

export const SketchBook = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M6 8 L 24 11 L 42 8 L 41 40 L 24 42 L 7 40 Z" />
    <path d="M24 11 L 24 42" />
    <path d="M11 18 l 9 1 M11 24 l 9 1 M28 18 l 9 -1 M28 24 l 9 -1" />
  </svg>
);

export const SketchGithub = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M24 6 C 13 6 8 14 8 22 C 8 29 12 34 18 36 C 18 36 17 33 18 31 C 13 32 11 29 11 27 C 11 24 13 23 13 23 C 11 17 13 15 13 15 C 16 15 18 18 18 18 C 20 17 22 17 24 17 C 26 17 28 17 30 18 C 30 18 32 15 35 15 C 35 15 37 17 35 23 C 35 23 37 24 37 27 C 37 29 35 32 30 31 C 31 33 30 36 30 36 C 36 34 40 29 40 22 C 40 14 35 6 24 6 Z" />
    <path d="M18 36 L 18 42 M30 36 L 30 42 M18 42 L 30 42" />
  </svg>
);

export const SketchLinkedin = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M6 6 L 42 6 L 43 42 L 5 43 Z" />
    <path d="M13 20 L 13 36" />
    <path d="M13 13 q 0.5 0 0 1 q -0.5 0 0 -1" strokeWidth={3} />
    <path d="M22 20 L 22 36 M22 26 C 22 22 36 21 36 27 L 36 36" />
  </svg>
);

export const SketchClose = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 8 L 17 16 M16 8 L 8 17" />
  </svg>
);

export const SketchMin = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M7 13 q 5 -1 10 0" />
  </svg>
);

export const SketchMax = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 8 L 16 8 L 16 16 L 8 16 Z" />
  </svg>
);

export const SketchTetris = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M6 8 L 42 8 L 42 44 L 6 44 Z" />
    <rect x="10" y="28" width="8" height="8" rx="1" />
    <rect x="18" y="28" width="8" height="8" rx="1" />
    <rect x="18" y="20" width="8" height="8" rx="1" />
    <rect x="26" y="28" width="8" height="8" rx="1" />
    <path d="M10 36 L 38 36" strokeDasharray="2 2" />
  </svg>
);
