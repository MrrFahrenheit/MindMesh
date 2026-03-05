import React from "react";

export default function DefaultButton({
    Icon,
    label,
    rightIcon,
    className = "",
    ...props
}: {
    Icon: React.ReactNode,
    label: string,
    rightIcon?: React.ReactNode,
    className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={
                `
            /* Layout & Estructura */
            w-full py-2.5 px-4 rounded-xl font-semibold
            flex items-center justify-center gap-2 
            transition-all duration-300 cursor-pointer
            
            /* --- MODO DEFAULT (LIGHT) --- */
            bg-primary text-primary-foreground
            border-2 border-primary/20
            shadow-[0_4px_0_0_rgba(0,0,0,0.05)] /* Sombra de base para dar volumen */
            
            hover:bg-primary 
            hover:border-primary/40
            hover:shadow-primary/20
            
            /* --- MODO DARK --- */
            dark:bg-primary/90
            dark:text-white
            dark:border-white/10
            dark:shadow-[0_0_20px_rgba(var(--primary),0.1)]
            
            dark:hover:bg-primary
            dark:hover:border-white/20
            dark:hover:shadow-primary/40

            /* Efectos de Interacción */
            hover:-translate-y-0.5
            active:translate-y-0.5 active:scale-[0.98]
            
            /* Accesibilidad */
            focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none
        ` +
                ` ${className}`
            }
            {...props}
        >
            <span className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                {Icon}
            </span>
            <span className="tracking-wide">{label}</span>
            {rightIcon && <span className="ml-auto">{rightIcon}</span>}
        </button>
    )
}