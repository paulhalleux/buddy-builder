import { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";

import { Tooltip } from "./Tooltip.tsx";

const meta: Meta = {
  title: "Tooltip",
  tags: ["autodocs"],
  component: Tooltip,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args} content="Collapsible content">
      <Button>Hover me</Button>
    </Tooltip>
  ),
};
