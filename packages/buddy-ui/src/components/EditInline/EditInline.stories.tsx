import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { EditInline } from "./EditInline.tsx";

const meta: Meta = {
  title: "EditInline",
  tags: ["autodocs"],
  component: EditInline,
  args: {
    onChange: fn(),
    onConfirm: fn(),
    onCancel: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: "Edit me",
    outlined: false,
  },
};

export const Inherited: Story = {
  args: {
    value: "Edit me",
    outlined: true,
  },
  render: (props) => (
    <div className="text-blue-500 font-black text-4xl">
      <EditInline {...props} />
    </div>
  ),
};
