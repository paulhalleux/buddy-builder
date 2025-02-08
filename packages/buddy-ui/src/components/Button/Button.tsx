import React from "react";
import { buttonStyles, ButtonVariantProps } from "./Button.styles.ts";

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  ButtonVariantProps;

export function Button({
  size = "sm",
  intent = "primary",
  children,
  ...props
}: ButtonProps) {
  const className = buttonStyles({ size, intent });
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
