import React, { useMemo } from "react";
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelGroupProps,
  PanelProps,
  PanelResizeHandle,
  PanelResizeHandleProps,
} from "react-resizable-panels";
import { clsx } from "clsx";
import { useResizeObserver } from "usehooks-ts";

const SizeContext = React.createContext<{
  direction?: "horizontal" | "vertical";
  height: number;
  width: number;
}>({ height: 0, width: 0 });

export function ResizablePanel({ children, ...props }: PanelGroupProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { height, width } = useResizeObserver<HTMLDivElement>({
    ref: ref as React.RefObject<HTMLDivElement>,
  });

  return (
    <div ref={ref} className="h-full w-full">
      {height && width ? (
        <SizeContext value={{ height, width, direction: props.direction }}>
          <PanelGroup {...props}>{children}</PanelGroup>
        </SizeContext>
      ) : null}
    </div>
  );
}

ResizablePanel.Panel = function Render({
  defaultSize: _defaultSize,
  collapsedSize: _collapsedSize,
  minSize: _minSize,
  maxSize: _maxSize,
  ...props
}: PanelProps) {
  const ref = React.useRef<ImperativePanelHandle>(null);
  const { height, width, direction } = React.use(SizeContext);

  const { defaultSize, minSize, maxSize, collapsedSize } = useMemo(() => {
    const delta = 100 / (direction === "vertical" ? height : width);
    return {
      defaultSize: _defaultSize ? _defaultSize * delta : undefined,
      minSize: _minSize ? _minSize * delta : undefined,
      maxSize: _maxSize ? _maxSize * delta : undefined,
      collapsedSize: _collapsedSize ? _collapsedSize * delta : undefined,
    };
  }, [
    _collapsedSize,
    _defaultSize,
    _maxSize,
    _minSize,
    direction,
    height,
    width,
  ]);

  return (
    <Panel
      ref={ref}
      {...props}
      defaultSize={defaultSize}
      minSize={minSize}
      maxSize={maxSize}
      collapsedSize={collapsedSize}
    />
  );
};

ResizablePanel.Handle = function Handle({
  className,
  ...props
}: PanelResizeHandleProps) {
  return (
    <PanelResizeHandle
      className={clsx(
        [
          "data-[panel-group-direction=vertical]:border-t",
          "data-[panel-group-direction=horizontal]:border-l",
          "border-neutral-200",
          "data-[resize-handle-state=hover]:border-neutral-300",
          "data-[resize-handle-state=drag]:border-neutral-300",
        ],
        className,
      )}
      {...props}
    />
  );
};
