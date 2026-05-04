import { useEffect, useRef, useState, ReactNode } from "react";
import { SketchClose, SketchMin, SketchMax } from "./SketchSvg";

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  initial: { x: number; y: number; w: number; h: number };
  z: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  accent?: "yellow" | "pink" | "blue" | "green";
}

const accents: Record<string, string> = {
  yellow: "hsl(var(--highlight-yellow))",
  pink:   "hsl(var(--highlight-pink))",
  blue:   "hsl(var(--highlight-blue))",
  green:  "hsl(var(--highlight-green))",
};

export function PaperWindow({
  id, title, children, initial, z,
  onClose, onMinimize, onFocus, accent = "yellow"
}: WindowProps) {
  const [pos,  setPos]  = useState({ x: initial.x, y: initial.y });
  const [size, setSize] = useState({ w: initial.w, h: initial.h });
  const [maximized, setMax] = useState(false);
  const drag   = useRef<{ dx: number; dy: number } | null>(null);
  const resize = useRef<{ sx: number; sy: number; sw: number; sh: number } | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (drag.current)
        setPos({ x: e.clientX - drag.current.dx, y: Math.max(0, e.clientY - drag.current.dy) });
      if (resize.current)
        setSize({
          w: Math.max(260, resize.current.sw + e.clientX - resize.current.sx),
          h: Math.max(160, resize.current.sh + e.clientY - resize.current.sy),
        });
    };
    const onUp = () => { drag.current = null; resize.current = null; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const style = maximized
    ? { left: 12, top: 12, width: "calc(100% - 24px)", height: "calc(100% - 24px)", zIndex: z }
    : { left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex: z };

  return (
    <div
      onMouseDown={onFocus}
      className="absolute window-open sketch-box flex flex-col"
      style={style}
      data-window={id}
    >
      <span className="tape -top-3 left-4" style={{ background: accents[accent] + "99" }} />

      {/* title bar */}
      <div
        onMouseDown={e => {
          if (!maximized) drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
        }}
        className="flex items-center justify-between gap-2 px-3 py-2 border-b-2 border-dashed border-foreground/25 cursor-grab active:cursor-grabbing select-none shrink-0"
      >
        <div className="flex items-center gap-1.5">
          <button
            onClick={onClose}
            className="text-destructive hover:scale-110 transition-transform"
            aria-label="close"
          >
            <SketchClose className="w-4 h-4" />
          </button>
          <button
            onClick={onMinimize}
            className="text-foreground/55 hover:scale-110 transition-transform"
            aria-label="minimise"
          >
            <SketchMin className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMax(m => !m)}
            className="text-foreground/55 hover:scale-110 transition-transform"
            aria-label="maximise"
          >
            <SketchMax className="w-4 h-4" />
          </button>
        </div>
        <h2 className="font-marker text-base text-foreground/75 truncate">{title}</h2>
        <span />
      </div>

      {/* content */}
      <div className="flex-1 overflow-auto p-4">{children}</div>

      {/* resize handle */}
      {!maximized && (
        <div
          onMouseDown={e => {
            resize.current = { sx: e.clientX, sy: e.clientY, sw: size.w, sh: size.h };
          }}
          className="absolute bottom-1 right-1 w-4 h-4 cursor-se-resize opacity-25"
          style={{ background: "radial-gradient(circle, hsl(var(--ink)) 1px, transparent 1.5px) 0 0 / 4px 4px" }}
        />
      )}
    </div>
  );
}
