import { BuilderPage } from "../../types/builder.ts";
import { BuilderFeature } from "../../types/feature.ts";

export namespace PagesFeature {
  /**
   * The state of the pages feature.
   */
  export type State = {
    selectedPageId: string | null;
  };

  /**
   * The implementation of the pages feature.
   */
  export type Impl = {
    /**
     * Add a page to the website.
     * @param page The page to add.
     */
    addPage: (page: Omit<BuilderPage, "id">) => BuilderPage;
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
  };
}

export const Pages: BuilderFeature<PagesFeature.State, PagesFeature.Impl> = {
  getInitialState: () => ({
    selectedPageId: null,
  }),
  create: ({ store, updateState, options }) => ({
    addPage: (page) => {
      const newPage = {
        id: options.generateId(),
        ...page,
      };

      updateState((draft) => {
        draft.website.pages.push(newPage);
      });

      return newPage;
    },
    removePage: (pageId) => {
      updateState((draft) => {
        draft.website.pages = draft.website.pages.filter(
          (page) => page.id !== pageId,
        );

        if (draft.selectedPageId === pageId) {
          draft.selectedPageId = null;
        }
      });
    },
    getPage: (pageId) => {
      return store.getState().website.pages.find((page) => page.id === pageId);
    },
    getPages: () => {
      return store.getState().website.pages;
    },
    updatePage: (pageId, page) => {
      updateState((draft) => {
        const index = draft.website.pages.findIndex((p) => p.id === pageId);
        if (index !== -1) {
          draft.website.pages[index] = {
            ...draft.website.pages[index],
            ...page,
          };
        }
      });
    },
    selectPage: (pageId) => {
      updateState((draft) => {
        draft.selectedPageId = pageId;
      });
    },
    deselectPage: () => {
      updateState((draft) => {
        draft.selectedPageId = null;
      });
    },
    getSelectedPageId: () => {
      return store.getState().selectedPageId;
    },
    getSelectedPage: () => {
      const { website, selectedPageId } = store.getState();
      return website.pages.find((page) => page.id === selectedPageId);
    },
  }),
};
