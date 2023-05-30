/**
 * Props for {@link Ellipse}.
 */
export interface EllipseProps {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  opacity?: number;
  visible?: boolean;
  onClick?: (location: { x: number; y: number }) => void;
}

/**
 * Dynamic JSX wrapper for SVG ellipse element.
 *
 * @param props Props for the ellipse element (see {@link EllipseProps}).
 * @returns A ReactSVG ellipse element.
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
export const Ellipse = (props: EllipseProps) => {
  const { cx, cy, rx, ry, fill, fillOpacity, stroke, strokeWidth, strokeOpacity, opacity, visible } = props;

  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill={fill || "black"}
      fillOpacity={fillOpacity || 1}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeOpacity={strokeOpacity || 1}
      opacity={opacity || 1}
      visibility={visible == undefined ? "visible" : visible ? "visible" : "hidden"}
    />
  );
};

Ellipse.doesContainPoint = (ellipse: JSX.Element, x: number, y: number) => {
  const rx = ellipse.props.rx;
  const ry = ellipse.props.ry;
  const cx = ellipse.props.cx;
  const cy = ellipse.props.cy;
  return Math.pow((x - cx - 15) / rx, 2) + Math.pow((y - cy - 15) / ry, 2) < 1;
};
