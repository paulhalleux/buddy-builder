import React from "react";

import { ContextMenuProvider } from "../ContextMenu.tsx";

import { contextMenuItemStyles } from "./ContextMenuItem.styles.ts";
import { ContextMenuItemPre } from "./ContextMenuItemPre.tsx";

export type ContextMenuItemProps = React.ComponentPropsWithoutRef<"li"> & {
  onSelect?: () => void;
};

export function ContextMenuItem({
  children,
  className,
  onSelect,
  onClick,
  onKeyDown,
  ...props
}: ContextMenuItemProps) {
  const context = React.use(ContextMenuProvider);
  const classes = contextMenuItemStyles({ className });

  const onItemSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    onSelect?.();
    onClick?.(e);
    context?.close();
  };

  const onItemKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    onKeyDown?.(e);
    if (e.key === "Enter") {
      onSelect?.();
      context?.close();
    }
  };

  return (
    <li
      role="menuitem"
      tabIndex={0}
      className={classes}
      onKeyDown={onItemKeyDown}
      onClick={onItemSelect}
      {...props}
    >
      {children}
    </li>
  );
}

ContextMenuItem.Pre = ContextMenuItemPre;
