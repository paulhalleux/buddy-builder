import { ColorPickerOptions } from "../types";

import { CanvasPicker } from "./CanvasPicker.ts";

export type HuePickerOptions = ColorPickerOptions<{
  direction?: "horizontal" | "vertical";
  color?: string;
  initialOpacity?: number;
  onChange?: (opacity: number) => void;
}>;

const FALLBACK_COLOR = "#000000";

export class OpacityPicker extends CanvasPicker {
  private readonly options: HuePickerOptions;

  private color: string;
  private currentOpacity = 1;

  constructor(options: HuePickerOptions) {
    super({
      onChange: (_, position) => {
        if (this.options.direction === "vertical") {
          const opacity = position.y / this.getSize().height;
          this.setCurrentOpacity(opacity);
        } else {
          const opacity = position.x / this.getSize().width;
          this.setCurrentOpacity(opacity);
        }
      },
      cursor: {
        size: () => this.getCursorSize(),
        getInitialPosition: () => {
          if (this.options.direction === "vertical") {
            return {
              x: this.getSize().width / 2,
              y: this.getSize().height * (options.initialOpacity ?? 0),
            };
          } else {
            return {
              x: this.getSize().width * (options.initialOpacity ?? 0),
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

    this.color = options.color || FALLBACK_COLOR;
    this.currentOpacity = options.initialOpacity || 1;

    // initial callback
    this.options.onChange?.(this.currentOpacity);

    // mount the picker
    if (options.root) {
      this.mount(options.root);
    }
  }

  // --------------------- public methods ---------------------

  setCurrentOpacity(opacity: number) {
    this.currentOpacity = opacity;
    this.options.onChange?.(opacity);
    this.render();
  }

  setReferenceColor(color: string) {
    this.color = color;
    this.render();
  }

  // --------------------- rendering ---------------------

  renderCanvas(context: CanvasRenderingContext2D) {
    const { width, height } = this.getSize();

    const gradient =
      this.options.direction === "vertical"
        ? context.createLinearGradient(0, 0, 0, height)
        : context.createLinearGradient(0, 0, width, 0);

    gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
    gradient.addColorStop(1, this.color);

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }

  private getCursorSize() {
    return this.options.direction === "vertical"
      ? this.getSize().width
      : this.getSize().height;
  }
}
