import { Meta, StoryObj } from "@storybook/react";

import { inputStyles } from "./Input.styles.ts";
import { Input } from "./Input.tsx";

const meta: Meta = {
  title: "Input",
  tags: ["autodocs"],
  component: Input,
  args: {
    size: "sm",
  },
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: Object.keys(inputStyles.variants.size),
    },
    type: {
      control: {
        type: "select",
      },
      options: ["text", "password", "email", "number"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prepend: "/",
    append: ".com",
  },
};
