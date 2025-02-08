import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ChevronRight, PlusIcon } from "lucide-react";

import { Button } from "../Button";

import { ContextMenu } from "./ContextMenu.tsx";

const meta: Meta = {
  title: "ContextMenu",
  tags: ["autodocs"],
  component: ContextMenu,
  args: {
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenu.Title>Settings</ContextMenu.Title>
      <ContextMenu.Item>
        <ContextMenu.Item.Pre>
          <PlusIcon size={14} />
        </ContextMenu.Item.Pre>
        Item 1
      </ContextMenu.Item>
      <ContextMenu.Item>
        <ContextMenu.Item.Pre />
        Item 2
      </ContextMenu.Item>
      <ContextMenu.Separator />
      <ContextMenu.Title>Add</ContextMenu.Title>
      <ContextMenu.Item>
        <ContextMenu.Item.Pre />
        Item 3
      </ContextMenu.Item>
      <ContextMenu.Separator />
      <ContextMenu.Title>More</ContextMenu.Title>
      <ContextMenu
        trigger={
          <ContextMenu.Item>
            <ContextMenu.Item.Pre />
            Submenu
            <ChevronRight className="ml-auto" size={14} />
          </ContextMenu.Item>
        }
      >
        <ContextMenu.Item>
          <ContextMenu.Item.Pre /> Submenu 1
        </ContextMenu.Item>
        <ContextMenu.Item>
          <ContextMenu.Item.Pre /> Submenu 2
        </ContextMenu.Item>
        <ContextMenu.Item>
          <ContextMenu.Item.Pre /> Submenu 3
        </ContextMenu.Item>
      </ContextMenu>
    </ContextMenu>
  ),
};

export const Trigger: Story = {
  render: () => (
    <ContextMenu placement="bottom-start" trigger={<Button>Trigger</Button>}>
      <ContextMenu.Item>
        <ContextMenu.Item.Pre>
          <PlusIcon size={14} />
        </ContextMenu.Item.Pre>
        Item 1
      </ContextMenu.Item>
      <ContextMenu.Item>
        <ContextMenu.Item.Pre />
        Item 2
      </ContextMenu.Item>
      <ContextMenu.Separator />
      <ContextMenu.Item>
        <ContextMenu.Item.Pre />
        Item 3
      </ContextMenu.Item>
    </ContextMenu>
  ),
};

export const RightClick: Story = {
  render: () => (
    <ContextMenu
      rightClick
      trigger={
        <div className="h-72 w-72 bg-neutral-100 border border-neutral-200 rounded-sm" />
      }
    >
      <ContextMenu.Item>
        <ContextMenu.Item.Pre>
          <PlusIcon size={14} />
        </ContextMenu.Item.Pre>
        Item 1
      </ContextMenu.Item>
      <ContextMenu.Item>
        <ContextMenu.Item.Pre />
        Item 2
      </ContextMenu.Item>
      <ContextMenu.Separator />
      <ContextMenu.Item>
        <ContextMenu.Item.Pre />
        Item 3
      </ContextMenu.Item>
    </ContextMenu>
  ),
};
