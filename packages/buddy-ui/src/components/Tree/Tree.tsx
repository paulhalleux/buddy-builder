import React from "react";

import { treeStyles } from "./Tree.styles.ts";
import { TreeItem } from "./TreeItem.tsx";

export type TreeProps = React.ComponentProps<"ul">;

export function Tree({ children, className, ...props }: TreeProps) {
  const classes = treeStyles({ className });
  return (
    <ul role="tree" className={classes} {...props}>
      {children}
    </ul>
  );
}

Tree.Item = TreeItem;
Tree.Subtree = Tree;
