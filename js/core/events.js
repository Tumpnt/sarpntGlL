define('event-hander', [], function() {
    class EventHandler {
        constructor() {
            this.listeners = {};
        }

        addEventListener(type, callback) {
            if (!(type in this.listeners)) {
                this.listeners[type] = [];
            }
            this.listeners[type].push(callback);
        }
        removeEventListener
    }
});