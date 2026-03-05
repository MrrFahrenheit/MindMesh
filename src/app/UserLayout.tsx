import { Outlet } from "react-router-dom";
import SideBar from "../features/sidebar/SideBar";

export default function UserLayout() {
    return (
        <main className="relative w-full min-h-screen flex overflow-hidden bg-background transition-colors duration-500">
            <div 
        className="absolute inset-0 z-0 opacity-[0.15] dark:opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', 
          backgroundSize: '32px 32px' 
        }} 
      />

            <SideBar />
            <Outlet />
        </main>
    )
}
