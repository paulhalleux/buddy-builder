export enum ControlType {
  Text = "text",
  Number = "number",
}

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

export type TextControl = ControlDef<
  ControlType.Text,
  string,
  {
    minLength?: number;
    maxLength?: number;
  }
>;

export type NumberControl = ControlDef<
  ControlType.Number,
  number,
  {
    min?: number;
    max?: number;
    step?: number;
  }
>;

export type Control = TextControl | NumberControl;

export type ExtractControlsValue<Controls extends Record<string, Control>> = {
  [Key in keyof Controls]: Extract<Control, Controls[Key]>["__type"];
};
