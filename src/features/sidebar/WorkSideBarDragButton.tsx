import { MenuIcon } from "lucide-react";
import { useState, useRef } from "react";

export function WorkSideDragButton({ openMenu, onChangePosition, defaultPosition }: { openMenu: () => void; onChangePosition: (position: { x: number; y: number }) => void; defaultPosition: { x: number; y: number } }) {
  const [position, setPosition] = useState(defaultPosition);
  const dragging = useRef(false);

  const handleDragEnd = (e: React.DragEvent) => {
    setPosition({ x: e.clientX - 40, y: e.clientY - 20 });
    onChangePosition({ x: e.clientX - 40, y: e.clientY - 20 });
    dragging.current = false;
  };

  return (
    <div
      draggable
      onDragStart={() => (dragging.current = true)}
      onDragEnd={handleDragEnd}
      style={{ 
        position: 'fixed', 
        left: `${position.x}px`, 
        top: `${position.y}px` 
      }}
      className="fixed z-50 hover:cursor-grab active:cursor-grabbing text-primary-foreground p-3 rounded-full shadow-lg transition-transform hover:scale-110 bg-card"
    >
      <button
        onClick={openMenu}
        className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform flex items-center gap-2 hover:cursor-grab active:cursor-grabbing"
      >
        <span><MenuIcon /></span> Menu
      </button>
    </div>
  );
}