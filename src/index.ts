export class Persistent<T> {
  protected key: string;
  protected value: T;

  /**
   * Create persistent storage. This class is a wrapper around the
   * [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
   * @param key The key used to access the stored value.
   * @param value The value being stored.
   */
  constructor(key: string, value: T) {
    this.key = key;
    this.value = value;

    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Retrieve all data set using this class.
   * @returns The data from localStorage.
   */
  get(): T {
    return JSON.parse(localStorage.getItem(this.key) as string);
  }

  /**
   * Save new data to localStorage.
   * @param data The data to save to localStorage.
   */
  set(data: object & T): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  /**
   * Remove all data set using this class.
   */
  remove(): void {
    localStorage.removeItem(this.key);
  }
}

export class Session<T extends object> {
  protected key: string;
  protected value: T;

  constructor(key: string, value: T) {
    this.key = key;
    this.value = value;

    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Retrieve all data set using this class.
   * @returns The data from sessionStorage.
   */
  get(): T {
    return JSON.parse(sessionStorage.getItem(this.key) as string);
  }

  /**
   * Save new data to sessionStorage.
   * @param data The data to save to sessionStorage.
   */
  set(data: T): void {
    sessionStorage.setItem(this.key, JSON.stringify(data));
  }

  /**
   * Remove all data set using this class.
   */
  remove(): void {
    sessionStorage.removeItem(this.key);
  }
}
