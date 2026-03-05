export default function WorkPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4 w-screen h-screen">
            <div
                className="bg-card border border-border rounded-lg shadow-lg w-full h-full max-w-500 max-h-[600px]"
                style={{ aspectRatio: '4 / 3' }}
            >
                <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-[#F8F8FF] rounded-md "
                 style={{ aspectRatio: '4 / 3' }}>
                  <div
                className="bg-zinc-950 border border-border rounded-lg shadow-lg w-full h-full"
                style={{ aspectRatio: '4 / 3' }}
            ></div>
                </div>
            </div>
        </div>
    )
}
