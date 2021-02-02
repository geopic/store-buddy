type IsEmptyObject<O> = O extends { [key: string]: never } ? object : O;

interface StoreBuddy<T> {
  /**
   * Retrieve data set using this instance.
   * @returns The data from localStorage or sessionStorage, or `null` if no
   * data has been set.
   * @example
   *
   * ```
   * import storeBuddy from "store-buddy";
   *
   * const storage1 = storeBuddy("foo");
   * storage1.load(); // returns null
   *
   * const storage2 = storeBuddy("foo").save("bar");
   * storage2.load(); // returns "bar"
   * ```
   */
  load(): IsEmptyObject<T> | null;

  /**
   * Set new data or overwrite old data in localStorage or sessionStorage. For
   * TS developers, saving data of a _different_ type to the one specified in
   * the type parameter is prevented.
   * @param data The data to save to localStorage.
   * @example
   *
   * ```
   * import storeBuddy from "store-buddy";
   *
   * // Saves the string "bar" to the localStorage entry with the key "foo"
   * const storage1 = storeBuddy("foo").save("bar");
   *
   * // Overwrites that same string with different data. Note that, without
   * // specifying a specific type when initialising, there is no type safety
   * // provided for TypeScript developers
   * storage1.save("baz");
   * storage1.save(123);
   *
   * // This is type-safe...
   * const storage2 = storeBuddy<number>("foo").save(123);
   *
   * // ...so this works...
   * storage2.save(456);
   *
   * // ...and this does not work :)
   * storage2.save("I am not a number");
   * ```
   */
  save(data: IsEmptyObject<T>): this;

  /**
   * Remove all data set using this instance.
   * @example
   *
   * ```
   * import storeBuddy from "store-buddy";
   *
   * const storage = storeBuddy("foo").save("bar");
   * storage.load(); // returns "bar"
   * storage.clear();
   * storage.load(); // returns null
   * ```
   */
  clear(): void;
}

/**
 * Create persistent or temporary client-side storage with a portable,
 * type-safe wrapper around the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).
 * @param key The key used to access the stored value.
 * @param [session] Save data in sessionStorage (`true`) or in localStorage
 * (`false`). Default is `false`.
 * @example
 *
 * ```
 * import storeBuddy from "store-buddy";
 *
 * // "foo" is the key used to access the stored value, which is created in the
 * // method `save()`
 * const storage1 = storeBuddy("foo").save("bar");
 *
 * // Using sessionStorage instead of localStorage is possible by specifying
 * // `true` in the `session` parameter
 * const storage2 = storeBuddy("foo", true).save("bar");
 *
 * // Type safety can be enabled by providing an argument to the type parameter
 * type Data = {
 *   hello: string;
 *   world: number;
 * }
 *
 * const storage3 = storeBuddy<Data>("foo").save({
 *   hello: "foo",
 *   world: 123
 * })
 * ```
 */
export default function storeBuddy<T>(
  key: string,
  session: boolean = false
): StoreBuddy<T> {
  return {
    load() {
      return session
        ? JSON.parse(sessionStorage.getItem(key) as string)
        : JSON.parse(localStorage.getItem(key) as string);
    },
    save(data: IsEmptyObject<T>) {
      session
        ? sessionStorage.setItem(key, JSON.stringify(data))
        : localStorage.setItem(key, JSON.stringify(data));
      return this;
    },
    clear() {
      session ? sessionStorage.removeItem(key) : localStorage.removeItem(key);
    }
  };
}
