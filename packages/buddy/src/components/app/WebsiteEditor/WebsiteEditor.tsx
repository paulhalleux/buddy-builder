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
          <ResizablePanel.Panel minSize={200} defaultSize={200}>
            <PageList />
          </ResizablePanel.Panel>
          <ResizablePanel.Handle />
          <ResizablePanel.Panel minSize={300}></ResizablePanel.Panel>
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
        <ResizablePanel direction="vertical">
          <ResizablePanel.Panel minSize={150} defaultSize={200}>
            <PageEditor />
          </ResizablePanel.Panel>
          <ResizablePanel.Handle />
          <ResizablePanel.Panel minSize={300}></ResizablePanel.Panel>
        </ResizablePanel>
      </ResizablePanel.Panel>
    </ResizablePanel>
  );
}
