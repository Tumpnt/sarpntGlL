define('mesh-renderer', ['gl-matrix'], function (glMatrix) {
    class MeshRenderer {
        constructor(mesh, texture) {
            this.texture = texture;
            this.mesh = mesh;
        }

        update() {

        }

        render(gl) {const fieldOfView = 45 * Math.PI / 180;   // in radians
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
            glMatrix.mat4.rotate(modelViewMatrix, modelViewMatrix, 1, [0, 0, 1]);
            glMatrix.mat4.rotate(modelViewMatrix, modelViewMatrix, .7, [0, 1, 0]);

            const normalMatrix = glMatrix.mat4.create();
            glMatrix.mat4.invert(normalMatrix, modelViewMatrix);
            glMatrix.mat4.transpose(normalMatrix, normalMatrix);

            //Material
            this.material.applyTo(gl, this.mesh);

            
            this.material.shader.setUniformMatrix('uProjMat', 4, projectionMatrix);
            this.material.shader.setUniformMatrix('uModelMat', 4, modelViewMatrix);
            this.material.shader.setUniformMatrix('uNormalMat', 4, normalMatrix);

            //Render
            //gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
            gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);


            this.mesh.unbindBuffer(gl.ARRAY_BUFFER);
            this.mesh.unbindBuffer(gl.ELEMENT_ARRAY_BUFFER);

        }
    }
});