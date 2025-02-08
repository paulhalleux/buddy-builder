import { merge } from "lodash";

import { createDefaultBuilderStore, createStoreUpdater } from "../store";
import {
  Builder,
  BuilderBase,
  BuilderOptions,
  BuilderState,
  BuilderStore,
} from "../types/core.ts";
import { BuilderFeature } from "../types/feature.ts";
import { StoreBuilder } from "../types/store.ts";
import { DeepPartial } from "../types/utils.ts";

import { Core } from "./features/core.ts";
import { Pages } from "./features/pages.ts";

export type CreateBuilderParams = {
  initialState: DeepPartial<BuilderState>;
  storeBuilder?: StoreBuilder<BuilderState, BuilderStore>;
  features?: BuilderFeature<unknown, unknown>[];
  options?: DeepPartial<BuilderOptions>;
};

const DEFAULT_OPTIONS: BuilderOptions = {
  generateId: () => crypto.randomUUID(),
};

const BUILT_IN_FEATURES: BuilderFeature<unknown, unknown>[] = [Core, Pages];

/**
 * Create a new builder instance
 * ---
 * This function is used to create a new builder instance
 * @param initialState - Initial state of the builder
 * @param features - Features of the builder
 * @param storeBuilder - Store builder
 * @param options - Options of the builder
 */
export function createBuilder({
  initialState,
  features,
  storeBuilder = createDefaultBuilderStore,
  options,
}: CreateBuilderParams) {
  const allFeatures = [...BUILT_IN_FEATURES, ...(features || [])];
  const mergedOptions = merge(DEFAULT_OPTIONS, options);

  // Aggregate the initial state of all features
  const featureInitialState: BuilderState = allFeatures.reduce(
    (acc, feature) => {
      return merge(feature.getInitialState(), acc);
    },
    initialState as BuilderState,
  );

  const store = storeBuilder(featureInitialState);
  const updateState = createStoreUpdater(store);

  const base: BuilderBase = {
    store,
    updateState,
    options: mergedOptions,
  };

  return allFeatures.reduce((acc, feature) => {
    return Object.assign(acc, feature.create(base));
  }, base as Builder);
}
