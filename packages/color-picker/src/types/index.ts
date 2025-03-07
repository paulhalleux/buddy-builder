import { Color } from "../core";

export type ColorPickerOptions<Ext = {}> = {
  root?: HTMLElement | string;
  color: Color;
} & Ext;

export type ColorPicker = {
  setColor(color: string): void;
  mount(element: HTMLElement | string): void;
  unmount(): void;
};

export type Size = {
  height: number;
  width: number;
};

export type XYPosition = {
  x: number;
  y: number;
};
