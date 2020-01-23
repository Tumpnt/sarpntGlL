// class to serve as a base class to all behavoir scripts
class Behavior extends Component
{
}
class PlayerBehavior extends Behavior
{
    void update(float deltaTime, InputState input)
    {
        if (input.keyDown("left"))
        {
            this.gameObject.tranform.move(-1.0, 0.0);
        }
        // rest of player logic
        // ...
    }
}
class EnemyBehavior extends Behavior
{
    GameObject player;
    void init()
    { // searches the scene for an object named player
        player = this.scene.findObject("Player");
    }
    void update(float deltaTime, InputState input)
    {
        if (Vector2.distance(this.gameObject.transform.position, player.transform.position) < EnemySightRange)
        {
            // move towards player
        }
        // rest of player logic
        // ...
    }
}

class Renderer extends Component
{
    Mesh mesh;
    Materials[] materials;
    void render(sceneRenderer)
    {
        sceneRenderer.drawMesh(mesh, materials);
    }
}

class Transform extends Component
{
    Vector2 position;
    float rotation;
    float size;
}

class GameObject
{
    String name;
    Component[] components;
    Scene scene = null;
    GameObject()
    {
        // require a game object to have a transform
        this.addComponent(new Transform());
    }
    void addedToScene(Scene newScene)
    {
        scene = newScene;
    }
    void addComponent(component)
    {
        components.add(component);
        component.addedToGameObject(this);
    }
}

class Scene
{
    GameObjects[] gameObjects;
    EventDispatcher eventDispatcher;
    SceneRenderer sceneRenderer;
    void update(float timestep, InputState input)
    {
        eventDispatcher.sendEvent("update", timestep, input);
    }
    void render()
    {
        eventDispatcher.sentEvent("render", sceneRenderer);
    }
    void createGameObject()
    {
        GameObject result = new GameObject();
        gameObjects.add(result);
        result.addedToScene(this);
        // add any component in the gameObject to the eventDispatcher
        // so it can receive update and render messages
        // if the component doesn't have either method it isn't added
    }
}
