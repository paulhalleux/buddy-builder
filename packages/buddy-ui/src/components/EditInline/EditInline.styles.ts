import { tv, VariantProps } from "tailwind-variants";

export const editInlineStyles = tv({
  base: "w-full outline-none select-none font-inherit text-inherit focus-visible:ring focus-visible:ring-blue-500",
  slots: {
    input: "rounded-xs",
  },
  variants: {
    outlined: {
      true: {
        input: "focus:ring focus:ring-blue-500 px-1 -mx-1",
      },
    },
  },
});

export type EditInlineVariantProps = VariantProps<typeof editInlineStyles>;
