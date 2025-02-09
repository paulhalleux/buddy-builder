import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { EditInline } from "../EditInline";

import { Tree } from "./Tree.tsx";
import { treeItemStyles } from "./TreeItem.styles.ts";

const meta: Meta = {
  title: "Tree",
  tags: ["autodocs"],
  component: Tree,
  argTypes: {
    size: {
      options: Object.keys(treeItemStyles.variants.size),
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

type TreeItem = {
  label: string;
  id: string;
  children?: TreeItem[];
};

const TREE_ITEMS: TreeItem[] = [
  {
    label: "components",
    id: "components",
    children: [
      { label: "Button", id: "button" },
      { label: "Input", id: "input" },
      { label: "Tree", id: "tree" },
    ],
  },
  {
    label: "pages",
    id: "pages",
    children: [
      { label: "Home", id: "home" },
      { label: "About", id: "about" },
      { label: "Contact", id: "contact" },
      {
        label: "Blog",
        id: "blog",
        children: [
          { label: "Post 1", id: "post-1" },
          { label: "Post 2", id: "post-2" },
          { label: "Post 3", id: "post-3" },
        ],
      },
    ],
  },
];

export const Primary: Story = {
  args: {
    size: "sm",
  },
  render: function Render(args) {
    const [expanded, setExpanded] = React.useState<string[]>([]);
    const [selected, setSelected] = React.useState<string | null>(null);

    const renderTreeItems = (items: TreeItem[]) => {
      return items.map((item) => {
        const isExpanded = expanded.includes(item.id);
        const onExpand = (expanded: boolean) => {
          setExpanded((prev) =>
            expanded ? [...prev, item.id] : prev.filter((id) => id !== item.id),
          );
        };

        const onSelect = () => {
          setSelected(item.id);
        };

        return (
          <Tree.Item
            key={item.id}
            label={item.label}
            expanded={isExpanded}
            onExpand={onExpand}
            onClick={onSelect}
            size={args.size}
            selected={selected === item.id}
          >
            {item.children && renderTreeItems(item.children)}
          </Tree.Item>
        );
      });
    };

    return <Tree>{renderTreeItems(TREE_ITEMS)}</Tree>;
  },
};

export const Editable: Story = {
  args: {
    size: "sm",
  },
  render: function Render(args) {
    const [expanded, setExpanded] = React.useState<string[]>([]);
    const [selected, setSelected] = React.useState<string | null>(null);

    const renderTreeItems = (items: TreeItem[]) => {
      return items.map((item) => {
        const isExpanded = expanded.includes(item.id);
        const onExpand = (expanded: boolean) => {
          setExpanded((prev) =>
            expanded ? [...prev, item.id] : prev.filter((id) => id !== item.id),
          );
        };

        const onSelect = () => {
          setSelected(item.id);
        };

        return (
          <Tree.Item
            key={item.id}
            label={<EditInline value={item.label} />}
            expanded={isExpanded}
            onExpand={onExpand}
            onClick={onSelect}
            size={args.size}
            selected={selected === item.id}
          >
            {item.children && renderTreeItems(item.children)}
          </Tree.Item>
        );
      });
    };

    return <Tree>{renderTreeItems(TREE_ITEMS)}</Tree>;
  },
};

export const DeeplyNested: Story = {
  args: {
    size: "sm",
  },
  render: function Render() {
    return (
      <div className="w-64 h-32 border border-gray-200 overflow-auto">
        <Tree>
          <Tree.Item expanded label={crypto.randomUUID()}>
            <Tree.Item expanded label={crypto.randomUUID()}>
              <Tree.Item expanded label={crypto.randomUUID()}>
                <Tree.Item label={crypto.randomUUID()} />
                <Tree.Item label={crypto.randomUUID()} />
              </Tree.Item>
              <Tree.Item label={crypto.randomUUID()} />
            </Tree.Item>
            <Tree.Item expanded label={crypto.randomUUID()}>
              <Tree.Item label={crypto.randomUUID()} />
              <Tree.Item label={crypto.randomUUID()} />
            </Tree.Item>
          </Tree.Item>
        </Tree>
      </div>
    );
  },
};
