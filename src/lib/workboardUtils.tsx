import { useCallback, useEffect } from "react";
import { useReactFlow } from "@xyflow/react";

export function DeleteNodeManager() {
  const { getNodes, deleteElements } = useReactFlow();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Delete" ||
        event.key === "Backspace"
      ) {
        const target = event.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

        const selectedNodes = getNodes().filter((node) => node.selected);

        if (selectedNodes.length > 0) {
          deleteElements({ nodes: selectedNodes });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [getNodes, deleteElements]);

  return null;
}

export const getNodeFigure = (data: string): { shapeClass: string; shapeStyle: React.CSSProperties; backgroundSvg: React.ReactNode } => {
  let shapeClass = "p-4 flex items-center justify-center text-center border-2 transition-all";
  let shapeStyle: React.CSSProperties = { minWidth: '120px', minHeight: '80px' };
  let backgroundSvg = null;

  switch (data) {
    case "circle":
      shapeClass += " rounded-full aspect-square";
      break;

    case "square":
      shapeClass += " rounded-none aspect-square";
      break;

    case "rectangle":
      shapeClass += " rounded-none w-48 h-24";
      break;

    case "triangle":
      shapeClass = "border-0 h-40";
      shapeStyle = {

        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",

        border: "2px solid black"

      };
      backgroundSvg = (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,0 100,100 0,100" fill="transparent" stroke="currentColor" strokeWidth="1" className="bg-transparent" />
        </svg>
      );
      break;

    case "cloud":
      shapeClass += " border-2 border-gray-400";
      shapeStyle = {
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        boxShadow: "2px 2px 0px rgba(0,0,0,0.1)"
      };
      break;

      case "romb":
      shapeStyle = { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" };
      break;

    case "romboid":
      shapeStyle = { clipPath: "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)" };
      break;

    case "bubblechat":
      shapeClass += " rounded-2xl relative";
      shapeStyle = { paddingBottom: '15px' }; 
      backgroundSvg = (
        <div className="absolute -bottom-3 right-3/4 w-4 h-4 bg-card border-b-2 border-r-2 border-inherit rotate-45 transform -translate-x-1/2" />
      );
      break;

    default:
      shapeClass += " rounded-2xl";
  }

  return { shapeClass, shapeStyle, backgroundSvg };
}