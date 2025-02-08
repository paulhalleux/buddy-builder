import { BuilderWebsite } from "../../types/builder.ts";
import { BuilderFeature } from "../../types/feature.ts";

export namespace CoreFeature {
  export type State = {
    website: BuilderWebsite;
  };

  /**
   * The implementation of the core feature.
   */
  export type Impl = {
    /**
     * Get the current website.
     */
    getWebsite(): BuilderWebsite;
    /**
     * Set the name of the website.
     * @param name
     */
    setWebsiteName(name: string): void;
  };
}

export const Core: BuilderFeature<CoreFeature.State, CoreFeature.Impl> = {
  getInitialState: () => ({
    website: {
      name: "New website",
      pages: [],
    },
  }),
  create: ({ store, updateState }) => ({
    getWebsite() {
      return store.getState().website;
    },
    setWebsiteName(name) {
      updateState((state) => {
        state.website.name = name;
      });
    },
  }),
};
