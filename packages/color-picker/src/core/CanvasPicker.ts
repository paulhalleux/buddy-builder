import { Size, XYPosition } from "../types";

import { BasePicker } from "./BasePicker.ts";
import { Color } from "./Color.ts";
import { Cursor } from "./Cursor.ts";

export type CanvasPickerOptions = {
  onChange?: (color: Color, position: XYPosition) => void;
  cursor?: {
    size?: number | (() => number);
    getPosition?: (pos: XYPosition) => XYPosition;
    getInitialPosition?: () => XYPosition;
  };
};

export abstract class CanvasPicker extends BasePicker {
  private readonly _options: CanvasPickerOptions;
  private cursor: Cursor | undefined;

  private canvas: HTMLCanvasElement | undefined;
  private ctx: CanvasRenderingContext2D | undefined;

  private size: Size = {
    height: 0,
    width: 0,
  };

  constructor(options: CanvasPickerOptions = {}) {
    super();
    this._options = options;
  }

  /**
   * Resize the current size of the root element
   */
  getSize(): Size {
    return this.size;
  }

  /**
   * Get the cursor
   */
  getCursor(): Cursor | undefined {
    return this.cursor;
  }

  /**
   * Get the canvas context
   */
  getContext(): CanvasRenderingContext2D | undefined {
    return this.ctx;
  }

  onMount(element: HTMLElement) {
    this.setupResizeObserver();

    // set the element style (for cursor positioning)
    element.style.position = "relative";

    // setup canvas and cursor
    this.setupCanvas(element);
    this.setupCursor(element);

    // initial render
    this.render();
  }

  onUnmount() {
    this.canvas?.remove();
    this.cursor?.remove();
  }

  render() {
    if (!this.ctx || !this.canvas) {
      return;
    }

    this.ctx.clearRect(0, 0, this.size.width, this.size.height);
    this.renderCanvas(this.ctx);
  }

  abstract renderCanvas(context: CanvasRenderingContext2D): void;

  /**
   * Set up the canvas element
   * @param element - The root element
   * @private
   */
  private setupCanvas(element: HTMLElement) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.size.width;
    this.canvas.height = this.size.height;

    const context = this.canvas.getContext("2d");
    if (!context) {
      console.error("Failed to get canvas context");
      return;
    }

    this.ctx = context;
    element.appendChild(this.canvas);
  }

  /**
   * Set up the cursor for the picker
   * @param element - The root element
   * @private
   */
  private setupCursor(element: HTMLElement) {
    this.cursor = new Cursor({
      parent: element,
      size: this._options.cursor?.size || 8,
      onMove: (pos) => {
        const color = this.getColorAtPosition(pos.x, pos.y);
        if (color) this._options.onChange?.(color, pos);
      },
      getPosition: this._options.cursor?.getPosition,
    });

    if (this._options.cursor?.getInitialPosition) {
      this.cursor.setPosition(this._options.cursor.getInitialPosition());
    }
  }

  /**
   * Set up the resize observer to handle the root element resize
   * @private
   */
  private setupResizeObserver() {
    if (!this.element) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height, width } = entry.contentRect;

        this.size = { height, width };

        if (this.canvas) {
          this.canvas.width = this.size.width;
          this.canvas.height = this.size.height;
        }

        this.render();
      }
    });

    resizeObserver.observe(this.element);

    // trigger initial resize
    const { height, width } = this.element.getBoundingClientRect();
    this.size = { height, width };
  }

  // --------------------- helper methods ---------------------

  /**
   * Get the color at the given position
   * @param x - The x position
   * @param y - The y position
   * @protected
   */
  protected getColorAtPosition(x: number, y: number): Color | null {
    if (!this.ctx) {
      return null;
    }

    const imageData = this.ctx.getImageData(
      Math.max(x - 1, 0),
      Math.max(y - 1, 0),
      1,
      1,
    );

    const [r, g, b, a] = imageData.data;
    return Color.fromRgb(r, g, b, a);
  }
}
