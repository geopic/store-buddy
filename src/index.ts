abstract class StoreBuddy<T> {
  protected key: string;
  protected value: T;

  constructor(key: string, value: T) {
    this.key = key;
    this.value = value;
  }

  get(): T {
    return this.value;
  }

  set<U extends T>(data: T | U): void {
    data;
  }

  remove(): void {}
}

export class Persistent<T> extends StoreBuddy<T> {
  /**
   * Create persistent storage. This class is a wrapper around the
   * [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
   * @param key The key used to access the stored value.
   * @param value The value being stored.
   */
  constructor(key: string, value: T) {
    super(key, value);

    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Retrieve data set using this instance.
   * @returns The data from localStorage.
   */
  get(): T {
    return JSON.parse(localStorage.getItem(this.key) as string);
  }

  /**
   * Overwrite old data in localStorage with new data of the same type.
   * @param data The data to save to localStorage.
   */
  set<U extends T>(data: T | U): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  /**
   * Remove all data set using this instance.
   */
  remove(): void {
    localStorage.removeItem(this.key);
  }
}

export class Session<T> extends StoreBuddy<T> {
  /**
   * Create temporary storage, limited to a single user session. This class is
   * a wrapper around the [sessionStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).
   * @param key The key used to access the stored value.
   * @param value The value being stored.
   */
  constructor(key: string, value: T) {
    super(key, value);

    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Retrieve data set using this instance.
   * @returns The data from sessionStorage.
   */
  get(): T {
    return JSON.parse(sessionStorage.getItem(this.key) as string);
  }

  /**
   * Overwrite old data in sessionStorage with new data of the same type.
   * @param data The data to save to sessionStorage.
   */
  set<U extends T>(data: T | U): void {
    sessionStorage.setItem(this.key, JSON.stringify(data));
  }

  /**
   * Remove all data set using this instance.
   */
  remove(): void {
    sessionStorage.removeItem(this.key);
  }
}
