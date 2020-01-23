define('game-object', [], function () {
    class GameObject {
        constructor() {
            this.components = [];
        }

        addComponent(component) {
            this.components.push(component);
            component.addedToGameObject(gameObject);
        }

        addedToScene(scene) {
            this.scene = scene;
        }


    }
});