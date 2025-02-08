import { tv, VariantProps } from "tailwind-variants";

export const buttonStyles = tv({
  base: [
    "cursor-pointer",
    "rounded-md",
    "font-medium",
    "flex items-center gap-1",
  ],
  variants: {
    icon: {
      true: ["aspect-square !px-0 justify-center"],
    },
    intent: {
      primary: [
        "bg-neutral-100 hover:bg-neutral-50 active:bg-neutral-100",
        "border border-neutral-200",
        "text-neutral-900",
      ],
      secondary: [
        "bg-neutral-900 hover:bg-neutral-700 active:bg-neutral-800",
        "border border-neutral-800",
        "text-white",
      ],
      subtle: [
        "bg-transparent hover:bg-neutral-900/10 active:bg-neutral-900/15",
        "text-neutral-900",
      ],
      bordered: [
        "bg-transparent hover:bg-neutral-900/5 active:bg-neutral-900/10",
        "border border-neutral-200",
        "text-neutral-900",
      ],
    },
    size: {
      sm: ["text-xs", "h-6", "px-2"],
      md: ["text-xs", "h-7", "px-3"],
      lg: ["text-xs", "h-8", "px-3"],
    },
  },
});

export type ButtonVariantProps = VariantProps<typeof buttonStyles>;
