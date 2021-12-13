class ShaderProgram {
    public valid: boolean;
    private _gl: WebGL2RenderingContext;
    private _shaderProgram: WebGLProgram;
    private _uniformLocations: Map<string, WebGLUniformLocation>;

    constructor(gl: WebGL2RenderingContext, vSource: string, fSource: string) {
        this._gl = gl;
        const vShader = this.compileShader(gl.VERTEX_SHADER, vSource);
        if(vShader == null) return;

        const fShader = this.compileShader(gl.FRAGMENT_SHADER, fSource);
        if(fShader == null) return;

        this._shaderProgram = gl.createProgram();
        gl.attachShader(this._shaderProgram, vShader);
        gl.attachShader(this._shaderProgram, fShader);
        gl.linkProgram(this._shaderProgram);

        if(!gl.getProgramParameter(this._shaderProgram, gl.LINK_STATUS))
        {
            console.log('An error occured while initializing shader program: ' + gl.getProgramInfoLog(this._shaderProgram));
            gl.deleteShader(vShader);
            gl.deleteShader(fShader);
            gl.deleteProgram(this._shaderProgram);
        } else
        {
            this._uniformLocations = new Map<string, WebGLUniformLocation>();
        }
    }

    public use() {
        this._gl.useProgram(this._shaderProgram);
    }

    public setMatrix3fv(mat: Float32Array, name: string) {
        if(!this._uniformLocations.has(name))
        {
            this._uniformLocations[name] = this._gl.getUniformLocation(this._shaderProgram, name);
        }
        this._gl.uniformMatrix3fv(this._uniformLocations[name], false, mat);
    }

    public setUniform1i(value: number, name: string) {
        if(!this._uniformLocations.has(name))
        {
            this._uniformLocations[name] = this._gl.getUniformLocation(this._shaderProgram, name);
        }
        this._gl.uniform1i(this._uniformLocations[name], value);
    }

    public getAttribLocation(name: string) {
        return this._gl.getAttribLocation(this._shaderProgram, name);
    }

    private compileShader(shaderType: number, source: string) {
        console.log('Compiling shader\n' + source);

        const shader = this._gl.createShader(shaderType);
        this._gl.shaderSource(shader, source);
        this._gl.compileShader(shader);

        if(!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS))
        {
            console.log('An error occured while compiling shader: ' + this._gl.getShaderInfoLog(shader));
            this._gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
}

export default ShaderProgram;
