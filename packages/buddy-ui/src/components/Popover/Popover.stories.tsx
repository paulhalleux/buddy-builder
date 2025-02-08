import { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";

import { Popover } from "./Popover.tsx";

const meta: Meta = {
  title: "Popover",
  tags: ["autodocs"],
  component: Popover,
  argTypes: {
    children: { table: { disable: true } },
    content: { table: { disable: true } },
    placement: {
      options: ["top", "right", "bottom", "left"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: <div className="h-8 w-48 bg-red-400">Popover content</div>,
    children: <Button>Open Popover</Button>,
    openOnHover: true,
    openOnFocus: true,
    openOnClick: true,
    offset: 8,
  },
};
