import React from "react";
import { TreeItem } from "./TreeItem.tsx";
import { treeStyles } from "./Tree.styles.ts";

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
