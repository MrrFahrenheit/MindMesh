import { useState } from 'react'
import ListItemContainer from '../layout/ListItemContainer'
import type { IMindMeshMap } from '../../types/IWorkPlace'
import NotFoundMaps from './Screens/NotFoundMaps';

export default function MapsList() {

    const [yourMaps, setYourMaps] = useState<Array<IMindMeshMap>>([]);

    return (
        <div className="w-full grid grid-cols-4 mx-5 gap-2 overflow-y-scroll h-3/5">
            {yourMaps.length <= 0 ?
                (<NotFoundMaps />)
                :
                yourMaps.map((currentMap, index) => (
                    <ListItemContainer title={currentMap.name} image={currentMap.thumbnail} date={currentMap.date} deleteFun={handleDeleteMap} edit={editingMapId === currentMap.id} id={currentMap.id} />
                ))}
        </div>
    )
}
