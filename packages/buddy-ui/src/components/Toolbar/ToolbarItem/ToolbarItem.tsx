import React from "react";

import {
  toolbarItemStyles,
  ToolbarItemVariantProps,
} from "./ToolbarItem.styles.ts";

export type ToolbarItemProps = React.ComponentProps<"button"> &
  ToolbarItemVariantProps;

export function ToolbarItem({
  children,
  className,
  selected,
  ...props
}: ToolbarItemProps) {
  const classes = toolbarItemStyles({ selected, className });
  return (
    <button className={classes} data-selected={selected} {...props}>
      {children}
    </button>
  );
}
