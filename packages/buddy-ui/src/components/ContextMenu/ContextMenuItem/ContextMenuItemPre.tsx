import React from "react";
import { clsx } from "clsx";

export type ContextMenuItemPreProps = React.ComponentPropsWithoutRef<"div">;

export function ContextMenuItemPre({
  children,
  className,
  ...props
}: ContextMenuItemPreProps) {
  return (
    <div className={clsx("w-[14px] mr-1.5", className)} {...props}>
      {children}
    </div>
  );
}
