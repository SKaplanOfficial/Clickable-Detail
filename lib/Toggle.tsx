import { useState } from "react";

/**
 * Props for {@link Toggle}.
 */
type ToggleProps = {
  x: number;
  y: number;
  width?: number;
  height?: number;
  enabledColor?: string;
  disabledColor?: string;
  stroke?: string;
  strokeWidth?: number;
  controlSize?: number;
  label?: string;
  labelSize?: number;
  labelStyle?: React.CSSProperties;
  delegate: ToggleDelegate;
  onClick?: () => void;
};

/**
 * A toggle switch for use in a {@link DynamicSVG}.
 *
 * @param props Props for the toggle (see {@link ToggleProps}).
 * @returns A React fragment containing components making up the toggle.
 *
 * @remarks
 * A Toggle has two states: enabled and disabled. It can be toggled between these states by clicking on it. The toggle's state can be accessed and modified via its {@link ToggleDelegate}. The toggle's appearance can be customized via its props.
 *
 * @example
 * ```typescript
 * import { ClickableDetail, DynamicSVG, Toggle, useToggleDelegate, useToggleDelegates } from "./DynamicSVG";
 * import { runAppleScript } from "run-applescript";
 *
 * export default function Command() {
 *  const delegate = useToggleDelegate(false);
 *  const delegates = useToggleDelegates([false, false]);
 *  return (
 *      <ClickableDetail>
 *          <DynamicSVG>
 *              <Toggle x={0} y={0} delegate={delegate} label="Option 1" onClick={() => runAppleScript(`display dialog "You toggled Option 1"`)}/>
 *              <Toggle x={0} y={40} delegate={delegates[0]} label="Option 2" onClick={() => runAppleScript(`display dialog "You toggled Option 2"`)}/>
 *              <Toggle x={0} y={80} delegate={delegates[1]} label="Option 3" onClick={() => runAppleScript(`display dialog "You toggled Option 3"`)}/>
 *          </DynamicSVG>
 *      </ClickableDetail>
 *  );
 * }
 * ```
 */
export const Toggle = (props: ToggleProps) => {
  const {
    delegate,
    x,
    y,
    width,
    height,
    enabledColor,
    disabledColor,
    stroke,
    strokeWidth,
    controlSize,
    onClick,
    label,
    labelSize,
    labelStyle,
  } = props;

  props.onClick = () => {
    delegate.toggle();
    onClick?.();
  };

  return (
    <>
      <rect
        x={x}
        y={y}
        width={width || 60}
        height={height || 30}
        rx={15}
        ry={15}
        fill={delegate.enabled ? enabledColor : disabledColor}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <circle cx={x + (delegate.enabled ? 45 : 16)} cy={y + 15} r={controlSize} fill="FFFFFFBB" stroke="11111133" />
      <text x={x + (delegate.enabled ? 14 : 32)} y={y + (height || 30) / 1.4} fill="white" font-family="Tahoma">
        {delegate.enabled ? "On" : "Off"}
      </text>
      {label ? (
        <text
          x={x + (width || 60) + 10}
          y={y + (height || 30) / 1.4}
          fill="white"
          fontFamily="Tahoma"
          fontSize={labelSize || 12}
          style={labelStyle}
        >
          {label}
        </text>
      ) : null}
    </>
  );
};

/**
 * Default props for {@link Toggle}.
 */
Toggle.defaultProps = {
  width: 60,
  height: 30,
  enabledColor: "99FF6677",
  disabledColor: "11111155",
  stroke: "FFFFFF11",
  strokeWidth: 1,
  controlSize: 10,
  labelSize: 12,
  onClick: () => {
    null;
  },
};

/**
 * Delegate for {@link Toggle}.
 */
export type ToggleDelegate = {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  toggle: () => void;
};

/**
 * Hook for creating a {@link ToggleDelegate}.
 * @param initialState The initial state of the toggle, defaults to `false`.
 * @returns A {@link ToggleDelegate} object.
 */
export const useToggleDelegate = (initialState: boolean): ToggleDelegate => {
  const [enabled, setEnabled] = useState(initialState);

  const toggle = () => {
    setEnabled(!enabled);
  };

  return { enabled, setEnabled, toggle };
};

/**
 * Pluralized version of {@link useToggleDelegate}. Allows for the creation of multiple {@link ToggleDelegate}s at once.
 * @param initialStates An array containing the initial state for each toggle.
 * @returns An array of {@link ToggleDelegate} objects.
 */
export const useToggleDelegates = (initialStates: boolean[]): ToggleDelegate[] => {
  const [states, setStates] = useState(initialStates);

  const toggle = (index: number) => {
    const newStates = [...states];
    newStates[index] = !newStates[index];
    setStates(newStates);
  };

  const setEnabled = (index: number, enabled: boolean) => {
    const newStates = [...states];
    newStates[index] = enabled;
    setStates(newStates);
  };

  return states.map((state, index) => ({
    enabled: state,
    setEnabled: (enabled: boolean) => setEnabled(index, enabled),
    toggle: () => toggle(index),
  }));
};

/**
 * Checks if a point is within the bounds of a {@link Toggle}.
 * @param toggle The toggle to check.
 * @param x The x coordinate of the point to check.
 * @param y The y coordinate of the point to check.
 * @returns `true` if the point is within the bounds of the toggle, `false` otherwise.
 */
Toggle.doesContainPoint = (toggle: JSX.Element, x: number, y: number) => {
  const { x: toggleX, y: toggleY } = toggle.props;

  return x >= 15 + toggleX && x <= 15 + toggleX + 100 && y >= 15 + toggleY && y <= 15 + toggleY + 20;
};
