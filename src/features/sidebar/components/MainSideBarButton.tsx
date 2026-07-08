import { ChevronRight } from "lucide-react";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

export interface ISideBarButton{
    label:string,
    icon:JSX.Element,
    path:string
}

export default function MainSideBarButton({buttonData} : {buttonData:ISideBarButton}) {
    const isActive = location.pathname === buttonData.path;
    const navigate = useNavigate();

    return (
        <button
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                } hover:cursor-pointer`}
                onClick={() => navigate(buttonData.path)}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? "text-primary" : "group-hover:text-primary transition-colors"}>
                    {buttonData.icon}
                  </span>
                  <span className="font-medium text-sm">{buttonData.label}</span>
                </div>
                {isActive && <ChevronRight size={14} />}
              </button>
    )
}
