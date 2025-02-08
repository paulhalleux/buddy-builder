import { tv, VariantProps } from "tailwind-variants";

export const editInlineStyles = tv({
  base: "w-full outline-none select-none",
  slots: {
    input: "rounded-xs",
  },
  variants: {
    outlined: {
      true: {
        input: "focus:ring focus:ring-blue-300 px-1 -mx-1",
      },
    },
    size: {
      xs: { base: ["text-xs", "h-4"] },
      sm: { base: ["text-xs", "h-5"] },
      md: { base: ["text-xs", "h-6"] },
      lg: { base: ["text-xs", "h-7"] },
    },
  },
});

export type EditInlineVariantProps = VariantProps<typeof editInlineStyles>;
