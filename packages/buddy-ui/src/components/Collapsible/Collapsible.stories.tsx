import { Meta, StoryObj } from "@storybook/react";

import { Collapsible } from "./Collapsible.tsx";

const meta: Meta = {
  title: "Collapsible",
  tags: ["autodocs"],
  component: Collapsible,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible className="border border-gray-200">
      <Collapsible.Trigger>Trigger</Collapsible.Trigger>
      <Collapsible.Content>Content</Collapsible.Content>
    </Collapsible>
  ),
};
