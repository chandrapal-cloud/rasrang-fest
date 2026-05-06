import { useRef, useState, useEffect, ReactNode } from "react";

interface DraggableProps {
  children: ReactNode;
  className?: string;
  initialX?: number; // px offset
  initialY?: number;
  style?: React.CSSProperties;
}

/**
 * Draggable — wraps any element to allow pointer-driven dragging.
 * Keeps its own translate offset so existing CSS animations on children
 * (float, pulse, etc.) keep working.
 */
export const Draggable = ({ children, className = "", initialX = 0, initialY = 0, style }: DraggableProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [dragging, setDragging] = useState(false);
  const start = useRef({ px: 0, py: 0, ox: 0, oy: 0 });

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - start.current.px;
      const dy = e.clientY - start.current.py;
      setPos({ x: start.current.ox + dx, y: start.current.oy + dy });
    };
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging]);

  const onDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    start.current = { px: e.clientX, py: e.clientY, ox: pos.x, oy: pos.y };
    setDragging(true);
  };

  return (
    <div
      ref={ref}
      onPointerDown={onDown}
      className={`pointer-events-auto touch-none cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{
        ...style,
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: dragging ? "none" : "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        zIndex: dragging ? 50 : undefined,
        filter: dragging ? "drop-shadow(0 12px 16px rgba(0,0,0,0.25))" : undefined,
      }}
    >
      {children}
    </div>
  );
};
