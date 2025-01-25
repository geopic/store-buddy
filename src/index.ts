type IsEmptyObject<O> = O extends { [key: string]: never } ? object : O;

interface StoreBuddyInit<T> {
  /**
   * Initialise the storeBuddy instance with 'default' (first-load) data. This
   * behaves in the same way as the `save` method in the main `StoreBuddy`
   * interface but doesn't save any data if the storage entry already exists
   * (to prevent new data being overwritten by its older, default form).
   * @param data The data to save to localStorage or sessionStorage.
   * @returns The main `StoreBuddy` interface with methods like `load`, etc.
   * @example
   *
   * ```ts
   * import storeBuddy from "store-buddy";
   *
   * // The "foo" entry is initialised with the default data "bar"
   * const storage1 = storeBuddy("foo").init("bar");
   *
   * // The "hello" entry is initialised with a default object literal
   * const storage2 = storeBuddy("hello").init({ prop1: "world", prop2: false });
   * ```
   */
  init(data: IsEmptyObject<T>): StoreBuddy<T>;
}

interface StoreBuddy<T> {
  /**
   * Retrieve the current data set using this instance.
   * @returns The data from localStorage or sessionStorage, throwing an error
   * if no data is found.
   * @example
   *
   * ```ts
   * import storeBuddy from "store-buddy";
   *
   * const storage1 = storeBuddy("foo").init("bar");
   * storage1.load(); // returns "bar"
   * ```
   */
  load(): IsEmptyObject<T>;

  /**
   * Set new data or overwrite old data in localStorage or sessionStorage. For
   * TS developers, saving data of a _different_ type to the one specified in
   * the type parameter is prevented.
   * @param data The data to save to localStorage or sessionStorage.
   * @example
   *
   * ```ts
   * import storeBuddy from "store-buddy";
   *
   * // Saves the string "bar" to the localStorage entry with the key "foo"
   * const storage1 = storeBuddy("foo").init("bar");
   *
   * // Overwrites that same string with different data. Note that, without
   * // specifying a specific type when initialising, there is no type safety
   * // provided for TypeScript developers
   * storage1.save("baz");
   * storage1.save(123);
   *
   * // This is type-safe...
   * const storage2 = storeBuddy<number>("foo").init(123);
   *
   * // ...so this works...
   * storage2.save(456);
   *
   * // ...and this does not work :)
   * storage2.save("I am not a number");
   * ```
   */
  save(data: IsEmptyObject<T>): void;

  /**
   * Reset the data back to its original value set with the `init` method.
   * @example
   *
   * ```ts
   * import storeBuddy from "store-buddy";
   *
   * const storage = storeBuddy("foo").init("bar");
   * storage.save("hello");
   * storage.reset();
   * storage.load(); // returns "bar"
   * ```
   */
  reset(): void;

  /**
   * Remove all data set using this instance.
   * @example
   *
   * ```ts
   * import storeBuddy from "store-buddy";
   *
   * const storage = storeBuddy("foo").init("bar");
   * storage.load(); // returns "bar"
   * storage.clear();
   * storage.load(); // throws an error (no data exists)
   * ```
   */
  clear(): void;
}

/**
 * Create (or access) persistent or temporary client-side storage with a portable,
 * type-safe wrapper around the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).
 * If data already exists at the specified key then it is *not* overwritten.
 * @param key The key used to access the stored value.
 * @param [session] Save data in sessionStorage (`true`) or in localStorage
 * (`false`). Default is `false`.
 * @example
 *
 * ```ts
 * import storeBuddy from "store-buddy";
 *
 * // "foo" is the key used to access the stored value, which is created in the
 * // method `init`
 * const storage1 = storeBuddy("foo").init("bar");
 *
 * // Using sessionStorage instead of localStorage is possible by specifying
 * // `true` in the `session` parameter
 * const storage2 = storeBuddy("foo", true).init("bar");
 *
 * // Type safety can be enabled by providing an argument to the type parameter
 * type Data = {
 *   hello: string;
 *   world: number;
 * }
 *
 * const storage3 = storeBuddy<Data>("foo").init({
 *   hello: "foo",
 *   world: 123
 * })
 * ```
 */
export default function storeBuddy<T>(
  key: string,
  session: boolean = false
): StoreBuddyInit<T> {
  return {
    init(initialData: IsEmptyObject<T>): StoreBuddy<T> {
      const sessionOrLocal = session ? sessionStorage : localStorage;

      if (!sessionOrLocal.getItem(key)) {
        sessionOrLocal.setItem(key, JSON.stringify(initialData));
      }

      return {
        load() {
          const data = JSON.parse(sessionOrLocal.getItem(key) as string);

          if (!data) {
            throw new Error(
              'store-buddy: data has not been set or cannot be recognised'
            );
          }

          return data;
        },
        save(data: IsEmptyObject<T>) {
          sessionOrLocal.setItem(key, JSON.stringify(data));
        },
        reset() {
          sessionOrLocal.setItem(key, JSON.stringify(initialData));
        },
        clear() {
          sessionOrLocal.removeItem(key);
        }
      };
    }
  };
}
