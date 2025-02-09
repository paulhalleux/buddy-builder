import { ResizablePanel } from "@buddy-builder/ui";

import { PageEditor } from "../PageEditor";
import { PageList } from "../PageList";

export function WebsiteEditor() {
  return (
    <ResizablePanel direction="horizontal">
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
      <ResizablePanel.Panel className="bg-neutral-100"></ResizablePanel.Panel>
      <ResizablePanel.Handle />
      <ResizablePanel.Panel
        className="bg-white"
        minSize={250}
        maxSize={400}
        defaultSize={300}
      >
        <div className="border-b border-neutral-200 max-h-[200px]">
          <PageEditor />
        </div>
      </ResizablePanel.Panel>
    </ResizablePanel>
  );
}
