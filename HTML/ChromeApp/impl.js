'use strict';

define('oplop/impl', [], function() {
    // Required by jQuery Mobile, an error for Chrome packaged apps in M43.
    history.replaceState = function() {};

    var exports = {};

    exports.clipboardWrite = function() {
        return document.execCommand('copy');
    }

    exports.getStorage = function(key, callback) {
        chrome.storage.sync.get(key, callback);
    }

    exports.setStorage = function(key, value) {
        var items = {};
        items[key] = value;
        chrome.storage.sync.set(items);
    }

    exports.removeStorage = function(key) {
        chrome.storage.sync.remove(key);
}

return exports;
});
