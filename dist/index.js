"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create persistent or temporary client-side storage with a portable,
 * type-safe wrapper around the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).
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
function storeBuddy(key, session) {
    if (session === void 0) { session = false; }
    return {
        init: function (data) {
            var sessionOrLocal = session ? sessionStorage : localStorage;
            if (!sessionOrLocal.getItem(key)) {
                sessionOrLocal.setItem(key, JSON.stringify(data));
            }
            return {
                load: function () {
                    var data = session
                        ? JSON.parse(sessionStorage.getItem(key))
                        : JSON.parse(localStorage.getItem(key));
                    if (!data) {
                        throw new Error('store-buddy: data has not been set or cannot be recognised');
                    }
                    return data;
                },
                save: function (data) {
                    session
                        ? sessionStorage.setItem(key, JSON.stringify(data))
                        : localStorage.setItem(key, JSON.stringify(data));
                },
                clear: function () {
                    session
                        ? sessionStorage.removeItem(key)
                        : localStorage.removeItem(key);
                }
            };
        }
    };
}
exports.default = storeBuddy;
