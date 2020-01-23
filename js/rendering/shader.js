define('shader', [], function () {
    class Shader {
        constructor(gl) {
            this.gl = gl;
            this.program = gl.createProgram();
            this.attributes = {};
            this.uniforms = {};
        }

        loadShader(type, source) {
            var shader = this.gl.createShader(type);
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader)
            if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
                console.log(source,":",this.gl.getShaderInfoLog(shader));
                return;
            }
            this.gl.attachShader(this.program, shader);
        }

        link(attributes = [], uniforms = []) {
            this.gl.linkProgram(this.program);
            if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
                console.log(this.gl.getProgramInfoLog(this.program));
                this.gl.deleteProgram(this.program);
                throw new Error();
            }

            attributes.forEach(a => {
                this.attributes[a] = this.gl.getAttribLocation(this.program, a);
            });
            uniforms.forEach(u => {
                this.uniforms[u] = this.gl.getUniformLocation(this.program, u);
            });
        }
        use() {
            this.gl.useProgram(this.program);
        }

        getAttribLocation(name) {
            return this.attributes[name];
        }

        getUniformLocation(name) {
            return this.uniforms[name];
        }

        setUniformMatrix(name, size, value, transpose = false) {
            this.use();
            this.gl[`uniformMatrix${size}fv`](
                this.uniforms[name],
                transpose,
                value
            );
        }

        setUniform(name, size, value, float=false) {
            this.use();
            let type = float ? 'f' : 'i';
            let v = Array.isArray(value) ? 'v' : '';
            this.gl[`uniform${size}${type}${v}`](
                this.uniforms[name],
                value
            );            
        }

        enableAttrib(name) {
            this.use();
            this.gl.enableVertexAttribArray(this.attributes[name]);
        }
    }
    return Shader;
});