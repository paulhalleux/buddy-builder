/**
 * Control types
 * ---
 * This enum is used to define the control types
 */
export enum ControlType {
  Text = "text",
  Number = "number",
}

/**
 * Control definition
 * ---
 * This type is used to define the control definition
 * It is a generic type that takes the control type, the value type and the properties type
 */
export type ControlDef<
  Type extends ControlType,
  Value = unknown,
  Properties extends Record<string, unknown> = {},
> = {
  type: Type;
  label: string;
} & Properties & {
    __type?: Value;
  };

/**
 * Text control
 * ---
 * This type is used to define the text control
 */
export type TextControl = ControlDef<
  ControlType.Text,
  string,
  {
    minLength?: number;
    maxLength?: number;
  }
>;

/**
 * Number control
 * ---
 * This type is used to define the number control
 */
export type NumberControl = ControlDef<
  ControlType.Number,
  number,
  {
    min?: number;
    max?: number;
    step?: number;
  }
>;

/**
 * Control
 * ---
 * This type is used to define the control
 * It is a union type of the text control and the number control
 */
export type Control = TextControl | NumberControl;

/**
 * Extract controls value
 * ---
 * This type is used to extract the value of the controls
 */
export type ExtractControlsValue<Controls extends Record<string, Control>> = {
  [Key in keyof Controls]: Extract<Control, Controls[Key]>["__type"];
};
