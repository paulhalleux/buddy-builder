import { Button } from "./Button.tsx";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Button",
  tags: ["autodocs"],
  component: Button,
  args: {
    size: "sm",
  },
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "select" },
    },
    intent: {
      options: ["primary", "secondary", "subtle", "bordered"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    intent: "primary",
  },
};
