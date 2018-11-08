var cache = {
    setItem: function(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: function(key) {
        return JSON.parse(window.localStorage.getItem(key));
    },
    removeItem: function(key) {
        window.localStorage.removeItem(key);
    }
};

module.exports = cache;