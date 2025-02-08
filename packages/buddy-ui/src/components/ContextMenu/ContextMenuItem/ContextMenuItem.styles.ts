import { tv } from "tailwind-variants";

export const contextMenuItemStyles = tv({
  base: [
    "cursor-pointer select-none",
    "w-full h-7 text-xs font-medium flex items-center px-2 rounded-sm",
    "hover:bg-neutral-100 active:bg-neutral-200 outline-none focus-visible:ring focus-visible:ring-blue-400",
  ],
});
