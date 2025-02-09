import { BlockInstance } from "./block.ts";

/**
 * Page type
 * ---
 * This type is used to define the type of the page
 */
export enum PageType {
  Page = "page",
  Layout = "layout",
}

/**
 * Base page
 * ---
 * This type is used to define the base page
 */
export type BasePage = {
  id: string;
  name: string;
  content: BlockInstance[];
  // eslint-disable-next-line no-use-before-define
  pages: BuilderPage[];
  path: string;
};

/**
 * Page
 * ---
 * This type is used to define the page
 */
export type Page = BasePage & {
  type: PageType.Page;
  path: string;
};

/**
 * Layout
 * ---
 * This type is used to define the layout
 */
export type Layout = BasePage & {
  type: PageType.Layout;
};

/**
 * Builder page
 * ---
 * This type is used to define the page of the builder
 */
export type BuilderPage = Page | Layout;
export type BuilderPageInit = Omit<BuilderPage, "id" | "content" | "pages">;

/**
 * Builder website
 * ---
 * This type is used to define the website of the builder
 */
export type BuilderWebsite = {
  name: string;
  pages: BuilderPage[];
};
