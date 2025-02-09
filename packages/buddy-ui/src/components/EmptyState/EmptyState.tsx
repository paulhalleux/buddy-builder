import React from "react";

import { Button } from "../Button";

export type EmptyStateProps = {
  title?: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ComponentType<{ size: number; className: string }>;
};

export function EmptyState({
  title,
  description,
  icon: Icon,
  primaryAction,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {Icon && <Icon size={48} className="text-neutral-300 mb-4" />}
      {title && (
        <h2 className="text-xl font-semibold text-neutral-900 mb-1">{title}</h2>
      )}
      <p className="text-sm text-neutral-600 text-center mb-4">{description}</p>
      <div className="flex space-x-4">
        {primaryAction && (
          <Button onClick={primaryAction.onClick}>{primaryAction.label}</Button>
        )}
        {secondaryAction && (
          <Button intent="subtle" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}
