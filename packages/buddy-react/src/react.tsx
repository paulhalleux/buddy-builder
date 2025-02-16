import React, { useCallback } from "react";
import {
  Builder,
  BuilderState,
  createBuilder,
  CreateBuilderParams,
} from "@buddy/core";
import { create, UseBoundStore } from "zustand/react";
import { useShallow } from "zustand/react/shallow";
import { StoreApi } from "zustand/vanilla";

// Register the store type
declare module "@buddy/core" {
  interface Register {
    store: UseBoundStore<StoreApi<BuilderState>>;
  }
}

/**
 * Create a new builder store using Zustand for React
 * @param initialState - Initial state
 */
function createBuilderStore(initialState: BuilderState) {
  return create<BuilderState>(() => initialState);
}

/**
 * Create a new buddy instance
 * @param initialState - Initial state
 */
export function useBuddy(initialState: CreateBuilderParams["initialState"]) {
  const [buddy] = React.useState(() => {
    return createBuilder({ storeBuilder: createBuilderStore, initialState });
  });

  return buddy;
}

/**
 * Provider for the buddy instance
 * Pass the buddy instance to the context
 */
export const BuddyProvider = React.createContext<Builder | null>(null);

/**
 * Use the buddy context
 */
export function useBuddyInstance() {
  const buddy = React.use(BuddyProvider);
  if (!buddy) {
    throw new Error("Buddy context not found");
  }
  return buddy;
}

/**
 * Use the builder state
 * ---
 * This hook is used to get the builder state
 * @param selector - Selector function
 */
export function useBuddyStore<S>(
  selector: (state: BuilderState, builder: Builder) => S,
) {
  const buddy = useBuddyInstance();
  return buddy.store(
    useShallow(
      useCallback(
        (state) => {
          return selector(state, buddy);
        },
        [buddy, selector],
      ),
    ),
  );
}
