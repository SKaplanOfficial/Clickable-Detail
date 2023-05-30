/**
 * Props for {@link DynamicSVG}.
 */
export interface DynamicSVGProps {
  width?: number;
  height?: number;
  fill?: string;
  children: JSX.Element | JSX.Element[];
}

/**
 * A dynamic wrapper around React's SVG component.
 * @param props The props for the SVG. See {@link DynamicSVGProps}.
 * @returns A ReactSVG SVG component populated with the provided props and children.
 */
export const DynamicSVG = (props: DynamicSVGProps) => {
  const { width, height, fill, children } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width || 750}
      height={height || 375}
      fill={fill}
    >
      {children}
    </svg>
  );
};
