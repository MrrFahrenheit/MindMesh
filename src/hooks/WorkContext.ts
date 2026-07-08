const MAP_KEY = "mesh-maps";

const getMaps = (): Record<string, any> => {
  try {
    const data = localStorage.getItem(MAP_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const saveMentalMap = (id: string, mentalMap: any) => {
  const currentMaps = getMaps();
  const updatedMaps = { ...currentMaps, [id]: mentalMap };
  localStorage.setItem(MAP_KEY, JSON.stringify(updatedMaps));
};

export const listStorageMentalMaps = () => {
  return Object.values(getMaps());
};

export const deleteStorageMentalMap = (id: string) => {
  const currentMaps = getMaps();
  delete currentMaps[id];
  localStorage.setItem(MAP_KEY, JSON.stringify(currentMaps));
};