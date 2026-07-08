import { Home, Brain, LayoutTemplate, Settings, ChevronRight, PlusCircle } from "lucide-react";
import { ThemeToggle } from "../../components/shared/ThemeToggle";
import DefaultButton from "../../components/shared/DefaultButton";
import { useNavigate, useLocation } from "react-router-dom";
import MainSideBarButton, { type ISideBarButton } from "./components/MainSideBarButton";
import MainSideBarButtonMobile from "./components/MainSideBarButtonMobile";

export default function SideBar() {
  const navigate = useNavigate();

  const menuItems:Array<ISideBarButton> = [
    { icon: <Home size={22} />, label: "Inicio", path: "/app/" },
    { icon: <Brain size={22} />, label: "Mapas", path: "/app/maps" },
    { icon: <LayoutTemplate size={22} />, label: "Plantillas", path: "/app/templates" },
    { icon: <Settings size={22} />, label: "Ajustes", path: "/app/settings" },
  ];

  return (
    <>
      {/* --- SIDEBAR (Escritorio: md+) --- */}
      <aside className="hidden md:flex w-64 h-screen bg-card/50 dark:bg-card/30 backdrop-blur-xl border-r border-border flex-col transition-all duration-300">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <Brain className="text-primary-foreground" size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">
            Mind<span className="text-primary">Mesh</span>
          </span>
        </div>

        <div className="px-4 mb-6">
          <DefaultButton 
            Icon={<PlusCircle size={18} />} 
            label="Nuevo Mapa" 
            onClickFunc={() => navigate("/minding/")} 
          />
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item, index) => (
            <MainSideBarButton buttonData={item} key={index} />
          ))}
        </nav>

        <div className="p-4 border-t border-border bg-accent/20">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-purple-500" />
            <div className="flex flex-col flex-1">
              <span className="text-sm font-semibold text-foreground leading-none text-left">Tu Mente</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>

      {/* --- BOTTOM BAR (Móvil: < md) --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-t border-border px-1 pb-safe-area-inset-bottom">
        <div className="flex justify-around items-center h-16">
          {menuItems.map((item, index) => (
              <MainSideBarButtonMobile buttonData={item} key={index} />
          ))}
          
          <button 
            onClick={() => navigate("/minding/")}
            className="flex flex-col items-center justify-center flex-1"
          >
            <div className="bg-primary rounded-full shadow-lg shadow-primary/40 text-primary-foreground">
              <PlusCircle size={24} />
            </div>
            <span className="text-[10px] font-medium mt-1 text-foreground">Nuevo</span>
          </button>
        </div>
      </nav>
    </>
  );
}