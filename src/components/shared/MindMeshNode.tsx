import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { getNodeFigure } from "../../lib/workboardUtils.tsx";

export const MindMeshNode = ({ id, data }: { id: string; data: { title: string; label: string; shape?: string; color?: string; bold?: boolean; italic?: boolean; underline?: boolean; onSelect?: (node: any) => void } }) => {
  const { updateNodeData } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);

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
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div 
      className={`relative bg-card border border-border shadow-xl w-64 transition-all duration-300 hover:border-primary/50 ${shapeClass} ${
        data.shape === "triangle" ? "p-0 " : "p-5 "
      } ${isEditing ? "nodrag" : ""}`}
      style={shapeStyle} onDoubleClick={() => setIsEditing(e => !e)}
    >
      {data.shape === "triangle" || data.shape == "bubblechat" ? (
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
          <Handle type="target" position={Position.Top} className="bg-primary!" />

          
          <div className="flex flex-col gap-2 text-center">
            {isEditing ? (
              <>
                <input
                  autoFocus
                  className={`text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-transparent border-b border-primary outline-none text-center ${textClasses}`}
                  defaultValue={data.title}
                  onChange={(e) => updateNodeData(id, { title: e.target.value })}
                />
                <input
                  className={`font-semibold text-foreground text-sm leading-tight bg-transparent border-b border-border outline-none text-center ${textClasses}`}
                  defaultValue={data.label}
                  onChange={(e) => updateNodeData(id, { label: e.target.value })}
                />
              </>
            ) : (
              <>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-primary ${textClasses}`}>
                  {data.title}
                </span>
                <h3 className={`font-semibold text-foreground text-xs leading-tight ${textClasses}`}>
                  {data.label}
                </h3>
              </>
            )}
          </div>
          
          <Handle type="source" position={Position.Bottom} className="bg-primary!" />
        </div>
      ) : (
        <>
          <Pencil
            size={16}
            className="absolute top-2 right-2 text-muted-foreground hover:text-primary cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              data.onSelect?.({ id, data });
            }}
          />
          <Handle type="target" position={Position.Top} className="bg-primary!" />
          
          <div className="flex flex-col gap-2">
            {isEditing ? (
              <>
                <input
                  autoFocus
                  className={`text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-transparent border-b border-primary outline-none ${textClasses}`}
                  defaultValue={data.title}
                  onChange={(e) => updateNodeData(id, { title: e.target.value })}
                />
                <input
                  className={`font-semibold text-foreground text-lg leading-tight bg-transparent border-b border-border outline-none ${textClasses}`}
                  defaultValue={data.label}
                  onChange={(e) => updateNodeData(id, { label: e.target.value })}
                />
              </>
            ) : (
              <>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-primary ${textClasses}`}>
                  {data.title}
                </span>
                <h3 className={`font-semibold text-foreground text-xs leading-tight ${textClasses}`}>
                  {data.label}
                </h3>
              </>
            )}
          </div>
          
          <Handle type="source" position={Position.Bottom} className="bg-primary!" />
        </>
      )}
    </div>
  );
};