/**
 * Recursively find an item in an array and act on it.
 * @example
 * ```ts
 * const arr = [
 *  { id: 1, children: [{ id: 2 }, { id: 3 }] },
 *  { id: 4, children: [{ id: 5 }, { id: 6 }] },
 *  { id: 7, children: [{ id: 8 }, { id: 9 }] },
 *  { id: 10, children: [{ id: 11 }, { id: 12 }] },
 * ];
 *
 * findAndAct(arr, (item) => item.id === 5, (item) => console.log(item));
 * // Output: { id: 5 }
 * ```
 * @param arr
 * @param predicate
 * @param action
 * @param getChildren
 */
export function findAndAct<T extends Array<unknown>>(
  arr: T,
  predicate: (item: T[number]) => boolean,
  action: (item: T[number]) => void,
  getChildren?: (item: T[number]) => T | undefined,
) {
  for (const item of arr) {
    if (predicate(item)) {
      action(item);
      return;
    }

    const children = getChildren?.(item);
    if (children) {
      findAndAct(children, predicate, action, getChildren);
    }
  }
}

/**
 * Recursively find an item in an array.
 * @example
 * ```ts
 * const arr = [
 *  { id: 1, children: [{ id: 2 }, { id: 3 }] },
 *  { id: 4, children: [{ id: 5 }, { id: 6 }] },
 *  { id: 7, children: [{ id: 8 }, { id: 9 }] },
 *  { id: 10, children: [{ id: 11 }, { id: 12 }] },
 * ];
 *
 * const item = deepFind(arr, (item) => item.id === 5, (item) => item.children);
 * console.log(item);
 * // Output: { id: 5 }
 * ```
 * @param arr
 * @param predicate
 * @param getChildren
 */
export function deepFind<T extends Array<unknown>>(
  arr: T,
  predicate: (item: T[number]) => boolean,
  getChildren?: (item: T[number]) => T | undefined,
): T[number] | undefined {
  for (const item of arr) {
    if (predicate(item)) {
      return item;
    }

    const children = getChildren?.(item);
    if (children) {
      const found = deepFind(children, predicate, getChildren);
      if (found) {
        return found;
      }
    }
  }
}
