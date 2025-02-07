import { Meta, StoryObj } from "@storybook/react";
import { ResizablePanel } from "./ResizablePanel.tsx";

const meta: Meta = {
  title: "ResizablePanel",
  tags: ["autodocs"],
  component: ResizablePanel,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <div className="h-screen w-screen">
      <ResizablePanel direction="horizontal">
        <ResizablePanel.Panel
          className="bg-neutral-50"
          defaultSize={250}
          maxSize={400}
          minSize={200}
        >
          Panel 1
        </ResizablePanel.Panel>
        <ResizablePanel.Handle />
        <ResizablePanel.Panel>Content</ResizablePanel.Panel>
        <ResizablePanel.Handle />
        <ResizablePanel.Panel
          className="bg-neutral-50"
          defaultSize={250}
          maxSize={400}
          minSize={200}
        >
          <ResizablePanel direction="vertical">
            <ResizablePanel.Panel minSize={250}>Panel 2</ResizablePanel.Panel>
            <ResizablePanel.Handle />
            <ResizablePanel.Panel minSize={250}>Panel 3</ResizablePanel.Panel>
          </ResizablePanel>
        </ResizablePanel.Panel>
      </ResizablePanel>
    </div>
  ),
};
