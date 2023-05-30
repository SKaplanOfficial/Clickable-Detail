import ReactDOMServer from "react-dom/server";
import { renderHTML } from "./WebUtils";

/**
 * Props for {@link HTML}.
 */
export interface HTMLProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  children: JSX.Element | JSX.Element[];
}

/**
 * Renders HTML to an SVG image component.
 * @param props Props for the HTML component. See {@link HTMLProps}.
 * @returns An SVG image component with the HTML rendered to it.
 *
 * @remarks
 * This component allows you to render HTML to an SVG image component. Children of this component can be either the dynamic HTML components defined in this library, or React's built-in HTML components. The advantage of using the dynamic HTML components is that you can supply an onClick handler to them, which allows you to interact with the rendered HTML.
 *
 * @example
 * ```typescript
 * import { useState } from "react";
 * import { ARTICLE, ClickableDetail, DynamicSVG, FORM, H1, HEADER, HTML, IMG, INPUT, P, PRE } from "./DynamicSVG";
 * import { runAppleScript } from "run-applescript";
 *
 * export default function Command() {
 *  const [selection, setSelection] = useState<string>("");
 *  return (
 *      <ClickableDetail>
 *          <DynamicSVG height={400}>
 *              <HTML>
 *                  <head>
 *                      <style type="text/css">
 *                          {`* {
 *                              font-family: 'Tahoma';
 *                              font-size: 30px;
 *                              color: white;
 *                          }
 *                          .articleHeader {
 *                              font-size: 40px;
 *                              font-weight: bold;
 *                          }
 *                          pre {
 *                              background-color: #00000055;
 *                              padding: 20px;
 *                              border-radius: 10px;
 *                              border: 3px solid #FFFFFF18;
 *                          }
 *                          input {
 *                              color: black;
 *                              font-size: 20px;
 *                              background: #FFFFFF;
 *                          }`}
 *                      </style>
 *                  </head>
 *                  <body>
 *                      <ARTICLE>
 *                          <HEADER className="articleHeader">Image Example</HEADER>
 *                          <IMG src="https://www.raycast.com/_next/image?url=https%3A%2F%2Ffiles.raycast.com%2Fjhee6tgxhklcvw7nqy70933pvh0d&w=128&q=75" width={100} height={100} />
 *                          <br /><br />
 *
 *                          <HEADER className="articleHeader">Form Example</HEADER>
 *                          <P>Select your favorite app:</P>
 *                          <FORM>
 *                              <INPUT type="radio" name="app" value="Safari" onClick={() => setSelection("Safari")} x={5} y={180} width={100} height={30} checked={selection == "Safari"} /> Safari<br />
 *                              <INPUT type="radio" name="app" value="Google Chrome" onClick={() => setSelection("Google Chrome")} x={5} y={200} width={100} height={30} checked={selection == "Google Chrome"} /> Google Chrome<br />
 *                              <INPUT type="radio" name="app" value="Firefox" onClick={() => {setSelection("Firefox"); console.log("firefox");}} x={5} y={220} width={100} height={30} checked={selection == "Firefox"} /> Firefox<br />
 *
 *                              <INPUT type="submit" value="Submit" onClick={async () => { await runAppleScript(`display dialog "You selected ${selection}"`); }} x={5} y={235} width={75} height={35} />
 *                          </FORM>
 *                          <br /><br />
 *
 *                          <HEADER className="articleHeader">Code Example</HEADER>
 *                          <PRE>
 *                              {`<ARTICLE>
 *  <H1>Raycast is neat!</H1>
 * </ARTICLE>`}
 *                          </PRE>
 *                      </ARTICLE>
 *                 </body>
 *              </HTML>
 *          </DynamicSVG>
 *      </ClickableDetail>
 *  );
 * }
 * ```
 */
export const HTML = (props: HTMLProps) => {
  const { x, y, width, height, children } = props;

  const childrenArray = Array.isArray(children) ? children : [children];
  const htmlText = childrenArray.map((child) => ReactDOMServer.renderToString(child)).join("");
  const htmlBase64 = `data:image/jpg;base64,${renderHTML(`<html>${htmlText}</html>`, width || 1366, height || 768)}`;

  return <image xlinkHref={htmlBase64} x={x} y={y} width={width || 750} min-height={375} />;
};

export const H1 = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <h1 {...props} />;
};

export const H2 = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <h2 {...props} />;
};

export const H3 = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <h3 {...props} />;
};

export const H4 = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <h4 {...props} />;
};

export const H5 = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <h5 {...props} />;
};

export const H6 = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <h6 {...props} />;
};

export const P = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <p {...props} />;
};

export const A = (
  props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <a {...props} />;
};

export const IMG = (
  props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <img {...props} />;
};

export const TABLE = (
  props: React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <table {...props} />;
};

export const TR = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <tr {...props} />;
};

export const TD = (
  props: React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <td {...props} />;
};

export const DIV = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <div {...props} />;
};

export const SPAN = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <span {...props} />;
};

