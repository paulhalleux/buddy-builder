import React from "react";

export type CollapsibleTriggerProps = React.ComponentProps<"div">;

export function CollapsibleTrigger({
  children,
  className,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
