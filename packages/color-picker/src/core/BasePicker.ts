export abstract class BasePicker {
  protected element: HTMLElement | undefined;

  /**
   * Mount the picker to the given element
   *
   * This method will call the `onMount` lifecycle hook with the given element
   *
   * @param element - The root element to mount the picker
   */
  mount(element: HTMLElement | string) {
    if (typeof element === "string") {
      const el = document.querySelector(element);
      if (!el || !(el instanceof HTMLElement)) {
        console.error("Invalid root element");
        return;
      }
      this.element = el;
    } else {
      this.element = element;
    }

    if (this.element) {
      this.onMount(this.element);
    }
  }

  /**
   * Unmount the picker
   *
   * This method will call the `onUnmount` lifecycle hook with the current element
   */
  unmount() {
    if (this.element) {
      this.onUnmount(this.element);
    }
  }

  /**
   * Lifecycle hook called when the picker is mounted
   * @param element - The root element
   */
  abstract onMount(element: HTMLElement): void;

  /**
   * Lifecycle hook called when the picker is unmounted
   * @param element - The root element
   */
  abstract onUnmount(element: HTMLElement): void;

  /**
   * Render the picker
   *
   * This method should be implemented by the subclass and
   * is used to update the picker UI
   */
  abstract render(): void;
}
