import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  autoUpdate,
  offset,
  Placement,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from "@floating-ui/react";

export type PopoverProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement: Placement;
  openOnHover?: boolean;
  openOnFocus?: boolean;
  openOnClick?: boolean;
  openOnRightClick?: boolean;
  content?: React.ReactNode;
  offset?: number;
  openDelay?: number;
  closeDelay?: number;
} & Omit<React.ComponentPropsWithoutRef<"div">, "content">;

export function Popover({
  open,
  onOpenChange,
  children,
  placement = "bottom",
  openOnHover = false,
  openOnFocus = false,
  openOnClick = true,
  openOnRightClick = false,
  content,
  className,
  openDelay,
  closeDelay,
  offset: _offset,
  ...props
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: open !== undefined ? open : internalOpen,
    onOpenChange: onOpenChange !== undefined ? onOpenChange : setInternalOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(_offset)],
    strategy: openOnRightClick ? "fixed" : "absolute",
  });

  const click = useClick(context, { enabled: openOnClick });
  const hover = useHover(context, {
    enabled: openOnHover,
    delay: { open: openDelay, close: closeDelay },
  });
  const focus = useFocus(context, { enabled: openOnFocus });
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    hover,
    focus,
    dismiss,
  ]);

  const onContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    refs.setPositionReference({
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x: event.clientX,
          y: event.clientY,
          top: event.clientY,
          right: event.clientX,
          bottom: event.clientY,
          left: event.clientX,
        };
      },
    });
    context.onOpenChange(true);
  };

  const onClick = (event: React.MouseEvent) => {
    if (openOnRightClick) {
      event.preventDefault();
      context.onOpenChange(false);
    }
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={className}
        ref={refs.setReference}
        onContextMenu={onContextMenu}
        onClick={onClick}
        {...props}
        {...getReferenceProps()}
      >
        {children}
      </div>
      {createPortal(
        context.open && (
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={floatingStyles}
          >
            {content}
          </div>
        ),
        document.body,
      )}
    </>
  );
}
