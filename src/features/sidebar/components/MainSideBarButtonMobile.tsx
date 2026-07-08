import { useNavigate } from "react-router-dom";
import type { ISideBarButton } from "./MainSideBarButton";

export default function MainSideBarButtonMobile({ buttonData }: { buttonData: ISideBarButton }) {
    const isActive = location.pathname === buttonData.path;
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(buttonData.path)}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"
                }`}
        >
            <div className={`p-1 rounded-lg ${isActive ? "bg-primary/10" : ""}`}>
                {buttonData.icon}
            </div>
            <span className="text-[10px] font-medium mt-1">{buttonData.label}</span>
        </button>
    )
}
