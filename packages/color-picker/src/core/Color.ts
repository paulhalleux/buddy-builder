import {
  hexToRgba,
  hslToHsv,
  hslToRgb,
  hueToRgb,
  rgbToHsl,
} from "../utils/color.ts";

export class Color {
  private hue: number;
  private saturation: number;
  private lightness: number;

  private alpha: number;

  private rgb: [number, number, number] = [0, 0, 0];
  private hsv: [number, number, number] = [0, 0, 0];

  // eslint-disable-next-line no-use-before-define
  private listeners: Array<(color: Color) => void> = [];

  private constructor(
    hue: number,
    saturation: number,
    lightness: number,
    alpha: number = 1,
  ) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
    this.alpha = alpha;

    this.updateInternalValues();
    this.subscribe(() => {
      this.updateInternalValues();
    });
  }

  static fromRgb(r: number, g: number, b: number, a: number = 1) {
    const [hue, saturation, lightness] = rgbToHsl(r, g, b);
    return new Color(hue, saturation, lightness, a);
  }

  static fromHsl(h: number, s: number, l: number, a: number = 1) {
    return new Color(h, s, l, a);
  }

  static fromHex(hex: string) {
    return Color.fromRgb(...hexToRgba(hex));
  }

  setColor(color: Color) {
    this.setHue(color.getHue());
    this.setSaturation(color.getSaturation());
    this.setLightness(color.getLightness());
    this.setAlpha(color.getAlpha());
    this.notify();
  }

  getRgb() {
    return this.rgb;
  }

  getHsv() {
    return this.hsv;
  }

  // --------------------- hue ---------------------

  getHue() {
    return this.hue;
  }

  setHue(hue: number) {
    this.hue = hue;
    this.notify();
  }

  // --------------------- saturation ---------------------

  getSaturation() {
    return this.saturation;
  }

  setSaturation(saturation: number) {
    this.saturation = saturation;
    this.notify();
  }

  // --------------------- lightness ---------------------

  getLightness() {
    return this.lightness;
  }

  setLightness(lightness: number) {
    this.lightness = lightness;
    this.notify();
  }

  // --------------------- alpha ---------------------

  getAlpha() {
    return this.alpha;
  }

  setAlpha(alpha: number) {
    this.alpha = alpha;
    this.notify();
  }

  // --------------------- string ---------------------

  toRgbaString() {
    return `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, ${this.alpha})`;
  }

  // --------------------- raw ---------------------

  getRawHue() {
    return Color.fromRgb(...hueToRgb(this.hue * 360), 1);
  }

  getRawColor() {
    return Color.fromRgb(...this.rgb, 1);
  }

  // --------------------- subscribers ---------------------

  subscribe(listener: (color: Color) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this));
  }

  private updateInternalValues() {
    [this.rgb[0], this.rgb[1], this.rgb[2]] = hslToRgb(
      this.hue,
      this.saturation,
      this.lightness,
    );

    [this.hsv[0], this.hsv[1], this.hsv[2]] = hslToHsv(
      this.hue,
      this.saturation,
      this.lightness,
    );
  }
}
