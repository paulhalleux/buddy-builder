import React from "react";

import { buttonStyles, ButtonVariantProps } from "./Button.styles.ts";

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  ButtonVariantProps;

export function Button({
  size = "sm",
  intent = "primary",
  icon = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = buttonStyles({ size, intent, icon, className });
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
