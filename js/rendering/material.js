define("material", ['shader', 'texture'], function (Shader, Texture) {
    class Material {
        constructor(shader,texture) {
            this.shader = shader;
            this.texture = texture;
        }

        applyTo(gl, mesh) {
            //mesh
            mesh.bindBufferToAttrib("vertexBuffer", this.shader.getAttribLocation("aPos"), 3);
            this.shader.enableAttrib("aPos");
            mesh.bindBufferToAttrib("texCoordBuffer", this.shader.getAttribLocation("aTexCoord"), 2);
            this.shader.enableAttrib("aTexCoord");
            mesh.bindBufferToAttrib("normalBuffer", this.shader.getAttribLocation("aNormal"),3);
            this.shader.enableAttrib("aNormal");

            mesh.bindBuffer('vertexBuffer');
            mesh.bindBuffer('indexBuffer', gl.ELEMENT_ARRAY_BUFFER);

            //shader
            this.shader.use();

            //texture
            this.texture.apply();
            this.shader.setUniform('texSampler', 1, 0);
        }
    }
    return Material;
});