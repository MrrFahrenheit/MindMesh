export default function WorkPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4 w-screen h-screen">
            <div
                className="bg-card border border-border rounded-lg shadow-lg w-full h-full max-w-500 max-h-[600px]"
                style={{ aspectRatio: '4 / 3' }}
            >
                {/* Aquí puedes añadir contenido para la pizarra, como nodos o dibujos */}
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Pizarra de trabajo — adaptable hasta 800×600
                </div>
            </div>
        </div>
    )
}
