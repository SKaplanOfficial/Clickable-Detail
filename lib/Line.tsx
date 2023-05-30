/**
 * Props for {@link Line}.
 */
export interface LineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  opacity?: number;
  visible?: boolean;
  onClick?: (location: { x: number; y: number }) => void;
}

/**
 * Dynamic JSX wrapper for SVG line element.
 *
 * @param props Props for the line element (see {@link LineProps}).
 * @returns A ReactSVG line element.
 *
 * @example
 * ```typescript
 * import { ClickableDetail, DynamicSVG, Line } from "./DynamicSVG";
 *
 * export default function Command() {
 *  return (
 *      <ClickableDetail>
 *          <DynamicSVG>
 *              <Line x1={0} y1={0} x2={100} y2={100} strokeWidth={10} onClick={() => console.log("Test")} />
 *          </DynamicSVG>
 *      </ClickableDetail>
 *  );
 * }
 * ```
 */
export const Line = (props: LineProps) => {
  const { x1, y1, x2, y2, stroke, strokeWidth, strokeOpacity, opacity, visible } = props;

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke || "black"}
      strokeWidth={strokeWidth || 1}
      strokeOpacity={strokeOpacity || 1}
      opacity={opacity || 1}
      visibility={visible == undefined || visible ? "visible" : "hidden"}
    />
  );
};

Line.defaultProps = {
  stroke: "black",
  strokeWidth: 1,
  strokeOpacity: 1,
  opacity: 1,
  visible: true,
};

Line.doesContainPoint = (line: JSX.Element, x: number, y: number) => {
  const { x1, y1, x2, y2, strokeWidth } = line.props;

  const line_m = (y2 + 15 - (y1 + 15)) / (x2 + 15 - (x1 + 15));
  const line_b = y1 + 15 - line_m * (x1 + 15);
  const line_eq = (nx: number, ny: number) => {
    if (Math.abs(ny - (line_m * nx + line_b)) < strokeWidth) {
      return true;
    }
    return false;
  };

  return line_eq(x, y);
};
