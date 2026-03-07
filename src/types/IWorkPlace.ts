import type { Edge, Node } from "@xyflow/react";

export interface MindMeshNodeData extends Node {
    id: string;
    type: string;
    data: {
        title: string;
        label: string;
        shape?: string;
    };
    position: {
        x: number;
        y: number;
    };
    onSelect?: (node: any) => void;
    className?: string;
}

export interface IEdge extends Edge {
    data: { label: string };
}

export interface IConnection{
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
    type?: string;
    data?: {
        label: string;
    };
}