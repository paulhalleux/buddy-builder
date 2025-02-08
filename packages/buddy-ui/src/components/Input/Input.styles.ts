import { tv, VariantProps } from "tailwind-variants";

export const inputStyles = tv({
  slots: {
    prepend:
      "select-none text-xs flex items-center justify-center px-2 border border-r-0 border-neutral-200 rounded-sm rounded-r-none bg-black/5",
    append:
      "select-none text-xs flex items-center justify-center px-2 border border-l-0 border-neutral-200 rounded-sm rounded-l-none bg-black/5",
    container: "flex",
  },
  base: [
    "w-full rounded-sm border border-neutral-200 bg-white",
    "hover:border-neutral-300",
    "outline-none focus-visible:ring focus-visible:ring-blue-500",
  ],
  variants: {
    prepend: {
      true: {
        base: ["rounded-l-none"],
      },
    },
    append: {
      true: {
        base: ["rounded-r-none"],
      },
    },
    size: {
      sm: {
        base: ["text-xs", "h-6", "px-1"],
        append: ["h-6 min-w-6"],
        prepend: ["h-6 min-w-6"],
      },
      md: {
        base: ["text-xs", "h-7", "px-2"],
        append: ["h-7 min-w-7"],
        prepend: ["h-7 min-w-7"],
      },
      lg: {
        base: ["text-xs", "h-8", "px-2"],
        append: ["h-8 min-w-8"],
        prepend: ["h-8 min-w-8"],
      },
    },
  },
});

export type InputVariantProps = VariantProps<typeof inputStyles>;
