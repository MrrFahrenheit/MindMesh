import { Home, Brain, LayoutTemplate, Settings, ChevronRight, PlusCircle } from "lucide-react";
import { ThemeToggle } from "../../components/shared/ThemeToggle";
import DefaultButton from "../../components/shared/DefaultButton";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();
  const menuItems = [
    { icon: <Home size={20} />, label: "Inicio", active: true, path: "/app/" },
    { icon: <Brain size={20} />, label: "Mis Mapas", path: "/app/maps" },
    { icon: <LayoutTemplate size={20} />, label: "Plantillas", path: "/app/templates" },
    { icon: <Settings size={20} />, label: "Ajustes", path: "/app/settings" },
  ];

  return (
    <aside className="w-64 h-screen bg-card/50 dark:bg-card/30 backdrop-blur-xl border-r border-border flex flex-col transition-all duration-300">
      
      {/* Header de la Sidebar - Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
          <Brain className="text-primary-foreground" size={20} />
        </div>
        <span className="font-bold text-xl tracking-tight text-foreground">
          Mind<span className="text-primary">Mesh</span>
        </span>
      </div>

      {/* Botón de Acción Principal */}
      <div className="px-4 mb-6">
        <DefaultButton Icon={<PlusCircle size={18} />} label="Nuevo Nodo" onClickFunc={() => navigate("/minding/")} />
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
              item.active 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            } hover:cursor-pointer hover:bg-black/30`}
            onClick={() => {navigate(item.path)}}
          >
            <div className="flex items-center gap-3">
              <span className={item.active ? "text-primary" : "group-hover:text-primary transition-colors"}>
                {item.icon}
              </span>
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            {item.active && <ChevronRight size={14} />}
          </button>
        ))}
      </nav>

      {/* Footer de la Sidebar - Usuario/Espacio */}
      <div className="p-4 border-t border-border bg-accent/20">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-purple-500" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground leading-none text-left">Tu Mente</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
}