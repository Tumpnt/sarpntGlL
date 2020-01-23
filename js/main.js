define('main', ['mouse', 'keyboard', 'game'], function (Mouse, Keyboard, Game) {
    Mouse.Create();
    Keyboard.Create();

    window.game = new Game();
    window.game.start();
});