import React from 'react'

export default function HomePagePresentation() {
    return (
        <>
            {/* Badge con Glassmorphism para modo claro */}
            <div className="inline-block px-4 py-1.5 mb-8 text-[10px] font-bold tracking-[0.2em] uppercase bg-card/50 dark:bg-card/20 backdrop-blur-md border border-border rounded-full text-primary animate-fade-in shadow-sm">
                Beta v1.0 disponible
            </div>

            {/* Título con gradiente dinámico */}
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-linear-to-b from-foreground via-foreground to-foreground/50 bg-clip-text">
                Mind<span className="text-primary italic">Mesh</span>
            </h1>

            <div className="relative group">
                <p className="max-w-160 text-lg md:text-2xl text-muted-foreground leading-snug mb-10 text-balance">
                    La herramienta para conectar tus ideas, estructurar tus pensamientos y <span className="text-foreground font-semibold decoration-primary/30 decoration-4 underline-offset-4 underline italic">mapear tu mente</span> sin fricciones.
                </p>
            </div>
        </>
    )
}
