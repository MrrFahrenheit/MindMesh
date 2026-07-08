import { toPng } from 'html-to-image';

export const getMapFile = async () => {
  const filter = (node) => {
    return !(
      node?.classList?.contains('react-flow__minimap') ||
      node?.classList?.contains('react-flow__controls')
    );
  };

  try {
    const dataUrl = await toPng(document.querySelector('.react-flow__viewport'), {
      filter: filter,
      backgroundColor: '#202020',
    });

    return dataUrl;
  } catch (error) {
    console.error('Error al generar el archivo del mapa:', error);
    throw error;
  }
};