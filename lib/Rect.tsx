/**
 * Props for {@link Rect}.
 */
export interface RectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  rx?: number;
  ry?: number;
  opacity?: number;
  visible?: boolean;
  onClick?: (location: { x: number; y: number }) => void;
}

/**
 * Dynamic JSX wrapper for SVG rect element.
 *
 * @param props Props for the rect element (see {@link RectProps}).
 * @returns A ReactSVG rect element.
 *
 * @example
 * ```typescript
 * import { ClickableDetail, DynamicSVG, Rect } from "./DynamicSVG";
 *
 * export default function Command() {
 *  return (
 *      <ClickableDetail>
 *          <DynamicSVG>
 *          <Rect x={50} y={50} width={100} height={100} fill="red" stroke="white" strokeWidth={2} />
 *          </DynamicSVG>
 *      </ClickableDetail>
 *  );
 * }
 * ```
 */
export const Rect = (props: RectProps) => {
  const { x, y, width, height, fill, fillOpacity, stroke, strokeWidth, strokeOpacity, rx, ry, opacity, visible } =
    props;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill || "white"}
      fillOpacity={fillOpacity || 1}
      stroke={stroke || "black"}
      strokeWidth={strokeWidth || 1}
      strokeOpacity={strokeOpacity || 1}
      rx={rx || 0}
      ry={ry || 0}
      opacity={opacity || 1}
      visibility={visible == undefined ? "visible" : visible ? "visible" : "hidden"}
    />
  );
};
