import { useReactFlow } from "@xyflow/react";
import { AlignLeft, BoxIcon, Circle, CloudIcon, DiamondIcon, GripVertical, MessageCircleIcon, RectangleHorizontalIcon, SquareIcon, SquaresExclude, SquaresIntersect, Trash2, TriangleIcon, Type, X } from "lucide-react";
import { useRef, useState } from "react";
import { getNodeShape } from "../../../lib/nodeUtils";

interface EditNodeMenuProps {
  nodeId: string;
  onCloseMenu: () => void;
}

export default function EditNodeMenu({ nodeId, onCloseMenu }: EditNodeMenuProps) {
  const { getNode, updateNodeData, deleteElements } = useReactFlow();
  const [position, setPosition] = useState({ x: window.innerWidth - 300, y: 100 });
  const dragging = useRef(false);

  const node = getNode(nodeId);
  
  if (!node) return null;

  const handleDragEnd = (e: React.DragEvent) => {
    if (e.clientX === 0 && e.clientY === 0) return; // Evita el salto al soltar
    setPosition({ x: e.clientX - 100, y: e.clientY - 20 });
    dragging.current = false;
  };

  const handleDelete = () => {
    deleteElements({ nodes: [{ id: nodeId }] });
    onCloseMenu();
  };

  const changeNodeStyle = (shapeName:string) => {
    updateNodeData(nodeId, { shape: shapeName });
  }

  return (
    <div
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      className="fixed z-50 w-64 bg-card/90 backdrop-blur-md border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
    >
      <div 
        draggable 
        onDragEnd={handleDragEnd}
        className="flex items-center justify-between p-3 border-b border-border bg-muted/50 cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <GripVertical size={14} />
          <span className="text-[10px] font-bold uppercase tracking-tight">Editor de Nodo</span>
        </div>
        <button onClick={onCloseMenu} className="hover:bg-accent p-1 rounded-md transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Cuerpo del Formulario */}
      <div className="p-4 flex flex-col gap-4">
        {/* Input de Título */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[15px] font-medium text-muted-foreground flex items-center gap-1">
            <BoxIcon size={16} /> Formas
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: "rounded", icon: <RectangleHorizontalIcon />, title: "Rectángulo" },
              { key: "square", icon: <SquareIcon />, title: "Cuadrado" },
              { key: "circle", icon: <Circle />, title: "Círculo" },
              { key: "triangle", icon: <TriangleIcon />, title: "Triángulo" },
              { key: "cloud", icon: <CloudIcon />, title: "Nube" },
              { key: "BubbleChat", icon: <MessageCircleIcon />, title:"Burbuja de Chat" },
              { key: "Romboid", icon: <DiamondIcon />, title: "Romboide" },
              { key: "Rombs", icon:<SquareIcon style={{ transform: 'skewX(-20deg)' }} />, title: "Rombo" },
            ].map((shape) => (
              <button
                key={shape.key}
                onClick={() => changeNodeStyle(shape.key)}
                title={shape.title}
                className={`p-1 rounded ${
                  node.data.shape === shape.key ? "bg-primary/20" : "hover:bg-primary/10"
                }`}
              >
                {shape.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Botón de Eliminar */}
        <button
          onClick={handleDelete}
          className="mt-2 flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all font-medium text-sm"
        >
          <Trash2 size={16} />
          Eliminar Nodo
        </button>
      </div>
    </div>
  );
}