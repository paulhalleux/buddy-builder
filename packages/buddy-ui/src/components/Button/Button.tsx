import React from "react";
import { buttonStyles, ButtonVariantProps } from "./Button.styles.ts";

export type ButtonProps = React.ComponentProps<"button"> & ButtonVariantProps;

export function Button({
  size = "sm",
  intent = "primary",
  ...props
}: ButtonProps) {
  const className = buttonStyles({ size, intent });

  return (
    <button className={className} {...props}>
      Click me
    </button>
  );
}
