import { CoreFeature } from "../core/features/core.ts";
import { StoreUpdater } from "./store.ts";
import { StoreApi } from "zustand/vanilla";

/**
 * Builder state
 * ---
 * This type is used to define the state of the builder
 * It aggregates all the states of the features
 */
export interface BuilderState extends CoreFeature.State {}

/**
 * Register builder types
 */
export interface Register {}

/**
 * Builder store
 * ---
 * This type is used to define the store of the builder
 * It is deduced from the register type
 */
export type BuilderStore = Register extends {
  store: infer S extends StoreApi<BuilderState>;
}
  ? S
  : StoreApi<BuilderState>;

/**
 * Base of the builder
 * ---
 * This type is used to define the base of the builder which includes the store and the update state function
 * This includes everything that is needed to create a builder and for the features to work
 */
export type BuilderBase = {
  store: BuilderStore;
  updateState: StoreUpdater<BuilderState>;
};

/**
 * Builder
 * ---
 * This type is used to define the builder
 * It includes all the features of the builder
 */
export interface Builder extends BuilderBase, CoreFeature.Impl {}
