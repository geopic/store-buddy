"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var StoreBuddy = /** @class */ (function () {
    function StoreBuddy(key, value) {
        this.key = key;
        this.value = value;
    }
    StoreBuddy.prototype.load = function () {
        return this.value;
    };
    StoreBuddy.prototype.save = function (data) {
        data;
    };
    StoreBuddy.prototype.clear = function () { };
    return StoreBuddy;
}());
var Persistent = /** @class */ (function (_super) {
    tslib_1.__extends(Persistent, _super);
    /**
     * Create persistent storage. This class is a wrapper around the
     * [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
     * @param key The key used to access the stored value.
     * @param value The value being stored.
     */
    function Persistent(key, value) {
        var _this = _super.call(this, key, value) || this;
        localStorage.setItem(key, JSON.stringify(value));
        return _this;
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
    Persistent.prototype.load = function () {
        return JSON.parse(localStorage.getItem(this.key));
    };
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
    Persistent.prototype.save = function (data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    };
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
    Persistent.prototype.clear = function () {
        localStorage.removeItem(this.key);
    };
    return Persistent;
}(StoreBuddy));
var Session = /** @class */ (function (_super) {
    tslib_1.__extends(Session, _super);
    /**
     * Create temporary storage, limited to a single user session. This class is
     * a wrapper around the [sessionStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).
     * @param key The key used to access the stored value.
     * @param value The value being stored.
     */
    function Session(key, value) {
        var _this = _super.call(this, key, value) || this;
        sessionStorage.setItem(key, JSON.stringify(value));
        return _this;
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
    Session.prototype.load = function () {
        return JSON.parse(sessionStorage.getItem(this.key));
    };
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
    Session.prototype.save = function (data) {
        sessionStorage.setItem(this.key, JSON.stringify(data));
    };
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
    Session.prototype.clear = function () {
        sessionStorage.removeItem(this.key);
    };
    return Session;
}(StoreBuddy));
/**
 * Create persistent or temporary client-side storage with a portable,
 * type-safe wrapper around the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).
 * @param key The key used to access the stored value.
 * @param value The value being stored.
 * @param [session] Save data in sessionStorage (`true`) or in localStorage
 * (`false`). Default is `false`.
 */
function storeBuddy(key, value, session) {
    if (session === void 0) { session = false; }
    if (session) {
        return new Session(key, value);
    }
    else {
        return new Persistent(key, value);
    }
}
exports.default = storeBuddy;
