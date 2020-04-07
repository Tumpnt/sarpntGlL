requirejs.config({
    baseUrl: 'js',
    paths: {
        'gl-matrix': '../lib/gl-matrix-min',
        'main': 'main',

        //Core
        'game': 'core/game',
        'time': 'core/time',
        'scene': 'core/scene',
        'game-object': 'core/game-object',

        //Rendering
        'material': 'rendering/material',
        'mesh': 'rendering/mesh',
        'renderer': 'rendering/renderer',
        'shader': 'rendering/shader',
        'texture': 'rendering/texture',

        //Renderers
        'mesh-renderer': 'renderers/mesh-renderer',
        'scene-renderer': 'renderers/scene-renderer',

        //Input
        'input': 'input/input',
        'keyboard': 'input/keyboard',
        'mouse': 'input/mouse'

    }
});
require(['main']);
