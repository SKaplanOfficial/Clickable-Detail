import { Point } from "./types";

/**
 * Props for {@link Polygon}.
 */
export interface PolygonProps {
  points: string;
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  opacity?: number;
  visible?: boolean;
  fillRule?: "nonzero" | "evenodd";
  onClick?: (location: { x: number; y: number }) => void;
}

/**
 * Dynamic JSX wrapper for SVG polygon element.
 *
 * @param props Props for the polygon element (see {@link PolygonProps}).
 * @returns A ReactSVG polygon element.
 *
 * @remarks
 * The `onClick` handler will work best if the polygon is a closed shape with no self-intersections. That said, it will work to some degree with any polygon (in the worst case, it will use the bounding box of the polygon to determine if the click was inside the polygon).
 *
 * @example
 * ```typescript
 * import { ClickableDetail, DynamicSVG, Polygon } from "./DynamicSVG";
 *
 * export default function Command() {
 *  return (
 *      <ClickableDetail>
 *          <DynamicSVG>
 *              <Polygon points="50,0 21,90 98,35 2,35 79,90" fill="red" fillRule="evenodd" onClick={() => console.log("Clicked A!")}/>
 *              <Polygon points="200,100 250,25 250,75 300,0" fill="green" onClick={() => console.log("Clicked B!")}/>
 *              <Polygon points="100,100 150,25 150,75 200,0" fill="none" stroke="black" onClick={() => console.log("Clicked C!")}/>
 *          </DynamicSVG>
 *      </ClickableDetail>
 *  );
 * }
 * ```
 */
export const Polygon = (props: PolygonProps) => {
  const { points, fill, fillOpacity, stroke, strokeWidth, strokeOpacity, opacity, visible, fillRule } = props;

  return (
    <polygon
      points={points}
      fill={fill || "black"}
      fillOpacity={fillOpacity || 1}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeOpacity={strokeOpacity || 1}
      opacity={opacity || 1}
      fillRule={fillRule || "nonzero"}
      visibility={visible == undefined ? "visible" : visible ? "visible" : "hidden"}
    />
  );
};

/**
 * Implements a basic Raycasting algorithm to determine if a point is inside an arbitrary polygon.
 * @param polygon The polygon to check.
 * @param x The x coordinate of the point to check.
 * @param y The y coordinate of the point to check.
 * @returns Whether or not the point is inside the polygon.
 */
Polygon.doesContainPoint = (polygon: JSX.Element, x: number, y: number) => {
  const points: Point[] = polygon.props.points
    .split(" ")
    .map((point: string) => point.split(","))
    .map((point: string[]) => ({ x: 15 + parseInt(point[0]), y: 15 + parseInt(point[1]) }));

  // Map points to edges
  const edges = points.map((point, index) => {
    const nextPoint = points[(index + 1) % points.length];
    return { x1: point.x, y1: point.y, x2: nextPoint.x, y2: nextPoint.y };
  });

  // Find bounding box
  const minX = Math.min(...points.map((point) => point.x));
  const minY = Math.min(...points.map((point) => point.y));
  const maxX = Math.max(...points.map((point) => point.x));
  const maxY = Math.max(...points.map((point) => point.y));

  // If the point is outside the bounding box, it's not inside the polygon (skip advanced logic)
  if (x < minX || x > maxX || y < minY || y > maxY) {
    return false;
  }

  // Create a ray
  const ray = { x1: points[0].x, y1: -100, x2: x, y2: y };
  const ray_m = (ray.y2 - ray.y1) / (ray.x2 - ray.x1);
  const ray_b = ray.y1 - ray_m * ray.x1;

  // Count intersections
  let intersections = 0;
  for (const edge of edges) {
    const edge_m = (edge.y2 - edge.y1) / (edge.x2 - edge.x1);
    const edge_b = edge.y1 - edge_m * edge.x1;

    const x0 = (edge_b - ray_b) / (ray_m - edge_m);
    const y0 = ray_m * ((edge_b - ray_b) / (ray_m - edge_m)) + ray_b;

    // If the intersection exists, is finite, and is within the bounds of the ray and the edge, count it
    if (isFinite(x0) && !isNaN(x0) && isFinite(y0) && !isNaN(y0)) {
      const startX = Math.min(ray.x1, ray.x2);
      const endX = Math.max(ray.x1, ray.x2);
      const startY = Math.min(ray.y1, ray.y2);
      const endY = Math.max(ray.y1, ray.y2);
      if (
        x0 >= startX &&
        x0 <= endX &&
        y0 >= startY &&
        y0 <= endY &&
        x0 >= minX &&
        x0 <= maxX &&
        y0 >= minY &&
        y0 <= maxY
      ) {
        intersections++;
      }
    }
  }

  return intersections % 2 != 0;
};
