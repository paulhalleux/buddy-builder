import React, { useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { Tree } from "./Tree.tsx";
import { treeItemStyles, TreeItemVariantProps } from "./TreeItem.styles.ts";

export type TreeItemProps = React.ComponentPropsWithoutRef<"div"> & {
  label: React.ReactNode;
  expanded?: boolean;
  selected?: boolean;
  onExpand?: (expanded: boolean) => void;
} & TreeItemVariantProps;

export function TreeItem({
  size = "sm",
  children,
  label,
  className,
  expanded = false,
  onExpand = () => {},
  selected = false,
  onDoubleClick: _onDoubleClick,
  onKeyDown: _onKeyDown,
  ...props
}: TreeItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  const { content, treeWrapper, slot, treeItem, toggleButton, container } =
    treeItemStyles({
      size,
      selected,
    });

  const Icon = expanded ? ChevronDown : ChevronRight;

  const onDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (_onDoubleClick) {
      _onDoubleClick(event);
    }

    onExpand(!expanded);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (_onKeyDown) {
      _onKeyDown(event);
    }

    if (event.key === "Enter" || event.key === " ") {
      event.stopPropagation();
      event.preventDefault();
      onExpand(!expanded);
    }

    if (event.key === "ArrowRight") {
      event.stopPropagation();
      event.preventDefault();
      onExpand(true);
    }

    if (event.key === "ArrowLeft") {
      event.stopPropagation();
      event.preventDefault();
      onExpand(false);
    }

    if (event.key === "ArrowDown" && itemRef.current) {
      const nextItem = document.querySelectorAll("#treeitem");
      const currentIndex = Array.from(nextItem).indexOf(itemRef.current);
      const nextIndex = currentIndex + 1;
      const nextItemElement = nextItem[nextIndex] as HTMLElement;
      if (nextItemElement) nextItemElement.focus();
    }

    if (event.key === "ArrowUp" && itemRef.current) {
      const previousItem = document.querySelectorAll("#treeitem");
      const currentIndex = Array.from(previousItem).indexOf(itemRef.current);
      const previousIndex = currentIndex - 1;
      const previousItemElement = previousItem[previousIndex] as HTMLElement;
      if (previousItemElement) previousItemElement.focus();
    }
  };

  return (
    <li className={container()}>
      <div
        ref={itemRef}
        role="treeitem"
        id="treeitem"
        aria-selected
        tabIndex={0}
        onDoubleClick={onDoubleClick}
        onKeyDown={onKeyDown}
        className={treeItem({ className })}
        {...props}
      >
        {children ? (
          <div className="p-0.5">
            <button
              type="button"
              tabIndex={-1}
              className={toggleButton()}
              onClick={(event) => {
                event.stopPropagation();
                onExpand(!expanded);
              }}
            >
              <Icon size={14} />
            </button>
          </div>
        ) : (
          <div className={slot()} />
        )}
        <span className={content()}>{label}</span>
      </div>
      {children && expanded && (
        <Tree className={treeWrapper()}>{children}</Tree>
      )}
    </li>
  );
}
