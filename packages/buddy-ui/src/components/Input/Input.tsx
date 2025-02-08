import React from "react";

import { inputStyles, InputVariantProps } from "./Input.styles.ts";

export type InputProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  keyof InputVariantProps
> & {
  prepend?: React.ReactNode;
  append?: React.ReactNode;
} & Omit<InputVariantProps, "append" | "prepend">;

export function Input({
  size = "sm",
  className,
  append: _append,
  prepend: _prepend,
  ...props
}: InputProps) {
  const { base, append, prepend, container } = inputStyles({
    size,
    className,
    prepend: !!_prepend,
    append: !!_append,
  });

  return (
    <div className={container()}>
      {_prepend && <div className={prepend()}>{_prepend}</div>}
      <input className={base()} {...props} />
      {_append && <div className={append()}>{_append}</div>}
    </div>
  );
}
