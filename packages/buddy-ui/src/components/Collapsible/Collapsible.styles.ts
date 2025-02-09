import { tv } from "tailwind-variants";

export const collapsibleStyles = tv({
  slots: {
    container: "flex flex-col gap-1",
    trigger: [
      "hover:bg-neutral-100 h-6 px-1",
      "flex items-center gap-1 cursor-pointer rounded-sm",
      "text-xs text-neutral-700",
    ],
    content: "mt-1",
  },
});
