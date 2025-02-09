import { tv, VariantProps } from "tailwind-variants";

export const toolbarItemStyles = tv({
  base: [
    "flex items-center justify-center w-8 h-8 aspect-square rounded-sm",
    "hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer",
  ],
  variants: {
    selected: {
      true: "bg-neutral-200",
    },
  },
});

export type ToolbarItemVariantProps = VariantProps<typeof toolbarItemStyles>;
