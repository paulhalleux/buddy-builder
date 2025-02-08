import React from "react";
import { Placement } from "@floating-ui/react";

import { Popover } from "../Popover";

import { contextMenuStyles } from "./ContextMenu.styles.ts";
import { ContextMenuItem } from "./ContextMenuItem";
import { ContextMenuSeparator } from "./ContextMenuSeparator";
import { ContextMenuTitle } from "./ContextMenuTitle";

export type ContextMenuProps = React.ComponentPropsWithoutRef<"ul"> & {
  trigger?: React.ReactNode;
  placement?: Placement;
  offset?: number;
  rightClick?: boolean;
};

export const ContextMenuProvider = React.createContext<{
  close: () => void;
} | null>(null);

export function ContextMenu({
  children,
  className,
  trigger,
  placement = "right-start",
  offset = 4,
  rightClick,
  ...props
}: ContextMenuProps) {
  const classes = contextMenuStyles({ className });
  const [open, setOpen] = React.useState(false);

  const _value = React.use(ContextMenuProvider);
  const value = {
    close: () => {
      setOpen(false);
      _value?.close();
    },
  };

  const menu = (
    <ContextMenuProvider value={value}>
      <ul
        role="menu"
        className={classes}
        {...props}
        onContextMenu={(event) => {
          event.preventDefault();
        }}
      >
        {children}
      </ul>
    </ContextMenuProvider>
  );

  if (trigger) {
    return (
      <Popover
        offset={offset}
        placement={placement}
        content={menu}
        open={open}
        onOpenChange={setOpen}
        openOnClick={!rightClick}
        openOnFocus={!rightClick}
        openOnHover={!rightClick}
        openOnRightClick={rightClick}
      >
        {trigger}
      </Popover>
    );
  }

  return menu;
}

ContextMenu.Item = ContextMenuItem;
ContextMenu.Separator = ContextMenuSeparator;
ContextMenu.Title = ContextMenuTitle;
