import { tv, VariantProps } from "tailwind-variants";

export const treeItemStyles = tv({
  slots: {
    slot: "shrink-0",
    container: "flex flex-col gap-[1px] select-none w-full",
    content: "text-xs px-1 w-full",
    treeWrapper: "",
    treeItem: [
      "hover:bg-neutral-100 rounded-sm flex items-center w-full",
      "outline-none focus-visible:ring focus-visible:ring-blue-300",
    ],
    toggleButton: [
      "aspect-square rounded-sm flex items-center justify-center",
      "hover:bg-neutral-200",
    ],
  },
  variants: {
    size: {
      xs: {
        slot: "h-5 w-5",
        treeWrapper: "pl-5",
        treeItem: "h-5",
        toggleButton: "h-4",
      },
      sm: {
        slot: "h-6 w-6",
        treeWrapper: "pl-6",
        treeItem: "h-6",
        toggleButton: "h-5",
      },
      lg: {
        slot: "h-7 w-7",
        treeWrapper: "pl-7",
        treeItem: "h-7",
        toggleButton: "h-6",
      },
    },
    selected: {
      true: {
        treeItem: "!bg-neutral-100",
        toggleButton: "!bg-transparent hover:!bg-neutral-200",
      },
    },
  },
});

export type TreeItemVariantProps = VariantProps<typeof treeItemStyles>;
