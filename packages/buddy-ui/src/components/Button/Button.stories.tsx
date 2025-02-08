import { Meta, StoryObj } from "@storybook/react";
import { PlusIcon } from "lucide-react";

import { buttonStyles } from "./Button.styles.ts";
import { Button } from "./Button.tsx";

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

export const Default: Story = {
  args: {
    children: "Default",
    intent: "primary",
  },
};

export const Icon: Story = {
  args: {
    children: <PlusIcon size={12} />,
    icon: true,
  },
};
