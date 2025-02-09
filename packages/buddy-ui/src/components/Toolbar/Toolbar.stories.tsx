import { Meta, StoryObj } from "@storybook/react";
import { clsx } from "clsx";
import { FileIcon, FolderIcon, LayoutIcon } from "lucide-react";

import { toolbarStyles } from "./Toolbar.styles.ts";
import { Toolbar } from "./Toolbar.tsx";

const meta: Meta = {
  title: "Toolbar",
  tags: ["autodocs"],
  component: Toolbar,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    direction: "horizontal",
  },
  argTypes: {
    direction: {
      control: { type: "select" },
      options: Object.keys(toolbarStyles.variants.direction),
    },
  },
  render: (args, context) => (
    <div
      className={clsx({
        "h-screen": context.viewMode === "story",
        "min-h-24": context.viewMode === "docs",
      })}
    >
      <Toolbar {...args}>
        <Toolbar.Item selected>
          <FileIcon size={14} />
        </Toolbar.Item>
        <Toolbar.Item>
          <FolderIcon size={14} />
        </Toolbar.Item>
        <Toolbar.Item>
          <LayoutIcon size={14} />
        </Toolbar.Item>
      </Toolbar>
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Vertical: Story = {
  args: {
    direction: "vertical",
  },
};
