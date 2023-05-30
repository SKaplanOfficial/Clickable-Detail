/**
 * Props for {@link Text}.
 */
export interface TextProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  opacity?: number;
  visible?: boolean;
  onClick?: (location: { x: number; y: number }) => void;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  children: string | string[];
}

/**
 * Dynamic JSX wrapper for SVG text element.
 *
 * @param props Props for the text element (see {@link TextProps}).
 * @returns A ReactSVG text element.
 *
 * @example
 * ```typescript
 * import { ClickableDetail, DynamicSVG, Text } from "./DynamicSVG";
 *
 * export default function Command() {
 *  return (
 *      <ClickableDetail>
 *          <DynamicSVG>
 *              <Text x={100} y={100}>
 *                  Hello, world!
 *              </Text>
 *          </DynamicSVG>
 *      </ClickableDetail>
 *  );
 * }
 * ```
 */
export const Text = (props: TextProps) => {
  const { x, y, width, height, opacity, visible, color, fontSize, fontFamily, children } = props;

  return (
    <text
      x={0 + x}
      y={15 + y}
      width={width}
      height={height}
      opacity={opacity || 1}
      visibility={visible == undefined ? "visible" : visible ? "visible" : "hidden"}
      fill={color || "white"}
      fontSize={fontSize || 16}
      fontFamily={fontFamily || "Tahoma"}
    >
      {children}
    </text>
  );
};

/**
 * Computes the dimensions of a text element.
 * @param text The text element to compute the dimensions of.
 * @returns An object containing the computed width and height of the text element.
 */
Text.computeDimensions = (text: Text) => {
  const { width, height, fontSize, children } = (text as JSX.Element).props;
  if (width && height) {
    return { w: width, h: height };
  } else if (width && !height) {
    const textHeight = 1.1 * (fontSize || 16) * (children.toString().split("\n").length + 1);
    return { w: width, h: textHeight };
  } else if (!width && height) {
    const textWidth =
      Math.max(
        ...children
          .toString()
          .split("\n")
          .map((line: string) => line.length)
      ) *
        (fontSize || 16) -
      (fontSize || 16);
    return { w: textWidth, h: height };
  } else {
    const textWidth =
      Math.max(
        ...children
          .toString()
          .split("\n")
          .map((line: string) => line.length)
      ) *
        (fontSize || 16) -
      (fontSize || 16);
    const textHeight = 1.1 * (fontSize || 16) * (children.toString().split("\n").length + 1);
    return { w: textWidth, h: textHeight };
  }
};
