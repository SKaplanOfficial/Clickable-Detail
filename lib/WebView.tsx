import { renderURL } from "./WebUtils";

/**
 * Props for {@link HTML}.
 */
export interface WebViewProps {
  URL: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  onClick?: (location: { x: number; y: number }) => void;
}

/**
 * Renders URL content to an SVG image component.
 * @param props Props for the WebView component. See {@link WebViewProps}.
 * @returns An SVG image component with the URL's content loaded and rendered to it.
 *
 * @remarks
 * This component provides a non-interactive way to render web content to an SVG image component. That said, you can supply an `onClick` prop to the component to implement your own interaction logic.
 *
 * @example
 * ```typescript
 * import { ClickableDetail, DynamicSVG } from "./DynamicSVG";
 * import { WebView } from "./DynamicSVG/WebView";
 * import { open } from "@raycast/api";
 *
 * export default function Command() {
 *  return (
 *      <ClickableDetail>
 *          <DynamicSVG>
 *              <WebView URL="https://raycast.com" onClick={() => open("https://raycast.com")}/>
 *          </DynamicSVG>
 *      </ClickableDetail>
 *  );
 * }
 * ```
 */
export const WebView = (props: WebViewProps) => {
  const { URL, x, y, width, height } = props;
  const URLContentBase64 = `data:image/jpg;base64,${renderURL(URL, width || 1366, height || 675)}`;
  return (
    <image xlinkHref={URLContentBase64} x={x} y={y} width={width || 750} height={height} min-height={height || 375} />
  );
};

WebView.defaultProps = {
  x: 0,
  y: 0,
  width: 750,
  height: 370,
};
