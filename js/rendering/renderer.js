define('renderer', ['shader', 'mesh', 'texture'], function(Shader, Mesh, Texture) {
    class Renderer {
        constructor() {
            //Create Canvas
            var canvas = document.createElement('canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            document.body.appendChild(canvas);

            //Obtain Context
            var gl = canvas.getContext('webgl');
            if (gl === null) {
                alert("Unable to initialize WebGL. Your browser or machine may not support it.");
                return;
            }
            this.gl = gl;

            this.renderers = [];
        }

        update() {
            this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
            this.gl.clearDepth(1.0);
            this.gl.enable(this.gl.DEPTH_TEST);
            this.gl.depthFunc(this.gl.LEQUAL);

            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        }
    }
    return Renderer;
})