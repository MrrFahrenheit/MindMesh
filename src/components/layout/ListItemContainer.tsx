import type { JSX } from "react";

export default function ListItemContainer({image, title, date, deleteFun, edit, id} : {image?:string, title:string, date:string, deleteFun?: (mapIdString:string) => void, edit?: () => void, id: string }) {
    
    return (
        <div className="w-3/4 max-h-50 flex flex-col bg-gray-950 p-2 rounded-md gap-1 hover:bg-gray-800 transition-all hover:cursor-pointer">
            <div className="h-1/3 w-full mb-3">
                {image && <img src={image} />}
                {!image && <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Sin Imagen</span>
                </div>}
            </div>
            <div className="h-1/3 w-full flex items-center  text-gray-400 text-sm">
                <span className="text-gray-400 text-lg font-bold">{title}</span>
            </div>
            <div className="h-1/3 w-full flex items-center justify-between text-gray-400 text-sm">
                <span>{date}</span>
                <div className="flex gap-2">
                    {edit && (
                        <button onClick={edit} className="text-blue-500 hover:text-blue-400">
                            Editar
                        </button>
                    )}
                    {deleteFun && (
                        <button onClick={() => deleteFun(id)} className="text-red-500 hover:text-red-400">
                            Eliminar
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
