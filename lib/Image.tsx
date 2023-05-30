import { useEffect, useState } from "react";
import { PreloadState } from "./types";
import fetch from "node-fetch";

/**
 * Props for {@link Image}.
 */
export interface ImageProps {
  imageDataURI?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity?: number;
  visible?: boolean;
  onClick?: (location: { x: number; y: number }) => void;
}

/**
 * Dynamic JSX wrapper for SVG image element.
 *
 * @param props Props for the image element (see {@link ImageProps}).
 * @returns A ReactSVG image element.
 *
 * @remarks
 * The `imageDataURI` prop is a base64-encoded string representing the image data. It can either be passed directly, or it can be passed as part of a {@link PreloadState} object, which is returned by {@link usePreloadedImages}.
 *
 * @example
 * ```typescript
 * import { ClickableDetail, DynamicSVG, Image, usePreloadedImages } from "./DynamicSVG";
 * import { runAppleScript } from "run-applescript";
 *
 * export default function Command() {
 *  // Load images as data URIs before passing them to the SVG
 *  const preloadedImages = usePreloadedImages([
 *      "https://www.raycast.com/HelloImSteven/sips/install_button@2x.png",
 *      "https://www.raycast.com/HelloImSteven/pins/install_button@2x.png"
 *  ]);
 *
 *  return (
 *      <ClickableDetail>
 *          <DynamicSVG>
 *              <Image x={0} y={0} {...preloadedImages[0]?.image.data} />
 *              <Image x={0} y={128} width={512} height={128} {...preloadedImages[1]?.image.data} onClick={(location) => runAppleScript(`display dialog "Clicked!"`)} />
 *          </DynamicSVG>
 *      </ClickableDetail>
 *  );
 * }
 * ```
 */
export const Image = (props: ImageProps): JSX.Element => {
  const { imageDataURI, x, y, width, height, opacity, visible } = props;

  return (
    <image
      xlinkHref={imageDataURI || "https://placehold.co/600x400"}
      x={x}
      y={y}
      width={width}
      height={height}
      opacity={opacity || 1}
      visibility={visible == undefined ? "visible" : visible ? "visible" : "hidden"}
    />
  );
};

/**
 * Preload an image from a URL and return a {@link PreloadState} object containing the image data URI.
 * @param imageSource The URL of the image to preload
 * @param onPreloaded Callback function that receives the {@link PreloadState} object
 */
Image.preload = async (imageSource: string, onPreloaded: (updatedPreload: PreloadState) => void) => {
  const res = await fetch(imageSource);
  res.arrayBuffer().then((buffer) => {
    const stringifiedBuffer = Buffer.from(buffer).toString("base64");
    const contentType = res.headers.get("content-type");
    const imageDataURI = `data:${contentType};base64,${stringifiedBuffer}`;
    onPreloaded({ image: { loaded: true, data: { imageDataURI } } });
  });
};

/**
 * Preload multiple images from URLs and return an array of {@link PreloadState} objects containing the image data URIs.
 *
 * @param imageSources The URLs of the images to preload
 * @returns An array of {@link PreloadState} objects
 *
 * @example
 * ```typescript
 * import { ClickableDetail, DynamicSVG, Image, usePreloadedImages } from "./DynamicSVG";
 * import { runAppleScript } from "run-applescript";
 *
 * export default function Command() {
 *  const preloadedImages = usePreloadedImages([
 *      "https://www.raycast.com/_next/image?url=https%3A%2F%2Ffiles.raycast.com%2Fqm888j95wqbhq09u5yygpzyu4w6e&w=64&q=75",
 *      "https://www.raycast.com/_next/image?url=https%3A%2F%2Ffiles.raycast.com%2Fk5p8ffw25wui0n2uirvgbzb2ungf&w=64&q=75",
 *      "https://www.raycast.com/_next/image?url=https%3A%2F%2Ffiles.raycast.com%2Ff0onj6sg0z6p3r8jg5h5z5a06wfn&w=64&q=75",
 *      "https://www.raycast.com/_next/image?url=https%3A%2F%2Ffiles.raycast.com%2Fj3raga5hbci21jwq9dn898pch6ju&w=64&q=75"
 *  ]);
 *
 *  return (
 *      <ClickableDetail isLoading={preloadedImages.length != 4} waitUntilAllLoaded={true}>
 *          <DynamicSVG>
 *              <Image x={0} y={0} {...preloadedImages[0]?.image.data} />
 *              <Image x={74} y={0} {...preloadedImages[1]?.image.data} />
 *              <Image x={148} y={0} {...preloadedImages[2]?.image.data} />
 *              <Image x={222} y={0} {...preloadedImages[3]?.image.data} />
 *          </DynamicSVG>
 *       </ClickableDetail>
 *  );
 * }
 * ```
 */
export const usePreloadedImages = (imageSources: string[]) => {
  const [preloadStates, setPreloadStates] = useState<PreloadState[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      for (const imageSource of imageSources) {
        await Image.preload(imageSource, (updatedPreloadState) => {
          setPreloadStates((prev) => {
            if (prev) {
              return [...prev, updatedPreloadState];
            } else {
              return [updatedPreloadState];
            }
          });
        });
      }
    };
    loadImages();
  }, []);

  return preloadStates;
};
