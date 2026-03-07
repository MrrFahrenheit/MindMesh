export const getNodeShape = (shape: string) => {
    let shapeClass = "rounded-2xl";
    let shapeStyle: React.CSSProperties | undefined;
    switch (shape) {
    case "circle":
      shapeClass = "rounded-full";
      break;
    case "square":
      shapeClass = "rounded-none";
      break;
    case "triangle":
      shapeClass = "rounded-none";
      shapeStyle = { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" };
      break;
    default:
      shapeClass = "rounded-2xl";
  }

  return { shapeClass, shapeStyle };
}