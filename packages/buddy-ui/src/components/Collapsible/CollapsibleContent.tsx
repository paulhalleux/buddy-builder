import React from "react";

export type CollapsibleContentProps = React.ComponentProps<"div">;

export function CollapsibleContent({
  children,
  className,
  ...props
}: CollapsibleContentProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
