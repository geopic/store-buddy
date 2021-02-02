type IsEmptyObject<O> = O extends { [key: string]: never } ? object : O;

abstract class StoreBuddy<T> {
  protected key: string;
  protected value: IsEmptyObject<T>;

  constructor(key: string, value: IsEmptyObject<T>) {
    this.key = key;
    this.value = value;
  }

  load(): IsEmptyObject<T> {
    return this.value;
  }

  save(data: IsEmptyObject<T>): void {
    data;
  }

  clear(): void {}
}

class Persistent<T> extends StoreBuddy<T> {
  /**
   * Create persistent storage. This class is a wrapper around the
   * [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
   * @param key The key used to access the stored value.
   * @param value The value being stored.
   */
  constructor(key: string, value: IsEmptyObject<T>) {
    super(key, value);

    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Retrieve data set using this instance.
   * @returns The data from localStorage. If no data exists, returns `null`.
   * @example
   *
   * ```
   * import storeBuddy from "store-buddy";
   *
   * const storage1 = storeBuddy("foo1", "bar");
   * storage1.load(); // returns "bar", return type is string
   *
   * const storage2 = storeBuddy("foo2", 123);
   * storage2.load(); // returns 123, return type is number
   * ```
   */
  load(): IsEmptyObject<T> {
    return JSON.parse(localStorage.getItem(this.key) as string);
  }

  /**
   * Overwrite old data in localStorage. For TS developers, it prevents
   * overwriting the old data with new data of a _different_ type.
   * @param data The data to save to localStorage.
   * @example
   *
   * ```
   * import storeBuddy from "store-buddy";
   *
   * const storage1 = storeBuddy("foo1", "bar"); // note how data type is string
   * storage1.save("baz"); // data is overwritten with another string with no issue
   * storage1.save(123); // this produces an error, since a number is not expected
   * ```
   */
  save(data: IsEmptyObject<T>): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  /**
   * Remove all data set using this instance.
   * @example
   *
   * ```
   * import storeBuddy from "store-buddy";
   *
   * const storage = storeBuddy("foo", "bar");
   * storage.load(); // returns "bar"
   * storage.clear();
   * storage.load(); // returns null
   * ```
   */
  clear(): void {
    localStorage.removeItem(this.key);
  }
}

class Session<T> extends StoreBuddy<T> {
  /**
   * Create temporary storage, limited to a single user session. This class is
   * a wrapper around the [sessionStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).
   * @param key The key used to access the stored value.
   * @param value The value being stored.
   */
  constructor(key: string, value: IsEmptyObject<T>) {
    super(key, value);

    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Retrieve data set using this instance.
   * @returns The data from sessionStorage. If no data exists, returns `null`.
   * @example
   *
   * ```
   * import storeBuddy from "store-buddy";
   *
   * const storage1 = storeBuddy("foo1", "bar", true);
   * storage1.load(); // returns "bar", return type is string
   *
   * const storage2 = storeBuddy("foo2", 123, true);
   * storage2.load(); // returns 123, return type is number
   * ```
   */
  load(): IsEmptyObject<T> {
    return JSON.parse(sessionStorage.getItem(this.key) as string);
  }

  /**
   * Overwrite old data in sessionStorage. For TS developers, it prevents
   * overwriting the old data with new data of a _different_ type.
   * @param data The data to save to sessionStorage.
   * @example
   *
   * ```
   * import storeBuddy from "store-buddy";
   *
   * const storage1 = storeBuddy("foo1", "bar", true); // note how data type is string
   * storage1.save("baz"); // data is overwritten with another string with no issue
   * storage1.save(123); // this produces an error, since a number is not expected
   * ```
   */
  save(data: IsEmptyObject<T>): void {
    sessionStorage.setItem(this.key, JSON.stringify(data));
  }

  /**
   * Remove all data set using this instance.
   * @example
   *
   * ```
   * import storeBuddy from "store-buddy";
   *
   * const storage = storeBuddy("foo", "bar");
   * storage.load(); // returns "bar"
   * storage.clear();
   * storage.load(); // returns null
   * ```
   */
  clear(): void {
    sessionStorage.removeItem(this.key);
  }
}

/**
 * Create persistent or temporary client-side storage with a portable,
 * type-safe wrapper around the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).
 * @param key The key used to access the stored value.
 * @param value The value being stored.
 * @param [session] Save data in sessionStorage (`true`) or in localStorage
 * (`false`). Default is `false`.
 */
export default function storeBuddy<T>(
  key: string,
  value: IsEmptyObject<T>,
  session: boolean = false
): StoreBuddy<T> {
  if (session) {
    return new Session(key, value);
  } else {
    return new Persistent(key, value);
  }
}
