import { ColorPickerOptions } from "../types";

import { CanvasPicker } from "./CanvasPicker.ts";
import { Color } from "./Color.ts";

export type HuePickerOptions = ColorPickerOptions<{
  direction?: "horizontal" | "vertical";
}>;

export class HuePicker extends CanvasPicker {
  private readonly options: HuePickerOptions;

  constructor(options: HuePickerOptions) {
    super({
      onChange: (color) => {
        options.color.setHue(color.getHue());
      },
      cursor: {
        size: () => this.getCursorSize(),
        getInitialPosition: () => {
          const hue = options.color.getHue();
          if (this.options.direction === "vertical") {
            return {
              x: this.getSize().width / 2,
              y: this.getSize().height * hue,
            };
          } else {
            return {
              x: this.getSize().width * hue,
              y: this.getSize().height / 2,
            };
          }
        },
        getPosition: (pos) => {
          const cursorSize = this.getCursorSize();
          if (this.options.direction === "vertical") {
            return {
              x: this.getSize().width / 2,
              y: Math.min(
                Math.max(pos.y, cursorSize / 2),
                this.getSize().height - cursorSize / 2,
              ),
            };
          } else {
            return {
              x: Math.min(
                Math.max(pos.x, cursorSize / 2),
                this.getSize().width - cursorSize / 2,
              ),
              y: this.getSize().height / 2,
            };
          }
        },
      },
    });

    this.options = options;

    // mount the picker
    if (options.root) {
      this.mount(options.root);
    }
  }

  getColorAtPosition(x: number, y: number): Color | undefined {
    const value = this.options.direction === "vertical" ? y : x;
    const hue =
      value /
      this.getSize()[
        this.options.direction === "vertical" ? "height" : "width"
      ];

    return Color.fromHsl(
      hue,
      this.options.color.getSaturation(),
      this.options.color.getLightness(),
    );
  }

  // --------------------- rendering ---------------------

  renderCanvas(context: CanvasRenderingContext2D) {
    const { width, height } = this.getSize();

    const gradient =
      this.options.direction === "vertical"
        ? context.createLinearGradient(0, 0, 0, height)
        : context.createLinearGradient(0, 0, width, 0);

    gradient.addColorStop(0.01, "#FF0000");
    gradient.addColorStop(1 / 6, "#FFFF00");
    gradient.addColorStop(2 / 6, "#00FF00");
    gradient.addColorStop(3 / 6, "#00FFFF");
    gradient.addColorStop(4 / 6, "#0000FF");
    gradient.addColorStop(5 / 6, "#FF00FF");
    gradient.addColorStop(0.99, "#FF0000");

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }

  private getCursorSize() {
    return this.options.direction === "vertical"
      ? this.getSize().width
      : this.getSize().height;
  }
}
