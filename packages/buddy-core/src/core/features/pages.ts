import { BuilderPage, BuilderPageInit } from "../../types/builder.ts";
import { BuilderFeature } from "../../types/feature.ts";
import { deepFind, findAndAct } from "../../utils/recursive-find.ts";

export namespace PagesFeature {
  /**
   * The state of the pages feature.
   */
  export type State = {
    selectedPageId: string | null;
    expandedPages: string[];
  };

  /**
   * The implementation of the pages feature.
   */
  export type Impl = {
    /**
     * Add a page to the website.
     * @param page The page to add.
     */
    addPage: (page: BuilderPageInit, parentId?: string) => BuilderPage;
    /**
     * Remove a page from the website.
     * @param pageId The ID of the page to remove.
     */
    removePage: (pageId: string) => void;
    /**
     * Update a page.
     * @param pageId The ID of the page to update.
     * @param page The updated page.
     */
    updatePage: (pageId: string, page: Partial<BuilderPage>) => void;
    /**
     * Get a page by its ID.
     * @param pageId The ID of the page.
     * @returns The page if found, otherwise undefined.
     */
    getPage: (pageId: string) => BuilderPage | undefined;
    /**
     * Get all pages in the website.
     * @returns The pages.
     */
    getPages: () => BuilderPage[];
    /**
     * Select a page.
     * @param pageId The ID of the page to select.
     */
    selectPage: (pageId: string) => void;
    /**
     * Deselect the selected page.
     */
    deselectPage: () => void;
    /**
     * Get the selected page ID.
     */
    getSelectedPageId: () => string | null;
    /**
     * Get the selected page.
     */
    getSelectedPage: () => BuilderPage | undefined;
    /**
     * Get the expanded pages.
     */
    getExpandedPages: () => string[];
    /**
     * Expand a page.
     * @param pageId The ID of the page to expand.
     */
    expandPage: (pageId: string) => void;
    /**
     * Collapse a page.
     * @param pageId The ID of the page to collapse.
     */
    collapsePage: (pageId: string) => void;
  };
}

export const Pages: BuilderFeature<PagesFeature.State, PagesFeature.Impl> = {
  getInitialState: () => ({
    selectedPageId: null,
    expandedPages: [],
  }),
  create({ store, updateState, options }) {
    return {
      addPage(page, parentId) {
        const newPage: BuilderPage = {
          ...page,
          id: options.generateId(),
          pages: [],
          content: [],
        } as BuilderPage;

        updateState((draft) => {
          if (!parentId) {
            draft.website.pages.push(newPage);
            return;
          }

          findAndAct(
            draft.website.pages,
            (item) => item.id === parentId,
            (page) => {
              page.pages.push(newPage);
            },
            (item) => item.pages,
          );
        });

        return newPage;
      },
      removePage(pageId) {
        updateState((draft) => {
          const index = draft.website.pages.findIndex(
            (item) => item.id === pageId,
          );

          if (index !== -1) {
            draft.website.pages.splice(index, 1);
            return;
          }

          const parent = deepFind(
            draft.website.pages,
            (item) => item.pages.some((page) => page.id === pageId),
            (item) => item.pages,
          );

          if (parent) {
            const index = parent.pages.findIndex((page) => page.id === pageId);
            parent.pages.splice(index, 1);
          }
        });
      },
      getPage(pageId) {
        return deepFind(
          store.getState().website.pages,
          (item) => item.id === pageId,
          (item) => item.pages,
        );
      },
      getPages() {
        return store.getState().website.pages;
      },
      updatePage(pageId, page) {
        updateState((draft) => {
          const target = deepFind(
            draft.website.pages,
            (item) => item.id === pageId,
            (item) => item.pages,
          );

          if (target) {
            Object.assign(target, page);
          }
        });
      },
      selectPage(pageId) {
        updateState((draft) => {
          draft.selectedPageId = pageId;
        });
      },
      deselectPage() {
        updateState((draft) => {
          draft.selectedPageId = null;
        });
      },
      getSelectedPageId() {
        return store.getState().selectedPageId;
      },
      getSelectedPage() {
        const { selectedPageId } = store.getState();
        if (!selectedPageId) return undefined;
        return this.getPage(selectedPageId);
      },
      getExpandedPages() {
        return store.getState().expandedPages;
      },
      expandPage(pageId) {
        updateState((draft) => {
          draft.expandedPages.push(pageId);
        });
      },
      collapsePage(pageId) {
        updateState((draft) => {
          const index = draft.expandedPages.findIndex((id) => id === pageId);
          if (index !== -1) {
            draft.expandedPages.splice(index, 1);
          }
        });
      },
    };
  },
};
