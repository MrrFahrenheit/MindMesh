import { useReactFlow } from "@xyflow/react";
import { Bold, BoxIcon, Circle, CloudIcon, DiamondIcon, GripVertical, Italic, MessageCircleIcon, PaintBucketIcon, RectangleHorizontalIcon, SquareIcon, TextIcon, Trash2, TriangleIcon, TypeIcon, UnderlineIcon, X } from "lucide-react";
import { useRef, useState } from "react";

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

  const changeNodeColor = (color:string) => {
    updateNodeData(nodeId, { color });
  }

  const toggleTextStyle = (style: "bold" | "italic" | "underline") => {
    const current = (node.data as any)[style] as boolean | undefined;
    updateNodeData(nodeId, { [style]: !current });
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

      <div className="p-4 flex flex-col gap-4">
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
              { key: "bubblechat", icon: <MessageCircleIcon />, title:"Burbuja de Chat" },
              { key: "romboid", icon: <DiamondIcon />, title: "Romboide" },
              { key: "romb", icon:<SquareIcon style={{ transform: 'skewX(-20deg)' }} />, title: "Rombo" },
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
        <div className="flex flex-col gap-1.5">
          <label className="text-[15px] font-medium text-muted-foreground flex items-center gap-1">
            <PaintBucketIcon size={16} /> Color del nodo
          </label>
           <div className="flex flex-wrap items-center gap-2">
            {[
              { key: "#ff0000", title: "Rojo" },
              { key: "#00ff00", title: "Verde" },
              { key: "#0000ff", title: "Azul" },
              { key: "#ffff00", title: "Amarillo" },
              { key: "#000000", title: "Negro" },
              { key: "#ffffff", title: "Blanco" },
            ].map((color) => (
              <button
                key={color.key}
                onClick={() => changeNodeColor(color.key)}
                title={color.title}
                className={`p-1 rounded ${
                  node.data.color === color.key ? "bg-primary/20" : "hover:bg-primary/10"
                }`}
              >
                <SquareIcon fill={color.key} />
              </button>
            ))}
            {/* custom rgb picker */}
            <button
              onClick={() => {
                const rgb = prompt("Introduce un color RGB o hex (#rrggbb)");
                if (rgb) changeNodeColor(rgb);
              }}
              title="Personalizado"
              className={`p-1 rounded ${
                (node.data as any).color && !["#ff0000","#00ff00","#0000ff","#ffff00","#000000","#ffffff"].includes((node.data as any).color)
                  ? "bg-primary/20"
                  : "hover:bg-primary/10"
              }`}
            >
              <SquareIcon fill={(node.data as any).color || "#000"} />
            </button>
           </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[15px] font-medium text-muted-foreground flex items-center gap-1">
            <TextIcon size={16} /> Texto
          </label>
           <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => toggleTextStyle("bold")}
              title="Negrita"
              className={`p-1 rounded ${
                node.data.bold ? "bg-primary/20" : "hover:bg-primary/10"
              }`}
            >
              <Bold size={16} />
            </button>
            <button
              onClick={() => toggleTextStyle("italic")}
              title="Cursiva"
              className={`p-1 rounded ${
                node.data.italic ? "bg-primary/20" : "hover:bg-primary/10"
              }`}
            >
              <Italic size={16} />
            </button>
            <button
              onClick={() => toggleTextStyle("underline")}
              title="Subrayado"
              className={`p-1 rounded ${
                node.data.underline ? "bg-primary/20" : "hover:bg-primary/10"
              }`}
            >
              <UnderlineIcon size={16} />
            </button>
            <button
              onClick={() => toggleTextStyle("underline")}
              title="Color"
              className={`p-1 rounded ${
                node.data.underline ? "bg-primary/20" : "hover:bg-primary/10"
              }`}
            >
              <TypeIcon size={16} color={node.data.color} />
            </button>
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