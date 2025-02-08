import { Meta, StoryObj } from "@storybook/react";
import { EditInline } from "./EditInline.tsx";
import { editInlineStyles } from "./EditInline.styles.ts";
import { fn } from "@storybook/test";

const meta: Meta = {
  title: "EditInline",
  tags: ["autodocs"],
  component: EditInline,
  args: {
    onChange: fn(),
    onConfirm: fn(),
    onCancel: fn(),
  },
  argTypes: {
    size: {
      options: Object.keys(editInlineStyles.variants.size),
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: "Edit me",
    size: "sm",
    outlined: false,
  },
};
