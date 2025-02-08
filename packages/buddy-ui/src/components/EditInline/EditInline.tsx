import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  editInlineStyles,
  EditInlineVariantProps,
} from "./EditInline.styles.ts";
import { clsx } from "clsx";

export type EditInlineRef = {
  focus: () => void;
};

export type EditInlineProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  keyof EditInlineVariantProps | "onChange" | "value"
> & {
  value: string;
  ref: React.Ref<EditInlineRef>;
  onChange?: (value: string) => void;
  onConfirm?: (value: string) => void;
  onCancel?: (initialValue: string) => void;
} & EditInlineVariantProps;

export function EditInline({
  size = "sm",
  outlined,
  className,
  ref,
  value,
  onCancel,
  onChange,
  onConfirm,
  ...props
}: EditInlineProps) {
  const initialValue = useRef(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState(value);
  const [editing, setEditing] = useState(false);

  const { base, input } = editInlineStyles({ size, outlined, className });

  const startEditing = useCallback(() => {
    setEditing(true);
    setInputValue(value);
    initialValue.current = value;
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  }, [value]);

  const cancelEditing = useCallback(() => {
    setEditing(false);
    onCancel?.(initialValue.current ?? "");
  }, [onCancel]);

  const confirmEditing = useCallback(
    (newValue: string) => {
      setEditing(false);
      onConfirm?.(newValue);
    },
    [onConfirm],
  );

  useImperativeHandle(
    ref,
    () => ({
      focus: startEditing,
    }),
    [startEditing],
  );

  const onInputChanged = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      if (onChange) {
        onChange(e.target.value);
      }
    },
    [onChange],
  );

  const onInputBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      confirmEditing(e.currentTarget.value);
    },
    [confirmEditing],
  );

  const onInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
      }

      if (e.key === "Enter") {
        confirmEditing(e.currentTarget.value);
      } else if (e.key === "Escape") {
        cancelEditing();
      }
    },
    [confirmEditing, cancelEditing],
  );

  const onSpanKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === "Enter") {
        startEditing();
      }
    },
    [startEditing],
  );

  const onSpanDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      e.stopPropagation();
      startEditing();
    },
    [startEditing],
  );

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={inputValue}
        onChange={onInputChanged}
        className={clsx(base(), input())}
        onDoubleClick={(event) => event.stopPropagation()}
        onKeyDown={onInputKeyDown}
        onBlur={onInputBlur}
        {...props}
      />
    );
  }

  return (
    <span
      tabIndex={0}
      role="button"
      className={base()}
      onDoubleClick={onSpanDoubleClick}
      onKeyDown={onSpanKeyDown}
    >
      {value}
    </span>
  );
}
