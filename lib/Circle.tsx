/**
 * Props for {@link Circle}.
 */
export interface CircleProps {
    cx: number;
    cy: number;
    radius: number;
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
   * Dynamic JSX wrapper for SVG circle element.
   *
   * @param props Props for the circle element (see {@link CircleProps}).
   * @returns A ReactSVG circle element.
   *
   * @example
   * ```typescript
   * import { ClickableDetail, DynamicSVG, Circle } from "./DynamicSVG";
   *
   * export default function Command() {
   *  return (
   *      <ClickableDetail>
   *          <DynamicSVG>
   *              <Circle cx={100} cy={100} radius={50} fill="red" onClick={() => console.log("Clicked the circle!")} />
   *          </DynamicSVG>
   *      </ClickableDetail>
   *  );
   * }
   * ```
   */
  export const Circle = (props: CircleProps) => {
    const { cx, cy, radius, fill, fillOpacity, stroke, strokeWidth, strokeOpacity, opacity, visible } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={radius}
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
  
  Circle.doesContainPoint = (circle: JSX.Element, x: number, y: number) => {
    const radius = circle.props.radius;
    const cx = circle.props.cx;
    const cy = circle.props.cy;
    return Math.sqrt(Math.pow(x - (cx + 15), 2) + Math.pow(y - (cy + 15), 2)) < radius
  };
  