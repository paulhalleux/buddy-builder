import { create } from "zustand";
import { produce } from "immer";
import { BuilderState, BuilderStore } from "../types/core.ts";
import { Store, StoreUpdater } from "../types/store.ts";

/**
 * Create a new builder store
 * ---
 * This function is used to create a new builder store using Zustand
 * @param initialState Initial state
 */
export function createDefaultBuilderStore(
  initialState: BuilderState,
): Store<BuilderState> {
  return create(() => initialState);
}

/**
 * Create a store updater
 * ---
 * This function is used to update the store state using immer
 * @param store Store
 */
export function createStoreUpdater(
  store: BuilderStore,
): StoreUpdater<BuilderState> {
  return (updater) => {
    store.setState(produce(store.getState(), updater));
  };
}
