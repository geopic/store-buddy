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
     * @returns The data from localStorage.
     */
    Persistent.prototype.get = function () {
        return JSON.parse(localStorage.getItem(this.key));
    };
    /**
     * Overwrite old data in localStorage with new data of the same type.
     * @param data The data to save to localStorage.
     */
    Persistent.prototype.set = function (data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    };
    /**
     * Remove all data set using this instance.
     */
    Persistent.prototype.remove = function () {
        localStorage.removeItem(this.key);
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
     */
    function Session(key, value) {
        var _this = _super.call(this, key, value) || this;
        sessionStorage.setItem(key, JSON.stringify(value));
        return _this;
    }
    /**
     * Retrieve data set using this instance.
     * @returns The data from sessionStorage.
     */
    Session.prototype.get = function () {
        return JSON.parse(sessionStorage.getItem(this.key));
    };
    /**
     * Overwrite old data in sessionStorage with new data of the same type.
     * @param data The data to save to sessionStorage.
     */
    Session.prototype.set = function (data) {
        sessionStorage.setItem(this.key, JSON.stringify(data));
    };
    /**
     * Remove all data set using this instance.
     */
    Session.prototype.remove = function () {
        sessionStorage.removeItem(this.key);
    };
    return Session;
}(StoreBuddy));
exports.Session = Session;
