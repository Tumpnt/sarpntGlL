define('texture', [], function () {   
    function isPowerOf2(value) {
        return (value & (value - 2)) == 0;
    }

    class Texture {
        constructor(gl, url) {
            this.gl = gl;
            this.texture = gl.createTexture();
            this.bind();

            const level = 0;
            const internalFormat = gl.RGBA;
            const srcFormat = gl.RGBA;
            const srcType = gl.UNSIGNED_BYTE;

            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                            1, 1, 0, srcFormat, srcType,
                            new Uint8Array([0, 0, 255, 255]));

            const image = new Image();
            image.onload = ()=> {
                this.bind();
                gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

                if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
                    gl.generateMipmap(gl.TEXTURE_2D);
                } else {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                }
            };
            image.src = url;
        }

        bind() {
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        }

        apply(texUnit = 0) {
            this.gl.activeTexture(this.gl[`TEXTURE${texUnit}`]);
            this.bind();
        }
    }

    return Texture;
});