import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";

import { collapsibleStyles } from "./Collapsible.styles.ts";
import { CollapsibleContent } from "./CollapsibleContent.tsx";
import { CollapsibleTrigger } from "./CollapsibleTrigger.tsx";

export type CollapsibleProps = React.ComponentProps<"div"> & {
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  triggerClassName?: string;
  contentClassName?: string;
};

export function Collapsible({
  children,
  className,
  triggerClassName,
  contentClassName,
  defaultOpen = false,
  ...props
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === CollapsibleTrigger,
  );

  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === CollapsibleContent,
  );

  const onToggleClick = () => {
    const open = !internalOpen;
    if (props.onToggle) {
      props.onToggle(open);
    } else {
      setInternalOpen(open);
    }
  };

  const isOpen = props.open === undefined ? internalOpen : props.open;
  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

  const {
    content: contentStyle,
    trigger: triggerStyle,
    container,
  } = collapsibleStyles({ className });

  return (
    <div className={container()} {...props}>
      <div
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
        className={triggerStyle({ className: triggerClassName })}
        onClick={onToggleClick}
        onKeyDown={onToggleClick}
      >
        <Icon className="mt-[1px]" size={14} />
        {trigger}
      </div>
      {isOpen && (
        <div className={contentStyle({ className: contentClassName })}>
          {content}
        </div>
      )}
    </div>
  );
}

Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;
