define('scene-renderer', [], function() {
    class SceneRenderer {
        constructor(gl) {
            this.shaders = {};
            this.textures = {};
            this.meshes = {};
        }

        render(rendrer) {}

        createShader(name) {
            if (this.shaders[name] != undefined) return;
            var shader = new Shader(this.gl);
            this.shaders[name] = shader;
            return shader;
        }

        createMesh(verticies, indices, texCoords, normals) {
            if (this.meshes[name] != undefined) return;
            var mesh = new Mesh(this.gl, verticies, indices, texCoords, normals);
            this.meshes[name] = mesh;
            return mesh;
        }

        createTexture(url) {
            if (this.textures[name] != undefined) return;
            var texture = new Texture(this.gl, url);
            this.textures[name] = texture;
            return texture;
        }
    }

    return SceneRenderer;
});