import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { getNodeFigure } from "../../lib/workboardUtils.tsx";

export const MindMeshNode = ({ id, data }: { id: string; data: { title: string; label: string; shape?: string; color?: string; bold?: boolean; italic?: boolean; underline?: boolean; textColor?:string, onSelect?: (node: any) => void } }) => {
  const { updateNodeData } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isEditing) return;

    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [isEditing]);

  const figureFetch = getNodeFigure(data.shape || "rectangle");
  let shapeClass = figureFetch.shapeClass;
  let shapeStyle: React.CSSProperties = figureFetch.shapeStyle;
  let backgroundSvg = figureFetch.backgroundSvg;

  if (data.color) {
    shapeStyle = { ...shapeStyle, backgroundColor: data.color };
  }

  const textClasses = [
    data.bold ? "font-bold" : "",
    data.italic ? "italic" : "",
    data.underline ? "underline" : "",
  ].filter(Boolean).join(" ");

  // --- COMPONENTE DE HANDLES (PARA REUTILIZAR) ---
  const NodeHandles = () => (
    <>
      <Handle type="target" position={Position.Top} id="t-top" className="w-3 h-3 bg-primary!" />
      <Handle type="source" position={Position.Top} id="s-top" className="w-3 h-3 bg-primary! opacity-0" />
      
      <Handle type="target" position={Position.Bottom} id="t-bottom" className="w-3 h-3 bg-primary!" />
      <Handle type="source" position={Position.Bottom} id="s-bottom" className="w-3 h-3 bg-primary!" />
      
      <Handle type="target" position={Position.Left} id="t-left" className="w-3 h-3 bg-primary!" />
      <Handle type="source" position={Position.Left} id="s-left" className="w-3 h-3 bg-primary!" />
      
      <Handle type="target" position={Position.Right} id="t-right" className="w-3 h-3 bg-primary!" />
      <Handle type="source" position={Position.Right} id="s-right" className="w-3 h-3 bg-primary!" />
    </>
  );

  return (
    <div 
      className={`relative bg-card border border-border shadow-xl w-64 transition-all duration-300 hover:border-primary/50 ${shapeClass} ${
        data.shape === "triangle" ? "p-0 " : "p-5 "
      } ${isEditing ? "nodrag" : ""}`}
      style={shapeStyle} 
      onDoubleClick={() => setIsEditing(e => !e)}
    >
      {/* Renderizamos los Handles una sola vez para todo el nodo */}
      <NodeHandles />

      {data.shape === "triangle" || data.shape == "bubblechat" || data.shape == "romboid" || data.shape == "romb" ? (
        <div className="flex flex-col items-center justify-center h-full pt-8 pb-4 px-4">
          {backgroundSvg}
          <Pencil
            size={16}
            className="absolute top-4 text-muted-foreground hover:text-primary cursor-pointer z-10"
            onClick={(e) => {
              e.stopPropagation();
              data.onSelect?.({ id, data });
            }}
          />
          
          <div className="flex flex-col gap-2 text-center relative z-10">
            {isEditing ? (
              <>
                <input
                  autoFocus
                  className={`text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-transparent border-b border-primary outline-none text-center ${textClasses}`}
                  defaultValue={data.title}
                  onChange={(e) => updateNodeData(id, { title: e.target.value })}
                  style={{color:data.textColor}}
                />
                <input
                  className={`font-semibold text-foreground text-sm leading-tight bg-transparent border-b border-border outline-none text-center ${textClasses}`}
                  defaultValue={data.label}
                  onChange={(e) => updateNodeData(id, { label: e.target.value })}
                  style={{color:data.textColor}}
                />
              </>
            ) : (
              <>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${textClasses}`}
                style={{color:data.textColor}}
                >
                  {data.title}
                </span>
                <h3 className={`font-semibold text-foreground text-xs leading-tight ${textClasses}`}
                style={{color:data.textColor}}
                >
                  {data.label}
                </h3>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <Pencil
            size={16}
            className="absolute top-2 right-2 text-muted-foreground hover:text-primary cursor-pointer z-10"
            onClick={(e) => {
              e.stopPropagation();
              data.onSelect?.({ id, data });
            }}
          />
          
          <div className="flex flex-col gap-2 relative z-10">
            {isEditing ? (
              <>
                <input
                  autoFocus
                  className={`text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-transparent border-b border-primary outline-none ${textClasses}`}
                  defaultValue={data.title}
                  onChange={(e) => updateNodeData(id, { title: e.target.value })}
                  style={{color:data.textColor}}
                />
                <input
                  className={`font-semibold text-foreground text-lg leading-tight bg-transparent border-b border-border outline-none ${textClasses}`}
                  defaultValue={data.label}
                  onChange={(e) => updateNodeData(id, { label: e.target.value })}
                  style={{color:data.textColor}}
                />
              </>
            ) : (
              <>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em]  ${textClasses}`}
                style={{color:data.textColor}}
                >
                  {data.title}
                </span>
                <h3 className={`font-semibold text-foreground  text-xs leading-tight ${textClasses}`}
                 style={{color:data.textColor}}
                >
                  {data.label}
                </h3>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};