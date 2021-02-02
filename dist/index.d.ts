declare type IsEmptyObject<O> = O extends {
    [key: string]: never;
} ? object : O;
declare abstract class StoreBuddy<T> {
    protected key: string;
    protected value: IsEmptyObject<T>;
    constructor(key: string, value: IsEmptyObject<T>);
    load(): IsEmptyObject<T>;
    save(data: IsEmptyObject<T>): void;
    clear(): void;
}
/**
 * Create persistent or temporary client-side storage with a portable,
 * type-safe wrapper around the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).
 * @param key The key used to access the stored value.
 * @param value The value being stored.
 * @param [session] Save data in sessionStorage (`true`) or in localStorage
 * (`false`). Default is `false`.
 */
export default function storeBuddy<T>(key: string, value: IsEmptyObject<T>, session?: boolean): StoreBuddy<T>;
export {};
