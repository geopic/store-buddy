declare module 'store-buddy' {
  export class Persistent<T> {
    protected key: string;
    protected value: T;
    /**
     * Create persistent storage. This class is a wrapper around the
     * [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
     * @param key The key used to access the stored value.
     * @param value The value being stored.
     */
    constructor(key: string, value: T);
    /**
     * Retrieve all data set using this class.
     * @returns The data from localStorage.
     */
    get(): T;
    /**
     * Save new data to localStorage.
     * @param data The data to save to localStorage.
     */
    set(data: object & T): void;
    /**
     * Remove all data set using this class.
     */
    remove(): void;
  }
  export class Session<T extends object> {
    protected key: string;
    protected value: T;
    constructor(key: string, value: T);
    /**
     * Retrieve all data set using this class.
     * @returns The data from sessionStorage.
     */
    get(): T;
    /**
     * Save new data to sessionStorage.
     * @param data The data to save to sessionStorage.
     */
    set(data: T): void;
    /**
     * Remove all data set using this class.
     */
    remove(): void;
  }
}
