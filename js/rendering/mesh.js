define('mesh', [], function () {
    function setupBuffer(gl, mesh, buffer, data, type) {
        mesh[buffer] = gl.createBuffer();
        mesh.bindBuffer(buffer, type);
        gl.bufferData(type, data, gl.STATIC_DRAW);
    }

    class Mesh {
        constructor(gl, vertices, indices, texCoords, normals) {
            this.gl = gl;
            setupBuffer(gl, this, 'vertexBuffer', new Float32Array(vertices), gl.ARRAY_BUFFER);
            setupBuffer(gl, this, 'indexBuffer', new Uint16Array(indices), gl.ELEMENT_ARRAY_BUFFER);
            //setupBuffer(gl, this, 'colorBuffer', new Float32Array(colors), gl.ARRAY_BUFFER);
            setupBuffer(gl, this, 'texCoordBuffer', new Float32Array(texCoords), gl.ARRAY_BUFFER);
            setupBuffer(gl, this, 'normalBuffer', new Float32Array(normals), gl.ARRAY_BUFFER);

        }

        bindBuffer(name, type = this.gl.ARRAY_BUFFER) {
            this.gl.bindBuffer(type, this[name]);
        }

        unbindBuffer(type = this.gl.ARRAY_BUFFER) {
            this.gl.bindBuffer(type, null);
        }

        bindBufferToAttrib(buffer, location, numComponents) {
            const type = this.gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;

            this.bindBuffer(buffer);

            this.gl.vertexAttribPointer(
                location,
                numComponents,
                type,
                normalize,
                stride,
                offset);
        }
    }
    return Mesh;
});