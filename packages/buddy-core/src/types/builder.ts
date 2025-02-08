import React from "react";
import { Control, ExtractControlsValue } from "./control.ts";

export type BlockRendererProps<Controls extends Record<string, Control>> = {
  controls: ExtractControlsValue<Controls>;
};

export type BlockRenderer<Controls extends Record<string, Control>> =
  React.ComponentType<BlockRendererProps<Controls>>;

export type BlockDefinition<Controls extends Record<string, Control>> = {
  id: string;
  type: string;
  name: string;
  controls: Controls;
  renderer: BlockRenderer<Controls>;
};

export type BlockInstance = {
  definitionId: string;
  id: string;
  type: string;
};

export type BuilderPage = {
  name: string;
  blocks: BlockInstance[];
};

export type BuilderWebsite = {
  name: string;
  pages: BuilderPage[];
};
