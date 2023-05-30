import { useEffect, useRef, useState } from "react";
import { execScript } from "./utils";
import { Detail, environment } from "@raycast/api";
import ReactDOMServer from "react-dom/server";
import { SVGItem } from "./types";
import { Text } from "./Text";
import { Link } from "./Link";
import { H1 } from "./HTML";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
import { Polygon } from "./Polygon";
import { Line } from "./Line";
import { Toggle } from "./Toggle";
import path from "path";

export const ClickableDetail = (props: {
  children: SVGItem | SVGItem[];
  isLoading?: boolean;
  waitUntilAllLoaded?: boolean;
  actions?: React.ReactNode;
  navigationTitle?: string;
}) => {
  const { children, isLoading, waitUntilAllLoaded, actions, navigationTitle } = props;
  const [content, setContent] = useState<string>("");
  const [clickHandlers, setClickHandlers] = useState<((x: number, y: number) => boolean)[]>([]);
  const clickHandler = useRef(async (output: string) => {
    output;
  });

  const getChildrenRecursive = (child: JSX.Element): JSX.Element[] => {
    if (child.props?.children) {
      const childChildren = Array.isArray(child.props.children) ? child.props.children : [child.props.children];
      return [child, ...childChildren.flatMap((childChild: JSX.Element) => getChildrenRecursive(childChild))];
    }
    return [child];
  };

  useEffect(() => {
    if (isLoading && waitUntilAllLoaded) {
      return;
    }

    const newClickHandlers: ((x: number, y: number) => boolean)[] = [];
    const children = Array.isArray(props.children) ? props.children : [props.children];

    let heightUpToNow = 0;
    for (const child of children) {
      if (child.props.onClick) {
        newClickHandlers.push((x, y) => {
          if (
            x > child.props.x ||
            x < child.props.x + child.props.width ||
            y > heightUpToNow + child.props.y ||
            y < heightUpToNow + child.props.y + child.props.height
          ) {
            child.props.onClick({ x, y });
            return true;
          }
          return false;
        });
      }

      if (child.props.children) {
        const childChildren = getChildrenRecursive(child);
        for (const childChild of childChildren) {
          if (childChild.props?.onClick != undefined) {
            if (
              (childChild.props.x == undefined || childChild.props.y == undefined) &&
              childChild.type != Circle &&
              childChild.type != Ellipse &&
              childChild.type != Polygon &&
              childChild.type != Line
            ) {
              if (childChild.type == H1) {
                if (childChild.props.width == undefined || childChild.props.height == undefined) {
                  throw new Error("Child of clickable element must have x, y, width, and height props");
                }
              }
              throw new Error("Child of clickable element must have explicit dimensions and position.");
            }
            let computedDimensions = { w: childChild.props.width, h: childChild.props.height };
            if (childChild.type == Text || childChild.type == Link) {
              computedDimensions = Text.computeDimensions(childChild);
            }

            newClickHandlers.push((x: number, y: number) => {
              if (childChild.type == Line) {
                if (!Line.doesContainPoint(childChild, x, y)) {
                  return false;
                }
              } else if (childChild.type == Circle) {
                if (!Circle.doesContainPoint(childChild, x, y)) {
                  return false;
                }
              } else if (childChild.type == Ellipse) {
                if (!Ellipse.doesContainPoint(childChild, x, y)) {
                  return false;
                }
              } else if (childChild.type == Polygon) {
                if (!Polygon.doesContainPoint(childChild, x, y)) {
                  return false;
                }
              } else if (childChild.type == Toggle) {
                if (!Toggle.doesContainPoint(childChild, x, y)) {
                  return false;
                }
              } else if (
                !(
                  x > 15 + childChild.props.x &&
                  x < childChild.props.x + computedDimensions.w - 15 &&
                  y > 15 + childChild.props.y &&
                  y < childChild.props.y + computedDimensions.h
                )
              ) {
                return false;
              }

              try {
                childChild.props.onClick({x, y});
                return true;
              } catch (error) {
                console.log((error as Error).message);
                return false;
              }
            });
          }
        }
      }
      heightUpToNow += child.props.height || 0;
    }

    if (!newClickHandlers.every((handler) => clickHandlers.includes(handler))) {
      setClickHandlers(newClickHandlers);
    }

    const dataString = children
      .map(
        (child) =>
          `<img src="${encodeURI(`data:image/svg+xml;utf8,${ReactDOMServer.renderToString(child)}`).replaceAll(
            '"',
            "'"
          )}" alt="Dynamic SVG content" />`
      )
      .join("");
    setContent(dataString);
  }, [children, isLoading]);

  useEffect(() => {
    clickHandler.current = async (output: string) => {
      const coords = output.split(",");
      if (coords.length !== 2) {
        return;
      }

      const x = parseInt(coords[0]);
      const y = parseInt(coords[1]);

      for (const clickHandler of clickHandlers) {
        if (clickHandler(x, y)) {
          break;
        }
      }
    };
  }, [clickHandlers]);

  useEffect(() => {
    const scriptPath = path.resolve(environment.assetsPath, "clickable-detail", "DetectMouseInput.scpt");
    execScript(scriptPath, [], "JavaScript", (output) => clickHandler.current(output));
  }, []);

  return <Detail markdown={content == "" ? "" : content} isLoading={isLoading || content == ""} actions={actions} navigationTitle={navigationTitle} />;
};

ClickableDetail.defaultProps = {
  isLoading: false,
  waitUntilAllLoaded: false,
};
