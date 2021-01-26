declare type IsEmptyObject<O> = O extends {
    [key: string]: never;
} ? object : O;
declare abstract class StoreBuddy<T> {
    protected key: string;
    protected value: IsEmptyObject<T>;
    constructor(key: string, value: IsEmptyObject<T>);
    get(): IsEmptyObject<T>;
    set(data: IsEmptyObject<T>): void;
    remove(): void;
    static exists(key: string): boolean;
}
export declare class Persistent<T> extends StoreBuddy<T> {
    /**
     * Create persistent storage. This class is a wrapper around the
     * [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
     * @param key The key used to access the stored value.
     * @param value The value being stored.
     * @example
     *
     * ```
     * import sb from "store-buddy";
     *
     * const storage = new sb.Persistent("foo", "bar");
     * ```
     */
    constructor(key: string, value: IsEmptyObject<T>);
    /**
     * Retrieve data set using this instance.
     * @returns The data from localStorage. If no data exists, returns `null`.
     * @example
     *
     * ```
     * import sb from "store-buddy";
     *
     * const storage1 = new sb.Persistent("foo1", "bar");
     * storage1.get(); // returns "bar", return type is string
     *
     * const storage2 = new sb.Persistent("foo2", 123);
     * storage2.get(); // returns 123, return type is number
     * ```
     */
    get(): IsEmptyObject<T>;
    /**
     * Overwrite old data in localStorage. For TS developers, it prevents
     * overwriting the old data with new data of a _different_ type.
     * @param data The data to save to localStorage.
     * @example
     *
     * ```
     * import sb from "store-buddy";
     *
     * const storage1 = new sb.Persistent("foo1", "bar"); // note how data type is string
     * storage1.set("baz"); // data is overwritten with another string with no issue
     * storage1.set(123); // this produces an error, since a number is not expected
     * ```
     */
    set(data: IsEmptyObject<T>): void;
    /**
     * Remove all data set using this instance.
     * @example
     *
     * ```
     * import sb from "store-buddy";
     *
     * const storage = new sb.Persistent("foo", "bar");
     * storage.get(); // returns "bar"
     * storage.remove();
     * storage.get(); // returns null
     * ```
     */
    remove(): void;
    /**
     * Check if data exists in localStorage with the specified key.
     * @param key The key of the data whose existence is checked.
     * @returns `true` if the data exists, `false` if not.
     * @example
     *
     * ```
     * import sb from "store-buddy";
     *
     * sb.Persistent.exists("foo"); // returns false
     * new sb.Persistent("foo", "bar");
     * sb.Persistent.exists("foo"); // returns true
     * ```
     */
    static exists(key: string): boolean;
}
export declare class Session<T> extends StoreBuddy<T> {
    /**
     * Create temporary storage, limited to a single user session. This class is
     * a wrapper around the [sessionStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).
     * @param key The key used to access the stored value.
     * @param value The value being stored.
     * @example
     *
     * ```
     * import sb from "store-buddy";
     *
     * const storage = new sb.Session("foo", "bar");
     * ```
     */
    constructor(key: string, value: IsEmptyObject<T>);
    /**
     * Retrieve data set using this instance.
     * @returns The data from sessionStorage. If no data exists, returns `null`.
     * @example
     *
     * ```
     * import sb from "store-buddy";
     *
     * const storage1 = new sb.Session("foo1", "bar");
     * storage1.get(); // returns "bar", return type is string
     *
     * const storage2 = new sb.Session("foo2", 123);
     * storage2.get(); // returns 123, return type is number
     * ```
     */
    get(): IsEmptyObject<T>;
    /**
     * Overwrite old data in sessionStorage. For TS developers, it prevents
     * overwriting the old data with new data of a _different_ type.
     * @param data The data to save to sessionStorage.
     * @example
     *
     * ```
     * import sb from "store-buddy";
     *
     * const storage1 = new sb.Session("foo1", "bar"); // note how data type is string
     * storage1.set("baz"); // data is overwritten with another string with no issue
     * storage1.set(123); // this produces an error, since a number is not expected
     * ```
     */
    set(data: IsEmptyObject<T>): void;
    /**
     * Remove all data set using this instance.
     * @example
     *
     * ```
     * import sb from "store-buddy";
     *
     * const storage = new sb.Session("foo", "bar");
     * storage.get(); // returns "bar"
     * storage.remove();
     * storage.get(); // returns null
     * ```
     */
    remove(): void;
    /**
     * Check if data exists in sessionStorage with the specified key.
     * @param key The key of the data whose existence is checked.
     * @returns `true` if the data exists, `false` if not.
     * @example
     *
     * ```
     * import sb from "store-buddy";
     *
     * sb.Session.exists("foo"); // returns false
     * new sb.Session("foo", "bar");
     * sb.Session.exists("foo"); // returns true
     * ```
     */
    static exists(key: string): boolean;
}
declare const _default: {
    Persistent: typeof Persistent;
    Session: typeof Session;
};
export default _default;
