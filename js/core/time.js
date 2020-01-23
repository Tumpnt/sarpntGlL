define('time', [], function () {
    class Time {
        getTime() {
            return new Date().getTime() / 1000;
        }
        constructor() {
            this.last = this.getTime();
        }

        update() {
            this.now = this.getTime();
            this.dt = this.now - this.last;
            this.fps = 1 / this.dt;
            this.last = this.now;
        }
    }
    return Time;
});