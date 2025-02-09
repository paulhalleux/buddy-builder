import { tv, VariantProps } from "tailwind-variants";

export const toolbarStyles = tv({
  base: "flex gap-1 border-neutral-200 p-1",
  variants: {
    direction: {
      horizontal: "flex-row border-b h-10 w-full",
      vertical: "flex-col border-r w-10 h-full",
    },
  },
});

export type ToolbarVariantProps = VariantProps<typeof toolbarStyles>;
