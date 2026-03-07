import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Pencil } from "lucide-react";
import { useState } from "react";

export const MindMeshNode = ({ id, data }: { id: string; data: { title: string; label: string; shape?: string; onSelect?: (node: any) => void } }) => {
  const { updateNodeData } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);

  let shapeClass = "rounded-2xl";
  let shapeStyle: React.CSSProperties | undefined;
  switch (data.shape) {
    case "circle":
      shapeClass = "rounded-full";
      break;
    case "square":
      shapeClass = "rounded-none";
      break;
    case "triangle":
      shapeClass = "rounded-none";
      shapeStyle = { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" };
      break;
    case "cloud":
      shapeClass = "rounded-full";
      shapeStyle = { clipPath: "ellipse(70% 50% at 50% 50%)" };
      break;
    default:
      shapeClass = "rounded-2xl";
  }

  return (
    <div 
      className={`relative bg-card border border-border shadow-xl w-64 transition-all duration-300 hover:border-primary/50 ${shapeClass} ${
        data.shape === "triangle" ? "p-0" : "p-5"
      }`}
      style={shapeStyle}
      onDoubleClick={() => setIsEditing(e => !e)}
    >
      {data.shape === "triangle" ? (
        <div className="flex flex-col items-center justify-center h-full pt-8 pb-4 px-4">
          <Pencil
            size={16}
            className="absolute top-2 right-2 text-muted-foreground hover:text-primary cursor-pointer z-10"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(prev => !prev);
              data.onSelect?.({ id, data });
            }}
          />
          <Handle type="target" position={Position.Top} className="bg-primary!" />
          
          <div className="flex flex-col gap-2 text-center">
            {isEditing ? (
              <>
                <input
                  autoFocus
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-transparent border-b border-primary outline-none text-center"
                  defaultValue={data.title}
                  onChange={(e) => updateNodeData(id, { title: e.target.value })}
                />
                <input
                  className="font-semibold text-foreground text-sm leading-tight bg-transparent border-b border-border outline-none text-center"
                  defaultValue={data.label}
                  onChange={(e) => updateNodeData(id, { label: e.target.value })}
                />
              </>
            ) : (
              <>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  {data.title}
                </span>
                <h3 className="font-semibold text-foreground text-xs leading-tight">
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
              setIsEditing(prev => !prev);
              data.onSelect?.({ id, data });
            }}
          />
          <Handle type="target" position={Position.Top} className="bg-primary!" />
          
          <div className="flex flex-col gap-2">
            {isEditing ? (
              <>
                <input
                  autoFocus
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-transparent border-b border-primary outline-none"
                  defaultValue={data.title}
                  onChange={(e) => updateNodeData(id, { title: e.target.value })}
                />
                <input
                  className="font-semibold text-foreground text-lg leading-tight bg-transparent border-b border-border outline-none"
                  defaultValue={data.label}
                  onChange={(e) => updateNodeData(id, { label: e.target.value })}
                />
              </>
            ) : (
              <>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  {data.title}
                </span>
                <h3 className="font-semibold text-foreground text-xs leading-tight">
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