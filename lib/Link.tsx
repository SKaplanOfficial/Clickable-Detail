import { open } from "@raycast/api";
import { Text, TextProps } from "./Text";

/**
 * Props for {@link Link}.
 */
type LinkProps = {
  target: string;
};

/**
 * Dynamic JSX wrapper for SVG text element that opens a link on click.
 *
 * @param props Props for the link element (see {@link LinkProps} and {@link TextProps}).
 * @returns A ReactSVG text element.
 *
 * @example
 * ```typescript
 * import { ClickableDetail, DynamicSVG, Link } from "./DynamicSVG";
 *
 * export default function Command() {
 *  return (
 *      <ClickableDetail>
 *          <DynamicSVG>
 *              <Link x={0} y={15} target="https://raycast.com">
 *                  Raycast
 *              </Link>
 *          </DynamicSVG>
 *      </ClickableDetail>
 *  );
 * }
 * ```
 */
export const Link = (props: TextProps & LinkProps) => {
  const { target, x, y, width, height, opacity, visible, fontSize, fontFamily, children } = props;
  props.onClick = () => open(target);
  return (
    <Text
      x={x}
      y={y}
      width={width}
      height={height}
      opacity={opacity}
      visible={visible}
      onClick={props.onClick}
      color={"blue"}
      fontSize={fontSize}
      fontFamily={fontFamily}
    >
      {children}
    </Text>
  );
};

/**
 * Default props for {@link Link}.
 */
Link.defaultProps = {
  onClick: () => open("https://bing.com"),
};
