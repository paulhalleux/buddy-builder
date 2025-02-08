import { Button } from "./Button.tsx";
import { Meta, StoryObj } from "@storybook/react";
import { buttonStyles } from "./Button.styles.ts";

const meta: Meta = {
  title: "Button",
  tags: ["autodocs"],
  component: Button,
  args: {
    size: "sm",
  },
  argTypes: {
    size: {
      options: Object.keys(buttonStyles.variants.size),
      control: { type: "select" },
    },
    intent: {
      options: Object.keys(buttonStyles.variants.intent),
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
