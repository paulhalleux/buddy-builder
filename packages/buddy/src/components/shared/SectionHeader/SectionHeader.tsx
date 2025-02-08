import * as React from "react";

type SectionHeaderProps = React.PropsWithChildren<{
  title: string;
}>;

export function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <header className="h-10 flex items-center justify-between px-2 shrink-0">
      <h2 className="text-sm font-medium">{title}</h2>
      <div>{children}</div>
    </header>
  );
}
