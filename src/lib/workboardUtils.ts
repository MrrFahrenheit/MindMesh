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