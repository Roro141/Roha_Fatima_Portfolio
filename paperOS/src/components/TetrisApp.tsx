import { useEffect, useRef, useState, useCallback } from "react";

const COLS = 10;
const ROWS = 20;
const BLOCK = 24;

const PIECES = [
  { shape: [[1,1,1,1]], color: "#7ec8c8" },
  { shape: [[1,1],[1,1]], color: "#f9c74f" },
  { shape: [[0,1,0],[1,1,1]], color: "#a78bfa" },
  { shape: [[1,0,0],[1,1,1]], color: "#f97316" },
  { shape: [[0,0,1],[1,1,1]], color: "#60a5fa" },
  { shape: [[1,1,0],[0,1,1]], color: "#f472b6" },
  { shape: [[0,1,1],[1,1,0]], color: "#4ade80" },
];

type Board = (string | 0)[][];

function emptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function rotate(shape: number[][]): number[][] {
  return shape[0].map((_, i) => shape.map(r => r[i]).reverse());
}

function randomPiece() {
  const p = PIECES[Math.floor(Math.random() * PIECES.length)];
  return { shape: p.shape, color: p.color, x: Math.floor(COLS / 2) - Math.floor(p.shape[0].length / 2), y: 0 };
}

function fits(board: Board, shape: number[][], x: number, y: number) {
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++)
      if (shape[r][c]) {
        const nx = x + c, ny = y + r;
        if (nx < 0 || nx >= COLS || ny >= ROWS) return false;
        if (ny >= 0 && board[ny][nx]) return false;
      }
  return true;
}

function place(board: Board, shape: number[][], x: number, y: number, color: string): Board {
  const b = board.map(r => [...r]);
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++)
      if (shape[r][c] && y + r >= 0) b[y + r][x + c] = color;
  return b;
}

function clearLines(board: Board): [Board, number] {
  const kept = board.filter(r => r.some(c => !c));
  const cleared = ROWS - kept.length;
  const newRows = Array.from({ length: cleared }, () => Array(COLS).fill(0));
  return [[...newRows, ...kept], cleared];
}

