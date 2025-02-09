import React from "react";

import { toolbarStyles, ToolbarVariantProps } from "./Toolbar.styles.ts";
import { ToolbarItem } from "./ToolbarItem";

export type ToolbarProps = Omit<
  React.ComponentProps<"div">,
  keyof ToolbarVariantProps
> &
  ToolbarVariantProps;

export function Toolbar({
  children,
  className,
  direction = "horizontal",
  ...props
}: ToolbarProps) {
  const classes = toolbarStyles({ direction, className });
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

Toolbar.Item = ToolbarItem;
