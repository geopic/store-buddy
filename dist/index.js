"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = exports.Persistent = void 0;
var tslib_1 = require("tslib");
var StoreBuddy = /** @class */ (function () {
    function StoreBuddy(key, value) {
        this.key = key;
        this.value = value;
    }
    StoreBuddy.prototype.get = function () {
        return this.value;
    };
    StoreBuddy.prototype.set = function (data) {
        data;
    };
    StoreBuddy.prototype.remove = function () { };
    StoreBuddy.exists = function (key) {
        key;
        return false;
    };
    return StoreBuddy;
}());
var Persistent = /** @class */ (function (_super) {
    tslib_1.__extends(Persistent, _super);
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
     * import sb from "store-buddy";
     *
     * const storage1 = new sb.Persistent("foo1", "bar");
     * storage1.get(); // returns "bar", return type is string
     *
     * const storage2 = new sb.Persistent("foo2", 123);
     * storage2.get(); // returns 123, return type is number
     * ```
     */
    Persistent.prototype.get = function () {
        return JSON.parse(localStorage.getItem(this.key));
    };
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
    Persistent.prototype.set = function (data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    };
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
    Persistent.prototype.remove = function () {
        localStorage.removeItem(this.key);
    };
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
    Persistent.exists = function (key) {
        return Boolean(localStorage.getItem(key));
    };
    return Persistent;
}(StoreBuddy));
exports.Persistent = Persistent;
var Session = /** @class */ (function (_super) {
    tslib_1.__extends(Session, _super);
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
     * import sb from "store-buddy";
     *
     * const storage1 = new sb.Session("foo1", "bar");
     * storage1.get(); // returns "bar", return type is string
     *
     * const storage2 = new sb.Session("foo2", 123);
     * storage2.get(); // returns 123, return type is number
     * ```
     */
    Session.prototype.get = function () {
        return JSON.parse(sessionStorage.getItem(this.key));
    };
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
    Session.prototype.set = function (data) {
        sessionStorage.setItem(this.key, JSON.stringify(data));
    };
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
    Session.prototype.remove = function () {
        sessionStorage.removeItem(this.key);
    };
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
    Session.exists = function (key) {
        return Boolean(sessionStorage.getItem(key));
    };
    return Session;
}(StoreBuddy));
exports.Session = Session;
exports.default = {
    Persistent: Persistent,
    Session: Session
};
