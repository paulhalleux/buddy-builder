import { XYPosition } from "../types";

export type CursorOptions = {
  parent: HTMLElement;
  size: number | (() => number);
  getPosition?: (pos: XYPosition) => XYPosition;
  onMove?: (position: XYPosition, event: MouseEvent) => void;
};

export class Cursor {
  private readonly options: CursorOptions;

  private dragging: boolean = false;
  private element: HTMLElement | undefined;
  private position: XYPosition = { x: 0, y: 0 };

  constructor(options: CursorOptions) {
    this.options = options;
    this.setupCursorElement();
    this.setupEvents();
    this.render();
  }

  /**
   * Set the position of the cursor
   * @param position - New position
   */
  setPosition(position: XYPosition) {
    this.position = position;
    this.render();
  }

  /**
   * Check if the cursor is currently dragging
   */
  isDragging() {
    return this.dragging;
  }

  /**
   * Get the current position of the cursor
   */
  getPosition(): XYPosition {
    return this.position;
  }

  /**
   * Remove the cursor element from the parent
   */
  remove() {
    if (!this.element) return;
    this.element.remove();
  }

  /**
   * Update the cursor position based on the current position
   */
  private render() {
    if (!this.element) return;
    const { size } = this.options;

    const adaptedPosition =
      this.options.getPosition?.(this.position) || this.position;

    const cursorSize = typeof size === "function" ? size() : size;
    this.element.style.top = `${adaptedPosition.y - cursorSize / 2}px`;
    this.element.style.left = `${adaptedPosition.x - cursorSize / 2}px`;
    this.element.style.width = `${cursorSize}px`;
    this.element.style.height = `${cursorSize}px`;
  }

  /**
   * Setup the cursor element
   * @private
   */
  private setupCursorElement() {
    this.element = document.createElement("div");

    this.element.style.position = "absolute";
    this.element.style.border = "2px solid white";
    this.element.style.borderRadius = "50%";
    this.element.style.pointerEvents = "none";

    const adaptedPosition =
      this.options.getPosition?.(this.position) || this.position;

    const { size } = this.options;
    const cursorSize = typeof size === "function" ? size() : size;
    this.element.style.top = `${adaptedPosition.y - cursorSize / 2}px`;
    this.element.style.left = `${adaptedPosition.x - cursorSize / 2}px`;
    this.element.style.width = `${cursorSize}px`;
    this.element.style.height = `${cursorSize}px`;

    const { parent } = this.options;
    parent.appendChild(this.element);
  }

  /**
   * Set up the cursor events
   * @private
   */
  private setupEvents() {
    const { parent, onMove } = this.options;

    const updatePosition = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const { x, y } = this.getBoundedPosition(
        e.clientX - rect.left,
        e.clientY - rect.top,
      );

      this.position = { x, y };

      onMove?.({ x, y }, e);

      this.render();
    };

    parent.addEventListener("pointerdown", (e) => {
      this.dragging = true;
      updatePosition(e);
    });

    window.addEventListener("pointermove", (e) => {
      if (!this.dragging) return;
      updatePosition(e);
    });

    window.addEventListener("pointerup", () => {
      this.dragging = false;
    });
  }

  /**
   * Get the bounded position based on the parent element
   * @param x - X position
   * @param y - Y position
   * @private
   */
  private getBoundedPosition(x: number, y: number): XYPosition {
    const { width, height } = this.options.parent.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(width, x)),
      y: Math.max(0, Math.min(height, y)),
    };
  }
}
