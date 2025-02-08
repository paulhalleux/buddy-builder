import React from "react";

import { contextMenuSeparatorStyles } from "./ContextMenuSeparator.styles.ts";

export type ContextMenuSeparatorProps = React.ComponentPropsWithoutRef<"span">;

export function ContextMenuSeparator({
  className,
  ...props
}: ContextMenuSeparatorProps) {
  const classes = contextMenuSeparatorStyles({ className });
  return <span role="separator" className={classes} {...props} />;
}
