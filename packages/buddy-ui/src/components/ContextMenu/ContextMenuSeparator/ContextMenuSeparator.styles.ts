import { tv } from "tailwind-variants";

export const contextMenuSeparatorStyles = tv({
  base: [
    "h-[1px] w-[calc(100%_+_var(--spacing)_*_2)] block bg-neutral-200 my-1 -mx-1",
  ],
});
