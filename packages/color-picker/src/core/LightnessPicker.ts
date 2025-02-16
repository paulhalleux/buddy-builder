import { ColorPickerOptions } from "../types";

import { CanvasPicker } from "./CanvasPicker.ts";

export type LightnessPickerOptions = ColorPickerOptions<{
  referenceColor?: string;
  initialColor?: string;
  onChange?: (opacity: string) => void;
}>;

const FALLBACK_COLOR = "#FF0000";
const CURSOR_SIZE = 10;

export class LightnessPicker extends CanvasPicker {
  private readonly options: LightnessPickerOptions;

  private referenceColor: string;
  private currentColor: string;

  constructor(options: LightnessPickerOptions) {
    super({
      onChange: (color) => {
        this.setCurrentColor(color);
      },
      cursor: {
        size: CURSOR_SIZE,
      },
    });

    this.options = options;

    this.referenceColor = this.options.referenceColor || FALLBACK_COLOR;
    this.currentColor = options.initialColor || this.referenceColor;

    // initial callback
    this.options.onChange?.(this.currentColor);

    // mount the picker
    if (options.root) {
      this.mount(options.root);
    }
  }

  // --------------------- public methods ---------------------

  setReferenceColor(color: string) {
    // update the reference color
    this.referenceColor = color;

    // re-render the gradients
    this.render();

    // update the current color based on new render
    const cursor = this.getCursor();
    if (cursor) {
      setTimeout(() => {
        const { x, y } = cursor.getPosition();
        const newColor = this.getColorAtPosition(x, y);
        this.setCurrentColor(newColor);
      }, 20);
    }
  }

  setCurrentColor(color: string) {
    this.currentColor = color;
    this.options.onChange?.(color);
    this.render();
  }

  // --------------------- rendering ---------------------

  renderCanvas(context: CanvasRenderingContext2D) {
    this.renderColorGradient(context);
    this.renderLightnessGradient(context);
  }

  private renderColorGradient(context: CanvasRenderingContext2D) {
    const { width, height } = this.getSize();

    const gradient = context.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, this.referenceColor);

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }

  private renderLightnessGradient(context: CanvasRenderingContext2D) {
    const { width, height } = this.getSize();

    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(1, "black");

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }
}
