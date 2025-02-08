import { BlockInstance } from "./block.ts";

/**
 * Builder page
 * ---
 * This type is used to define the page of the builder
 */
export type BuilderPage = {
  name: string;
  path: string;
  content: BlockInstance[];
};

/**
 * Builder website
 * ---
 * This type is used to define the website of the builder
 */
export type BuilderWebsite = {
  name: string;
  pages: BuilderPage[];
};
