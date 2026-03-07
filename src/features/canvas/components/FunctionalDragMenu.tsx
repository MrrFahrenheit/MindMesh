import { useState } from "react";
import { WorkSideDragButton } from "../../sidebar/WorkSideBarDragButton";
import { WorkSideBar } from "../../sidebar/WorkSideBar";

export default function FunctionalDragMenu({onAddNode}:{onAddNode: () => void}) {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [position, setPosition] = useState<{x: number, y: number}>({x: 20, y: 20});

    const handleOpenMenu = () => {
        setOpenMenu((prev) => !prev);
    }

    if(!openMenu)return (
        <WorkSideDragButton openMenu={handleOpenMenu} onChangePosition={setPosition} defaultPosition={position} />
    )

    return(
        <WorkSideBar onAddNode={onAddNode} x={position.x} y={position.y} handleClose={() => setOpenMenu(false)} onChangePosition={setPosition} />
    )
}
