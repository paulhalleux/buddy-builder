import { ColorPickerOptions } from "../types";

import { CanvasPicker } from "./CanvasPicker.ts";

export type SVPickerOptions = ColorPickerOptions;

const CURSOR_SIZE = 10;

export class SVPicker extends CanvasPicker {
  private readonly options: SVPickerOptions;

  private readonly unregisterColorListener: () => void;

  constructor(options: SVPickerOptions) {
    super({
      onChange: (color) => {
        options.color.setLightness(color.getLightness());
        options.color.setSaturation(color.getSaturation());
      },
      cursor: {
        size: CURSOR_SIZE,
        getInitialPosition: () => {
          const { width, height } = this.getSize();
          const [, s, v] = options.color.getHsv();
          const x = width * s;
          const y = height * (1 - v);
          return { x, y };
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

  // --------------------- rendering ---------------------

  renderCanvas(context: CanvasRenderingContext2D) {
    this.renderColorGradient(context);
    this.renderLightnessGradient(context);
  }

  private renderColorGradient(context: CanvasRenderingContext2D) {
    const { width, height } = this.getSize();

    const gradient = context.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, this.options.color.getRawHue().toRgbaString());

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
