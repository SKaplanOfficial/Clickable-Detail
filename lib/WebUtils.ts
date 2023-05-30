import fetch from "node-fetch";
import path from "path";
import { execSync } from "child_process";
import { environment } from "@raycast/api";

/**
 * Fetches HTML from a URL.
 * @param url The URL to fetch HTML from.
 * @returns A promise that resolves to the HTML as a string.
 */
export const getHTML = async (url: string) => {
  const res = await fetch(url);
  return await res.text();
};

/**
 * Renders HTML to a base64 encoded image using WebKit's WKWebView.
 *
 * @param html The HTML to render.
 * @returns A base64 encoded image of the rendered HTML.
 *
 * @remarks
 * This function renders an HTML string, while {@link renderURL} renders the contents of URL.
 */
export const renderHTML = (html: string, width: number, height: number) => {
  const scriptPath = path.resolve(environment.assetsPath, "clickable-detail", "HTML2b64.scpt");
  const data = execSync(
    `osascript ${scriptPath} -l JavaScript '${html.replaceAll("'", "\\'")}' '' ${width} ${height}`
  ).toString();
  return data;
};

/**
 * Renders the contents of a URL to a base64 encoded image using WebKit's WKWebView.
 * @param url The URL to render.
 * @returns A base64 encoded image of the rendered URL.
 *
 * @remarks
 * This function renders the contents of a URL, while {@link renderHTML} renders an HTML string.
 */
export const renderURL = (URL: string, width: number, height: number) => {
  const scriptPath = path.resolve(environment.assetsPath, "clickable-detail", "HTML2b64.scpt");
  const data = execSync(
    `osascript ${scriptPath} -l JavaScript '' '${URL.replaceAll("'", "\\'")}' ${width} ${height}`
  ).toString();
  return data;
};
