define('game',['gl-matrix', 'time', 'shader', 'mesh', 'texture', 'material','input'], function (glMatrix, Time, Shader, Mesh, Texture, Material,Input) {
    class Game {
        constructor() {
            // Create Canvas
            var canvas = document.createElement('canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            document.body.appendChild(canvas);

            // Obtain Context
            var gl = canvas.getContext('webgl');
            if (gl === null) {
                alert("Unable to initialize WebGL. Your browser or machine may not support it.");
                return;
            }

            //Shaders
            const vsSource = `
            attribute vec4 aPos;
            attribute vec3 aNormal;
            attribute vec2 aTexCoord;

            uniform mat4 uNormalMat;
            uniform mat4 uModelMat;
            uniform mat4 uProjMat;

            varying highp vec2 vTexCoord;
            varying highp vec3 vLighting;

            void main(void) {
              gl_Position = uProjMat * uModelMat * aPos;
              vTexCoord = aTexCoord;

              // Apply lighting effect
              highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
              highp vec3 directionalLightColor = vec3(1, 1, 1);
              highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

              highp vec4 transformedNormal = uNormalMat * vec4(aNormal, 1.0);
              highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
              vLighting = ambientLight + (directionalLightColor * directional);
            }
          `;

            // Fragment shader program

            const fsSource = `
            precision mediump float;

            varying highp vec2 vTexCoord;
            varying highp vec3 vLighting;

            uniform sampler2D uTexSampler;

            void main(void) {
              highp vec4 texelColor = texture2D(uTexSampler, vTexCoord);
              gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
            }
          `;

            // Mesh
            var vertices = [
                // Front face
                -1.0, -1.0, 1.0,
                1.0, -1.0, 1.0,
                1.0, 1.0, 1.0,
                -1.0, 1.0, 1.0,

                // Back face
                -1.0, -1.0, -1.0,
                -1.0, 1.0, -1.0,
                1.0, 1.0, -1.0,
                1.0, -1.0, -1.0,

                // Top face
                -1.0, 1.0, -1.0,
                -1.0, 1.0, 1.0,
                1.0, 1.0, 1.0,
                1.0, 1.0, -1.0,

                // Bottom face
                -1.0, -1.0, -1.0,
                1.0, -1.0, -1.0,
                1.0, -1.0, 1.0,
                -1.0, -1.0, 1.0,

                // Right face
                1.0, -1.0, -1.0,
                1.0, 1.0, -1.0,
                1.0, 1.0, 1.0,
                1.0, -1.0, 1.0,

                // Left face
                -1.0, -1.0, -1.0,
                -1.0, -1.0, 1.0,
                -1.0, 1.0, 1.0,
                -1.0, 1.0, -1.0,
            ];

            const indices = [
                0, 1, 2, 0, 2, 3,    // front
                4, 5, 6, 4, 6, 7,    // back
                8, 9, 10, 8, 10, 11,   // top
                12, 13, 14, 12, 14, 15,   // bottom
                16, 17, 18, 16, 18, 19,   // right
                20, 21, 22, 20, 22, 23,   // left
            ];

            const textureCoords = [
                // Front
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
                // Back
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
                // Top
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
                // Bottom
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
                // Right
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
                // Left
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
            ];
            const vertexNormals = [
                // Front
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,

                // Back
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,

                // Top
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,

                // Bottom
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,

                // Right
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,

                // Left
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0
            ];

            this.gl = gl;

            //Time
            this.time = new Time();

            //Shaders
            var shader = new Shader(gl);
            shader.loadShader(gl.VERTEX_SHADER, vsSource);
            shader.loadShader(gl.FRAGMENT_SHADER, fsSource);
            shader.link(['aPos', 'aNormal', 'aTexCoord'], ['uNormalMat', 'uModelMat', 'uProjMat', 'uTexSampler']);

            //Mesh
            this.mesh = new Mesh(gl, vertices, indices, textureCoords, vertexNormals);
            this.cubeRotation = 0.0;

            //texture
            var texture = new Texture(gl, 'tg-star.png');

            //material
            this.material = new Material(shader, texture);
        }

        start() {
            var loop = () => {
                this.time.update();
                this.update(this.time.dt);
                requestAnimationFrame(loop);
            }
            requestAnimationFrame(loop);
        }

        update(dt) {
			Input.update();

            this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
            this.gl.clearDepth(1.0);
            this.gl.enable(this.gl.DEPTH_TEST);
            this.gl.depthFunc(this.gl.LEQUAL);

            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

            const fieldOfView = 45 * Math.PI / 180;   // in radians
            const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
            const zNear = 0.1;
            const zFar = 100.0;
            const projectionMatrix = glMatrix.mat4.create();

            glMatrix.mat4.perspective(projectionMatrix,
                fieldOfView,
                aspect,
                zNear,
                zFar);

            const modelViewMatrix = glMatrix.mat4.create();
            glMatrix.mat4.translate(modelViewMatrix,     // destination matrix
                modelViewMatrix,     // matrix to translate
                [-0.0, 0.0, -6.0]);  // amount to translate
            
            glMatrix.mat4.rotate(modelViewMatrix, modelViewMatrix, this.cubeRotation, [0, 0, 1]);
            glMatrix.mat4.rotate(modelViewMatrix, modelViewMatrix, this.cubeRotation *  2, [0, 1, 0]);
            glMatrix.mat4.rotate(modelViewMatrix, modelViewMatrix, this.cubeRotation *  3, [1, 0, 0]);

            const normalMatrix = glMatrix.mat4.create();
            glMatrix.mat4.invert(normalMatrix, modelViewMatrix);
            glMatrix.mat4.transpose(normalMatrix, normalMatrix);

            //Material
            this.material.applyTo(this.gl, this.mesh);

            
            this.material.shader.setUniformMatrix('uProjMat', 4, projectionMatrix);
            this.material.shader.setUniformMatrix('uModelMat', 4, modelViewMatrix);
            this.material.shader.setUniformMatrix('uNormalMat', 4, normalMatrix);

            //Render
            //this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
            this.gl.drawElements(this.gl.TRIANGLES, 36, this.gl.UNSIGNED_SHORT, 0);

            this.cubeRotation += dt;
            this.mesh.unbindBuffer(this.gl.ARRAY_BUFFER);
            this.mesh.unbindBuffer(this.gl.ELEMENT_ARRAY_BUFFER);
        }
    }
    return Game;
});