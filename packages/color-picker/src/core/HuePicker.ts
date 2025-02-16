import { ColorPickerOptions } from "../types";

import { CanvasPicker } from "./CanvasPicker.ts";

export type HuePickerOptions = ColorPickerOptions<{
  direction?: "horizontal" | "vertical";
  initialColor?: string;
  onChange?: (opacity: string) => void;
}>;

const FALLBACK_COLOR = "#FF0000";

export class HuePicker extends CanvasPicker {
  private readonly options: HuePickerOptions;
  private currentColor: string;

  constructor(options: HuePickerOptions) {
    super({
      onChange: (color) => {
        this.setCurrentColor(color);
      },
      cursor: {
        size: () => this.getCursorSize(),
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

    this.currentColor = options.initialColor || FALLBACK_COLOR;

    // initial callback
    this.options.onChange?.(this.currentColor);

    // mount the picker
    if (options.root) {
      this.mount(options.root);
    }
  }

  // --------------------- public methods ---------------------

  setCurrentColor(color: string) {
    this.currentColor = color;
    this.options.onChange?.(color);
    this.render();
  }

  // --------------------- rendering ---------------------

  renderCanvas(context: CanvasRenderingContext2D) {
    const { width, height } = this.getSize();

    const gradient =
      this.options.direction === "vertical"
        ? context.createLinearGradient(0, 0, 0, height)
        : context.createLinearGradient(0, 0, width, 0);

    gradient.addColorStop(0, "#FF0000");
    gradient.addColorStop(1 / 6, "#FFFF00");
    gradient.addColorStop(2 / 6, "#00FF00");
    gradient.addColorStop(3 / 6, "#00FFFF");
    gradient.addColorStop(4 / 6, "#0000FF");
    gradient.addColorStop(5 / 6, "#FF00FF");
    gradient.addColorStop(1, "#FF0000");

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }

  protected getColorAtPosition(x: number, y: number): string {
    if (this.options.direction === "vertical") {
      return super.getColorAtPosition(this.getSize().width / 2, y);
    }
    return super.getColorAtPosition(x, this.getSize().height / 2);
  }

  private getCursorSize() {
    return this.options.direction === "vertical"
      ? this.getSize().width
      : this.getSize().height;
  }
}
