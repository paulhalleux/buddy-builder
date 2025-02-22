import { ColorPickerOptions } from "../types";

import { CanvasPicker } from "./CanvasPicker.ts";
import { Color } from "./Color.ts";

export type OpacityPickerOptions = ColorPickerOptions<{
  direction?: "horizontal" | "vertical";
}>;

export class OpacityPicker extends CanvasPicker {
  private readonly options: OpacityPickerOptions;

  private readonly unregisterColorListener: () => void;

  constructor(options: OpacityPickerOptions) {
    super({
      onChange: (color) => {
        options.color.setAlpha(color.getAlpha());
      },
      cursor: {
        size: () => this.getCursorSize(),
        getInitialPosition: () => {
          if (this.options.direction === "vertical") {
            return {
              x: this.getSize().width / 2,
              y: this.getSize().height * options.color.getAlpha(),
            };
          } else {
            return {
              x: this.getSize().width * options.color.getAlpha(),
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

    this.unregisterColorListener = this.options.color.subscribe(() => {
      this.render();
    });

    // mount the picker
    if (options.root) {
      this.mount(options.root);
    }
  }

  onUnmount() {
    super.onUnmount();
    this.unregisterColorListener();
  }

  getColorAtPosition(x: number, y: number): Color | undefined {
    const value = this.options.direction === "vertical" ? y : x;
    const alpha =
      value /
      this.getSize()[
        this.options.direction === "vertical" ? "height" : "width"
      ];

    return Color.fromRgb(...this.options.color.getRgb(), alpha);
  }

  // --------------------- rendering ---------------------

  renderCanvas(context: CanvasRenderingContext2D) {
    const { width, height } = this.getSize();

    const gradient =
      this.options.direction === "vertical"
        ? context.createLinearGradient(0, 0, 0, height)
        : context.createLinearGradient(0, 0, width, 0);

    gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
    gradient.addColorStop(1, this.options.color.getRawColor().toRgbaString());

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }

  private getCursorSize() {
    return this.options.direction === "vertical"
      ? this.getSize().width
      : this.getSize().height;
  }
}
