import React from "react";
import { Placement } from "@floating-ui/react";

import { Popover } from "../Popover";

import { tooltipStyles } from "./Tooltip.styles.ts";

export type TooltipProps = Omit<React.ComponentProps<"div">, "content"> & {
  content?: React.ReactNode;
  placement?: Placement;
};

export function Tooltip({
  children,
  placement = "top",
  content,
  className,
  ...props
}: TooltipProps) {
  const classes = tooltipStyles({ className });
  return (
    <Popover
      placement={placement}
      openOnHover={true}
      openOnFocus={true}
      openOnClick={false}
      openDelay={300}
      closeDelay={100}
      content={
        <div className={classes} {...props}>
          {content}
        </div>
      }
    >
      {children}
    </Popover>
  );
}
