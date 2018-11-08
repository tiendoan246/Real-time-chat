var cache = {
    setItem: function(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: function(key) {
        return window.localStorage.getItem(key);
    }
};

export default cache;