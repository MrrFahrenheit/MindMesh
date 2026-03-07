import { Brain, GripVertical, LayoutGrid, StickyNote, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { ThemeToggle } from "../../components/shared/ThemeToggle";

interface WorkSideBarProps {
  onAddNode: (type: string) => void;
  x: number; // Coordenada X
  y: number; // Coordenada Y
  handleClose: () => void; // Función para cerrar el sidebar
  onChangePosition: (position: { x: number; y: number }) => void; // Función para actualizar la posición
}

export function WorkSideBar({ onAddNode, x, y, handleClose, onChangePosition }: WorkSideBarProps) {
    const [position, setPosition] = useState({ x, y });
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
      className="hover:cursor-default z-50 w-48 bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-2 flex flex-col gap-1 transition-all animate-in fade-in"
    >
      {/* Mango de arrastre */}
      <div className="w-full flex justify-evenly py-1 cursor-grab active:cursor-grabbing text-muted-foreground/30">
        <GripVertical size={32} />
        <XIcon size={32}  onClick={handleClose} className="hover:cursor-pointer" />
      </div>

      <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        Crear elementos
      </div>

      {/* array de acciones para los botones */}
      {[
        {
          icon: <Brain size={18} />,
          label: "Nuevo Nodo",
          onClick: () => onAddNode("mindmesh"),
          className: "text-foreground hover:cursor-pointer hover:bg-black/30",
        },
        {
          icon: <StickyNote size={18} />,
          label: "Nota rápida",
          onClick: () => onAddNode("note"),
          className: "text-foreground",
        },
      ].map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors ${btn.className}  hover:cursor-pointer hover:bg-black/30`}
        >
          {btn.icon}
          <span className="text-sm font-medium">{btn.label}</span>
        </button>
      ))}

      <div className="h-px bg-border my-1" />

      {/* acción adicional sin handler definido */}
      <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground">
        <LayoutGrid size={18} />
        <span className="text-sm">Organizar</span>
        <ThemeToggle />
      </button>

      <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        Archivo
      </div>
    </div>
  );
}