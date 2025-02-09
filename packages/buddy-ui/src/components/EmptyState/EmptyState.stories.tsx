import { Meta, StoryObj } from "@storybook/react";
import { PackageOpenIcon } from "lucide-react";

import { EmptyState } from "./EmptyState.tsx";

const meta: Meta = {
  title: "EmptyState",
  tags: ["autodocs"],
  component: EmptyState,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "No pages",
    description: "Create a new page to get started.",
    primaryAction: {
      label: "Create page",
      onClick: () => {},
    },
  },
};

export const WithIcon: Story = {
  args: {
    title: "No pages",
    description: "Create a new page to get started.",
    primaryAction: {
      label: "Create page",
      onClick: () => {},
    },
    icon: PackageOpenIcon,
  },
};

export const WithSecondaryAction: Story = {
  args: {
    title: "No pages",
    description: "Create a new page to get started.",
    primaryAction: {
      label: "Create page",
      onClick: () => {},
    },
    secondaryAction: {
      label: "Learn more",
      onClick: () => {},
    },
  },
};
