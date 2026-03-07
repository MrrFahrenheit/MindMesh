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
import { useCallback, useState } from "react";
import { MindMeshNode } from "../../../components/shared/MindMeshNode";
import { DeleteNodeManager } from "../../../lib/workboardUtils";
import type { IEdge, MindMeshNodeData } from "../../../types/IWorkPlace";
import EditNoveMenu from "./EditNoveMenu";
import FunctionalDragMenu from "./FunctionalDragMenu";

const nodeTypes = {
    mindmesh: MindMeshNode,
};

export default function WorkBoard() {
    const openMenu = useCallback((node: Node) => {
        setEditingNodeId(node.id);
        setOpenNodeMenu(true);
    }, []);

    const [nodes, setNodes] = useState<Array<Node>>(() => [
        { id: "1", type: "mindmesh", data: { title: "Primer Nodo", label: "Idea principal", shape: "square", onSelect: openMenu } as any, position: { x: 250, y: 5 } },
    ]);
    const [edges, setEdges] = useState<Array<IEdge>>([]);

    // ** Estados para gestión del menú de edición de nodos */
    const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
    const [openNodeMenu, setOpenNodeMenu] = useState<boolean>(false);

    const addNode = useCallback(() => {
        const id = `${nodes.length + 1}`;
        const newNode: MindMeshNodeData = {
            id,
            type: "mindmesh",
            data: {
                title: `Nuevo Nodo ${id}`,
                label: `Describe Nodo ${id}`,
                shape: "square",
                onSelect: openMenu,
            } as any,
            position: { x: Math.random() * 400, y: Math.random() * 400 },
        };
        setNodes((nds) => [...nds, newNode]);
    }, [nodes]);

    // Handlers obligatorios de React Flow
    const onNodesChange = useCallback((changes: Array<NodeChange>) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
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
                fitView
            >
                {openNodeMenu && editingNodeId && (
                  <EditNoveMenu onCloseMenu={() => setOpenNodeMenu(false)} nodeId={editingNodeId} />
                )}

                <DeleteNodeManager />
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
}