export function TetrisApp() {
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [piece, setPiece] = useState(randomPiece);
  const [next, setNext]   = useState(randomPiece);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [over, setOver]   = useState(false);
  const [running, setRunning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef  = useRef({ board, piece, next, score, lines, over, running });

  useEffect(() => { stateRef.current = { board, piece, next, score, lines, over, running }; },
    [board, piece, next, score, lines, over, running]);

  const drop = useCallback(() => {
    const { board, piece, next, score, lines, over } = stateRef.current;
    if (over) return;
    const ny = piece.y + 1;
    if (fits(board, piece.shape, piece.x, ny)) {
      setPiece(p => ({ ...p, y: ny }));
    } else {
      const newBoard = place(board, piece.shape, piece.x, piece.y, piece.color);
      const [cleared, n] = clearLines(newBoard);
      const pts = [0, 100, 300, 500, 800][n] ?? 0;
      if (!fits(cleared, next.shape, next.x, 0)) {
        setBoard(cleared); setOver(true); setRunning(false); return;
      }
      setBoard(cleared);
      setScore(s => s + pts);
      setLines(l => l + n);
      setPiece(next);
      setNext(randomPiece());
    }
  }, []);

  useEffect(() => {
    if (!running) return;
    const speed = Math.max(100, 500 - Math.floor(lines / 10) * 40);
    const t = setInterval(drop, speed);
    return () => clearInterval(t);
  }, [running, drop, lines]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { board, piece, over, running } = stateRef.current;
      if (over || !running) return;
      if (e.key === "ArrowLeft" && fits(board, piece.shape, piece.x - 1, piece.y))
        setPiece(p => ({ ...p, x: p.x - 1 }));
      if (e.key === "ArrowRight" && fits(board, piece.shape, piece.x + 1, piece.y))
        setPiece(p => ({ ...p, x: p.x + 1 }));
      if (e.key === "ArrowDown") drop();
      if (e.key === "ArrowUp" || e.key === "x") {
        const r = rotate(piece.shape);
        if (fits(board, r, piece.x, piece.y)) setPiece(p => ({ ...p, shape: r }));
      }
      if (e.key === " ") {
        e.preventDefault();
        let ny = piece.y;
        while (fits(board, piece.shape, piece.x, ny + 1)) ny++;
        setPiece(p => ({ ...p, y: ny }));
        setTimeout(drop, 0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drop]);

  // draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // grid bg
    ctx.fillStyle = "#faf6ee";
    ctx.fillRect(0, 0, COLS * BLOCK, ROWS * BLOCK);

    // grid lines
    ctx.strokeStyle = "rgba(170,195,220,0.35)";
    ctx.lineWidth = 0.5;
    for (let r = 0; r <= ROWS; r++) {
      ctx.beginPath(); ctx.moveTo(0, r * BLOCK); ctx.lineTo(COLS * BLOCK, r * BLOCK); ctx.stroke();
    }
    for (let c = 0; c <= COLS; c++) {
      ctx.beginPath(); ctx.moveTo(c * BLOCK, 0); ctx.lineTo(c * BLOCK, ROWS * BLOCK); ctx.stroke();
    }

    // ghost piece
    let ghostY = piece.y;
    while (fits(board, piece.shape, piece.x, ghostY + 1)) ghostY++;
    if (ghostY !== piece.y) {
      for (let r = 0; r < piece.shape.length; r++)
        for (let c = 0; c < piece.shape[r].length; c++)
          if (piece.shape[r][c]) {
            ctx.fillStyle = piece.color + "33";
            ctx.fillRect((piece.x + c) * BLOCK + 1, (ghostY + r) * BLOCK + 1, BLOCK - 2, BLOCK - 2);
          }
    }

    // board
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (board[r][c]) {
          ctx.fillStyle = board[r][c] as string;
          ctx.fillRect(c * BLOCK + 1, r * BLOCK + 1, BLOCK - 2, BLOCK - 2);
          ctx.strokeStyle = "rgba(42,36,32,0.3)";
          ctx.lineWidth = 1;
          ctx.strokeRect(c * BLOCK + 1.5, r * BLOCK + 1.5, BLOCK - 3, BLOCK - 3);
        }

    // active piece
    for (let r = 0; r < piece.shape.length; r++)
      for (let c = 0; c < piece.shape[r].length; c++)
        if (piece.shape[r][c]) {
          ctx.fillStyle = piece.color;
          ctx.fillRect((piece.x + c) * BLOCK + 1, (piece.y + r) * BLOCK + 1, BLOCK - 2, BLOCK - 2);
          ctx.strokeStyle = "rgba(42,36,32,0.4)";
          ctx.lineWidth = 1;
          ctx.strokeRect((piece.x + c) * BLOCK + 1.5, (piece.y + r) * BLOCK + 1.5, BLOCK - 3, BLOCK - 3);
        }

    // game over overlay
    if (over) {
      ctx.fillStyle = "rgba(245,240,228,0.85)";
      ctx.fillRect(0, ROWS * BLOCK / 2 - 40, COLS * BLOCK, 80);
      ctx.fillStyle = "#2a2420";
      ctx.font = "bold 20px 'Architects Daughter', cursive";
      ctx.textAlign = "center";
      ctx.fillText("game over", COLS * BLOCK / 2, ROWS * BLOCK / 2 - 8);
      ctx.font = "14px 'Architects Daughter', cursive";
      ctx.fillText(`score: ${score}`, COLS * BLOCK / 2, ROWS * BLOCK / 2 + 16);
    }
  }, [board, piece, over, score]);

  // draw next piece preview
  const nextCanvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = nextCanvas.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const S = 20;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#faf6ee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const ox = Math.floor((4 - next.shape[0].length) / 2);
    const oy = Math.floor((4 - next.shape.length) / 2);
    for (let r = 0; r < next.shape.length; r++)
      for (let c = 0; c < next.shape[r].length; c++)
        if (next.shape[r][c]) {
          ctx.fillStyle = next.color;
          ctx.fillRect((ox + c) * S + 1, (oy + r) * S + 1, S - 2, S - 2);
          ctx.strokeStyle = "rgba(42,36,32,0.3)";
          ctx.lineWidth = 1;
          ctx.strokeRect((ox + c) * S + 1.5, (oy + r) * S + 1.5, S - 3, S - 3);
        }
  }, [next]);

  const restart = () => {
    setBoard(emptyBoard());
    setPiece(randomPiece());
    setNext(randomPiece());
    setScore(0); setLines(0); setOver(false); setRunning(true);
  };

  const level = Math.floor(lines / 10) + 1;

  return (
    <div className="flex gap-4 font-hand select-none" style={{ minWidth: 320 }}>
      {/* game grid */}
      <div className="sketch-box overflow-hidden" style={{ lineHeight: 0 }}>
        <canvas
          ref={canvasRef}
          width={COLS * BLOCK}
          height={ROWS * BLOCK}
          style={{ display: "block", imageRendering: "pixelated" }}
        />
      </div>

      {/* side panel */}
      <div className="flex flex-col gap-3 min-w-[100px]">
        {/* next */}
        <div className="sketch-box p-2">
          <p className="font-marker text-xs text-foreground/50 mb-1">next</p>
          <canvas ref={nextCanvas} width={80} height={80} style={{ display: "block" }} />
        </div>

        {/* stats */}
        <div className="sketch-box p-2 space-y-1">
          <p className="font-marker text-xs text-foreground/50">score</p>
          <p className="font-scribble text-xl">{score}</p>
        </div>
        <div className="sketch-box p-2 space-y-1">
          <p className="font-marker text-xs text-foreground/50">lines</p>
          <p className="font-scribble text-xl">{lines}</p>
        </div>
        <div className="sketch-box p-2 space-y-1">
          <p className="font-marker text-xs text-foreground/50">level</p>
          <p className="font-scribble text-xl">{level}</p>
        </div>

        {/* controls */}
        {!running && !over && (
          <button className="sketch-btn text-sm" onClick={() => setRunning(true)}>
            start →
          </button>
        )}
        {running && !over && (
          <button className="sketch-btn text-sm" onClick={() => setRunning(false)}>
            pause
          </button>
        )}
        {over && (
          <button className="sketch-btn text-sm" onClick={restart}>
            retry →
          </button>
        )}
        {!over && running === false && score > 0 && (
          <button className="sketch-btn text-sm" onClick={() => setRunning(true)}>
            resume
          </button>
        )}

        {/* keys hint */}
        <div className="font-marker text-[10px] text-foreground/40 space-y-0.5 pt-1">
          <p>← → move</p>
          <p>↑ rotate</p>
          <p>↓ soft drop</p>
          <p>space hard drop</p>
        </div>
      </div>
    </div>
  );
}
