/**
 * A generic SVG item.
 */
export type SVGItem = JSX.Element;

/**
 * The data for a preloaded SVG item.
 */
export type PreloadData = { loaded?: boolean; data?: { imageDataURI: string } };

/**
 * The state of preloaded SVG items.
 */
export type PreloadState = { [key: string]: PreloadData };

/**
 * A point in 2D space.
 */
export type Point = {
    x: number;
    y: number;
}