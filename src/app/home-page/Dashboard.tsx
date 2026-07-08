import { useEffect, useState } from "react";
import { deleteStorageMentalMap, listStorageMentalMaps } from "../../hooks/WorkContext"
import ListItemContainer from "../../components/layout/ListItemContainer";

export default function Dashboard() {

    const [yourMaps, setYourMaps] = useState([]);

    useEffect(() => {
        const setUserMaps = () => {
            const userMapsFetchedStorage = listStorageMentalMaps();
            setYourMaps(userMapsFetchedStorage)
        }

        setUserMaps();
    }, [])

    const handleDeleteMap = (mapId: string) => {
        deleteStorageMentalMap(mapId);
        setYourMaps(prevMaps => prevMaps.filter(map => map.id !== mapId));
    }

    const handleEditMap = (mapId: string) => {
        // Implement your edit logic here
        console.log(`Edit map with ID: ${mapId}`);
    }

    console.log(listStorageMentalMaps());

    return (
        <section className="w-full h-screen">
            <div className="w-full h-1/5 flex items-center justify-center">
                <h2 className="text-lg font-bold tracking-tight text-foreground ">Bienvenido de vuelta, Tu Mente</h2>
            </div>
            <div className="w-full grid-cols-3 mx-5">
                <div className="">
                    <h2 className="text-lg font-bold tracking-tight text-foreground ">Plantillas</h2>
                </div>
            </div>

            <div className="w-full grid-cols-3 mx-5">
                <div className="">
                    <h2 className="text-lg font-bold tracking-tight text-foreground ">Tus Mapas</h2>
                </div>
            </div>
            <div className="w-full grid grid-cols-4 mx-5 gap-2 overflow-y-scroll h-3/5">
                {yourMaps.map((currentMap, index) => (
                    <ListItemContainer title={currentMap.name} image={currentMap.thumbnail} date={currentMap.date} deleteFun={handleDeleteMap} edit={handleEditMap} id={currentMap.id} />
                ))}
            </div>
        </section>
    )
}