export const UL = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <ul {...props} />;
};

export const OL = (
  props: React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <ol {...props} />;
};

export const LI = (
  props: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <li {...props} />;
};

export const BUTTON = (
  props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <button {...props} />;
};

export const FORM = (
  props: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <form {...props} />;
};

export const INPUT = (
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <input {...props} />;
};

export const TEXTAREA = (
  props: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <textarea {...props} />;
};

export const ADDRESS = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <address {...props} />;
};

export const ARTICLE = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <article {...props} />;
};

export const ASIDE = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <aside {...props} />;
};

export const FOOTER = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <footer {...props} />;
};

export const HEADER = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <header {...props} />;
};

export const MAIN = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <main {...props} />;
};

export const NAV = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <nav {...props} />;
};

export const SECTION = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <section {...props} />;
};

export const SUMMARY = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <summary {...props} />;
};

export const BLOCKQUOTE = (
  props: React.DetailedHTMLProps<React.BlockquoteHTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <blockquote {...props} />;
};

export const DD = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <dd {...props} />;
};

export const DL = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDListElement>, HTMLDListElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <dl {...props} />;
};

export const DT = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <dt {...props} />;
};

export const FIGCAPTION = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <figcaption {...props} />;
};

export const FIGURE = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <figure {...props} />;
};

export const MENU = (
  props: React.DetailedHTMLProps<React.MenuHTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <menu {...props} />;
};

export const PRE = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <pre {...props} />;
};

export const ABBR = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    title?: string;
  }
) => {
  return <abbr {...props} />;
};

export const CITE = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    title?: string;
  }
) => {
  return <cite {...props} />;
};

export const CODE = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    title?: string;
  }
) => {
  return <code {...props} />;
};

export const EM = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    title?: string;
  }
) => {
  return <em {...props} />;
};

export const MARK = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    title?: string;
  }
) => {
  return <mark {...props} />;
};

export const Q = (
  props: React.DetailedHTMLProps<React.QuoteHTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    title?: string;
  }
) => {
  return <q {...props} />;
};

export const SAMP = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    title?: string;
  }
) => {
  return <samp {...props} />;
};

export const SMALL = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    title?: string;
  }
) => {
  return <small {...props} />;
};

export const SUP = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    title?: string;
  }
) => {
  return <sup {...props} />;
};

export const TIME = (
  props: React.DetailedHTMLProps<React.TimeHTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    title?: string;
  }
) => {
  return <time {...props} />;
};

export const B = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <b {...props} />;
};

export const AREA = (
  props: React.DetailedHTMLProps<React.AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <area {...props} />;
};

export const AUDIO = (
  props: React.DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <audio {...props} />;
};

export const MAP = (
  props: React.DetailedHTMLProps<React.MapHTMLAttributes<HTMLMapElement>, HTMLMapElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <map {...props} />;
};

export const VIDEO = (
  props: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <video {...props} />;
};

export const IFRAME = (
  props: React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <iframe {...props} />;
};

export const OBJECT = (
  props: React.DetailedHTMLProps<React.ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <object {...props} />;
};

export const PICTURE = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <picture {...props} />;
};

export const SVG = (
  props: React.DetailedHTMLProps<React.SVGProps<SVGSVGElement>, SVGSVGElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <svg {...props} />;
};

export const CANVAS = (
  props: React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <canvas {...props} />;
};

export const COL = (
  props: React.DetailedHTMLProps<React.ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <col {...props} />;
};

export const COLGROUP = (
  props: React.DetailedHTMLProps<React.ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <colgroup {...props} />;
};

export const TBODY = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <tbody {...props} />;
};

export const TFOOT = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <tfoot {...props} />;
};

export const THEAD = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <thead {...props} />;
};

export const TH = (
  props: React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    scope?: string;
  }
) => {
  return <th {...props} />;
};

export const LABEL = (
  props: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    htmlFor?: string;
  }
) => {
  return <label {...props} />;
};

export const LEGEND = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLLegendElement>, HTMLLegendElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
) => {
  return <legend {...props} />;
};

export const METER = (
  props: React.DetailedHTMLProps<React.MeterHTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    value?: number;
    min?: number;
    max?: number;
    low?: number;
    high?: number;
    optimum?: number;
  }
) => {
  return <meter {...props} />;
};

export const SELECT = (
  props: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    autoComplete?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    form?: string;
    multiple?: boolean;
    name?: string;
    required?: boolean;
    size?: number;
    value?: string | string[];
  }
) => {
  return <select {...props} />;
};

export const DETAILS = (
  props: React.DetailedHTMLProps<React.DetailsHTMLAttributes<HTMLElement>, HTMLElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    open?: boolean;
  }
) => {
  return <details {...props} />;
};

export const DIALOG = (
  props: React.DetailedHTMLProps<React.DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement> & {
    onClick?: (location: { x: number; y: number }) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    open?: boolean;
  }
) => {
  return <dialog {...props} />;
};
