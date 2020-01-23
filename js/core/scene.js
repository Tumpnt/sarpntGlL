define('scene', ['game-object', 'scene-renderer'], function(GameObject, SceneRenderer) {
    class Scene {
        constructor(sceneRenderer) {
            this.gameobjects = [];
            this.sceneRenderer = sceneRenderer;
        }
        update(dt, input) {

        }

        createGameObject() {
            var gameobject = new GameObject();
            gameObjects.add(result);
            gameobject.addedToScene(scene);
        }
    }
});