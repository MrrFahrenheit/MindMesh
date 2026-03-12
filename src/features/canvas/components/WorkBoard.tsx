import type { Node } from "@xyflow/react";
import {
    Background,
    Controls,
    MiniMap,
    ReactFlow,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    type Connection,
    type EdgeChange,
    type NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { MindMeshNode } from "../../../components/shared/MindMeshNode";
import { DeleteNodeManager } from "../../../lib/workboardUtils.tsx";
import type { IEdge, MindMeshNodeData } from "../../../types/IWorkPlace";
import EditNoveMenu from "./EditNoveMenu";
import FunctionalDragMenu from "./FunctionalDragMenu";
import RgbMenu from "./RgbMenu.tsx";

const nodeTypes = {
    mindmesh: MindMeshNode,
};

export default function WorkBoard() {
    const openMenu = useCallback((node: Node) => {
        setEditingNodeId(node.id);
        setOpenNodeMenu(true);
    }, []);

    const [projectName, setProjectName] = useState<string>("New Project");
    const [openColorBar, setOpenColorBar] = useState<boolean>(false);
    const [nodes, setNodes] = useState<Array<MindMeshNodeData>>(() => [
        { id: "1", type: "mindmesh", data: { title: "Primer Nodo", textColor:"", label: "Idea principal", shape: "square", onSelect: openMenu } as any, position: { x: 250, y: 5 } },
    ]);
    const [edges, setEdges] = useState<Array<IEdge>>([]);
    const { theme } = useTheme();

    // ** Estados para gestión del menú de edición de nodos */
    const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
    const [openNodeMenu, setOpenNodeMenu] = useState<boolean>(false);
    const [typeToSetColor, setTypeToSetColor] = useState<string>("text");

    const flowTheme = theme === "dark" ? "dark" : "light";

    const handleOpenColorBar = (type:string = "text") => {
        setTypeToSetColor(type);
        setOpenColorBar(prev => !prev)
    }

    const addNode = useCallback(() => {
        const id = `${nodes.length + 1}`;
        const newNode: MindMeshNodeData = {
            id,
            type: "mindmesh",
            data: {
                title: `Nuevo Nodo ${id}`,
                label: `Describe Nodo ${id}`,
                shape: "square",
                bold: false,
                italic: false,
                underline: false,
                onSelect: openMenu,
            } as any,
            position: { x: Math.random() * 400, y: Math.random() * 400 },
        };
        setNodes((nds) => [...nds, newNode]);
    }, [nodes]);

    // Handlers obligatorios de React Flow
    const onNodesChange = useCallback((changes: Array<NodeChange>) => {
        setNodes((nds) =>
            applyNodeChanges(changes, nds).map(node => ({
                ...node,
                type: node.type ?? "mindmesh"
            })) as MindMeshNodeData[]
        );
    }, []);
    const onEdgesChange = useCallback((changes: Array<EdgeChange<IEdge>>) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
    const onConnect = useCallback((connection: Connection) => {
        setEdges((eds) =>
            addEdge(
                {
                    ...connection,
                    data: { label: "Nueva conexión" },
                } as IEdge,
                eds
            )
        );
    }, []);

    useEffect(() => {
        document.title = `MindMesh - ${projectName}`
    },[])

    return (
        <div className="w-full h-screen relative">
            <FunctionalDragMenu onAddNode={addNode} />
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                colorMode={flowTheme}
                fitView

            >
                {openNodeMenu && editingNodeId && (
                    <EditNoveMenu onCloseMenu={() => setOpenNodeMenu(false)} nodeId={editingNodeId} onOpenColorBar={handleOpenColorBar} />
                )}
                {openColorBar && <RgbMenu onClose={handleOpenColorBar} editingNodeId={editingNodeId} nodesOnBoard={nodes} setNodesOnBoard={setNodes} type={typeToSetColor}/>}
                <DeleteNodeManager />
                <MiniMap
                    style={{
                        backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
                        border: theme === "dark" ? "1px solid #555" : "1px solid #ddd",
                    }}
                    nodeColor={theme === "dark" ? "#fff" : "#000"}
                    maskColor={theme === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)"}
                />
                <Controls />
                <Background
                    color={theme === "dark" ? "#333" : "#ccc"}
                    variant={"dots" as any}
                />
            </ReactFlow>
        </div>
    );
}