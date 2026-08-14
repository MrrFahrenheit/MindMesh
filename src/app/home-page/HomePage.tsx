import { useEffect, useState } from "react";
import { ThemeToggle } from "../../components/shared/ThemeToggle";
import { useNavigate } from "react-router-dom";
import HomePagePresentation from "../../components/blocks/Forms/HomePagePresentation";
import Auth from "../../components/blocks/Forms/Auth";

export default function HomePage() {

  useEffect(() => {
    document.title = "MindMesh - Conecta tus ideas, mapea tu mente";
  }, [])

  const [actualForm, setActualForm] = useState<"register" | "login">("register");

  const navigate = useNavigate();

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background transition-colors duration-500">

      {/* 1. Malla (Mesh) Adaptativa: Más visible en light, casi invisible en dark */}
      <div
        className="absolute inset-0 z-0 opacity-[0.15] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 bg-primary/20 dark:bg-primary/10 blur-[100px] dark:blur-[130px] rounded-full z-0 pointer-events-none" />

      <nav className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </nav>

      <section className="z-10 text-center px-4 flex flex-col items-center max-w-4xl">
        {actualForm == null ? <HomePagePresentation /> : <Auth mode={actualForm} />}

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <button className="group relative px-10 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/25 dark:shadow-primary/10 border border-border hover:cursor-pointer"
            onClick={() => setActualForm("register")}>
            Crear Cuenta
            {/* Efecto de brillo al pasar el mouse */}
            <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button className="group relative px-10 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/25 dark:shadow-primary/10 border border-border hover:cursor-pointer"
            onClick={() => setActualForm("login")}>
            Iniciar Sesion
            {/* Efecto de brillo al pasar el mouse */}
            <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </section>

      {/* Footer minimalista */}
      <footer className="absolute bottom-10 flex flex-col items-center gap-2">
        <div className="w-12 h-[1px] bg-border mb-2" />
        <p className="text-[10px] tracking-widest uppercase text-muted-foreground/60">
          Mr.Fahrenheit (Johandry Luna) • 2026
        </p>
      </footer>
    </main>
  );
}