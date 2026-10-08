import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const MIN_SCALE = 1;
const MAX_SCALE = 3;
const SCALE_STEP = 0.5;

export default function ProductImageZoom({ src, alt }) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(MIN_SCALE);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const frameRef = useRef(null);
  const drag = useRef(null);
  const moved = useRef(false);

  const reset = () => {
    setScale(MIN_SCALE);
    setPos({ x: 0, y: 0 });
  };

  const close = () => {
    setOpen(false);
    reset();
  };

  const setZoom = (next) => {
    const value = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
    setScale(value);
    if (value === MIN_SCALE) setPos({ x: 0, y: 0 });
  };

  useEffect(() => {
    reset();
    setOpen(false);
  }, [src]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") close();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const node = frameRef.current;
    if (!open || !node) return undefined;
    const onWheel = (event) => {
      event.preventDefault();
      setScale((current) => {
        const value = Math.min(MAX_SCALE, Math.max(MIN_SCALE, current + (event.deltaY < 0 ? SCALE_STEP : -SCALE_STEP)));
        if (value === MIN_SCALE) setPos({ x: 0, y: 0 });
        return value;
      });
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={`Zoom ${alt}`} className="block w-full cursor-zoom-in">
        <img src={src} alt={alt} fetchPriority="high" decoding="async" className="aspect-[4/5] w-full object-cover" />
      </button>
      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-[90] flex items-center justify-center bg-[#241B1D]/80 p-4"
              role="dialog"
              aria-modal="true"
              aria-label="Product image"
              onClick={close}
            >
              <div className="relative flex h-[min(86vh,860px)] w-full max-w-5xl items-center justify-center" onClick={(event) => event.stopPropagation()}>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={close}
                  className="absolute top-0 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFDFC] text-[#241B1D]"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
                <div
                  ref={frameRef}
                  className={`h-full w-full overflow-hidden ${scale > MIN_SCALE ? "cursor-grab" : "cursor-zoom-in"}`}
                  onPointerDown={(event) => {
                    drag.current = { x: event.clientX, y: event.clientY, originX: pos.x, originY: pos.y };
                    moved.current = false;
                    event.currentTarget.setPointerCapture(event.pointerId);
                  }}
                  onPointerMove={(event) => {
                    if (!drag.current || scale <= MIN_SCALE) return;
                    const dx = event.clientX - drag.current.x;
                    const dy = event.clientY - drag.current.y;
                    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved.current = true;
                    setPos({ x: drag.current.originX + dx, y: drag.current.originY + dy });
                  }}
                  onPointerUp={() => {
                    drag.current = null;
                  }}
                  onClick={() => {
                    if (moved.current) {
                      moved.current = false;
                      return;
                    }
                    setZoom(scale >= MAX_SCALE ? MIN_SCALE : scale + SCALE_STEP);
                  }}
                >
                  <img
                    src={src}
                    alt={alt}
                    draggable="false"
                    className="h-full w-full object-contain select-none"
                    style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})` }}
                  />
                </div>
                <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#FFFDFC] p-1 shadow-lg">
                  <button
                    type="button"
                    aria-label="Zoom out"
                    disabled={scale <= MIN_SCALE}
                    onClick={() => setZoom(scale - SCALE_STEP)}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-[#4B0F1B] disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="min-w-14 text-center text-xs font-semibold text-[#241B1D]">{Math.round(scale * 100)}%</span>
                  <button
                    type="button"
                    aria-label="Zoom in"
                    disabled={scale >= MAX_SCALE}
                    onClick={() => setZoom(scale + SCALE_STEP)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#781829] text-xl text-[#FFFDFC] disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
