var Persistent = /** @class */ (function () {
    /**
     * Create persistent storage. This class is a wrapper around the
     * [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
     * @param key The key used to access the stored value.
     * @param value The value being stored.
     */
    function Persistent(key, value) {
        this.key = key;
        this.value = value;
        localStorage.setItem(key, JSON.stringify(value));
    }
    /**
     * Retrieve all data set using this class.
     * @returns The data from localStorage.
     */
    Persistent.prototype.get = function () {
        return JSON.parse(localStorage.getItem(this.key));
    };
    /**
     * Save new data to localStorage.
     * @param data The data to save to localStorage.
     */
    Persistent.prototype.set = function (data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    };
    /**
     * Remove all data set using this class.
     */
    Persistent.prototype.remove = function () {
        localStorage.removeItem(this.key);
    };
    return Persistent;
}());
export { Persistent };
var Session = /** @class */ (function () {
    function Session(key, value) {
        this.key = key;
        this.value = value;
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    /**
     * Retrieve all data set using this class.
     * @returns The data from sessionStorage.
     */
    Session.prototype.get = function () {
        return JSON.parse(sessionStorage.getItem(this.key));
    };
    /**
     * Save new data to sessionStorage.
     * @param data The data to save to sessionStorage.
     */
    Session.prototype.set = function (data) {
        sessionStorage.setItem(this.key, JSON.stringify(data));
    };
    /**
     * Remove all data set using this class.
     */
    Session.prototype.remove = function () {
        sessionStorage.removeItem(this.key);
    };
    return Session;
}());
export { Session };
