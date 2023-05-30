/**
 * Props for {@link Path}.
 */
export interface PathProps {
  d: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
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
 * Dynamic JSX wrapper for SVG path element.
 *
 * @param props Props for the path element (see {@link PathProps}).
 * @returns A ReactSVG path element.
 *
 * @example
 * ```typescript
 * import { ClickableDetail, DynamicSVG, Path } from "./DynamicSVG";
 *
 * export default function Command() {
 * return (
 *  <ClickableDetail>
 *    <DynamicSVG fill="red">
 *      <Path
 *        d="M 213.1,6.7
 *          c -32.4-14.4-73.7,0-88.1,30.6
 *          C 110.6,4.9,67.5-9.5,36.9,6.7
 *          C 2.8,22.9-13.4,62.4,13.5,110.9
 *          C 33.3,145.1,67.5,170.3,125,217
 *          c 59.3-46.7,93.5-71.9,111.5-106.1
 *          C 263.4,64.2,247.2,22.9,213.1,6.7
 *          z"
 *        />
 *      </DynamicSVG>
 *    </ClickableDetail>
 *  );
 * }
 * ```
 */
export const Path = (props: PathProps) => {
  const { d, x, y, width, height, fill, fillOpacity, stroke, strokeWidth, strokeOpacity, opacity, visible, fillRule } =
    props;

  return (
    <path
      d={d}
      x={x}
      y={y}
      width={width}
      height={height}
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
