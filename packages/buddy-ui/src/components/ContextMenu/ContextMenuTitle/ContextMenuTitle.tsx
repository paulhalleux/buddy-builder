import React from "react";

import { contextMenuTitleStyles } from "./ContextMenuTitle.styles.ts";

export type ContextMenuTitleProps = React.ComponentPropsWithoutRef<"span">;

export function ContextMenuTitle({
  className,
  ...props
}: ContextMenuTitleProps) {
  const classes = contextMenuTitleStyles({ className });
  return <span role="separator" className={classes} {...props} />;
}
