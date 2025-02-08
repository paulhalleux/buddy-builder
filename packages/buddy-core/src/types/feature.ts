import { BuilderBase } from "./core.ts";

/**
 * Feature of the builder
 * ---
 * This type is used to define the feature of the builder
 */
export type BuilderFeature<State, Impl> = {
  /**
   * Get initial state
   */
  getInitialState(): State;

  /**
   * Create the feature implementation
   * @param base Base of the builder
   */
  create(base: BuilderBase): Impl;
};
