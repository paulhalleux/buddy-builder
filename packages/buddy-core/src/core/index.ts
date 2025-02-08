import { merge } from "lodash";

import { createDefaultBuilderStore, createStoreUpdater } from "../store";

import { BuilderFeature } from "../types/feature.ts";
import { StoreBuilder } from "../types/store.ts";
import {
  Builder,
  BuilderBase,
  BuilderState,
  BuilderStore,
} from "../types/core.ts";

import { Core } from "./features/core.ts";
import { DeepPartial } from "../types/utils.ts";

export type CreateBuilderParams = {
  initialState: DeepPartial<BuilderState>;
  storeBuilder?: StoreBuilder<BuilderState, BuilderStore>;
  features?: BuilderFeature<unknown, unknown>[];
};

const BUILT_IN_FEATURES: BuilderFeature<unknown, unknown>[] = [Core];

/**
 * Create a new builder instance
 * ---
 * This function is used to create a new builder instance
 * @param initialState - Initial state of the builder
 * @param features - Features of the builder
 * @param storeBuilder - Store builder
 */
export function createBuilder({
  initialState,
  features,
  storeBuilder = createDefaultBuilderStore,
}: CreateBuilderParams) {
  const allFeatures = [...BUILT_IN_FEATURES, ...(features || [])];

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
  };

  return allFeatures.reduce((acc, feature) => {
    return Object.assign(acc, feature.create(base));
  }, base as Builder);
}
