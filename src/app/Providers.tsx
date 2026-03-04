import { QueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { ThemeProvider } from "next-themes"
import { ReactFlowProvider } from "@xyflow/react"

export function Providers({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // 5 minutes
                gcTime: 1000 * 60 * 5,
                retry: 1,
            }
        }
    }))

    return (
        <ThemeProvider
        attribute="class" defaultTheme="system"
        enableSystem disableTransitionOnChange>
            <ReactFlowProvider>
                {children}
            </ReactFlowProvider>
        </ThemeProvider>
    )
}
