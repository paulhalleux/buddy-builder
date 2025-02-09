import { useState } from "react";
import { ResizablePanel, Toolbar, Tooltip } from "@buddy-builder/ui";
import { Grid2X2Icon, LayersIcon } from "lucide-react";

import { Canvas } from "../Canvas";
import { PageEditor } from "../PageEditor";
import { PageList } from "../PageList";
import { ViewportControls } from "../ViewportControls";

export const ViewportModes = {
  Mobile: { maxWidth: 375 },
  Tablet: { maxWidth: 768 },
  Desktop: { maxWidth: 1024 },
};

export function WebsiteEditor() {
  const [viewportMode, setViewportMode] =
    useState<keyof typeof ViewportModes>("Desktop");

  return (
    <ResizablePanel direction="horizontal">
      <Toolbar direction="vertical">
        <Tooltip content="Content" placement="right">
          <Toolbar.Item>
            <LayersIcon size={14} />
          </Toolbar.Item>
        </Tooltip>
        <Tooltip content="Blocks" placement="right">
          <Toolbar.Item>
            <Grid2X2Icon size={14} />
          </Toolbar.Item>
        </Tooltip>
      </Toolbar>
      <ResizablePanel.Panel
        className="bg-white"
        minSize={250}
        maxSize={400}
        defaultSize={300}
      >
        <ResizablePanel direction="vertical">
          <div className="border-b border-neutral-200 max-h-[200px]">
            <PageList />
          </div>
          <div>Content</div>
        </ResizablePanel>
      </ResizablePanel.Panel>
      <ResizablePanel.Handle />
      <ResizablePanel.Panel className="bg-neutral-100">
        <div className="p-6 h-full overflow-auto space-y-4">
          <ViewportControls
            viewportMode={viewportMode}
            setViewportMode={setViewportMode}
          />
          <div
            style={{
              maxWidth: ViewportModes[viewportMode].maxWidth,
              margin: "0 auto",
            }}
          >
            <Canvas />
          </div>
        </div>
      </ResizablePanel.Panel>
      <ResizablePanel.Handle />
      <ResizablePanel.Panel
        className="bg-white flex flex-col"
        minSize={250}
        maxSize={400}
        defaultSize={300}
      >
        <div className="border-b border-neutral-200 max-h-[200px]">
          <PageEditor />
        </div>
        <div>Controls</div>
      </ResizablePanel.Panel>
    </ResizablePanel>
  );
}
