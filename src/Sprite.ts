import ShaderProgram from "./ShaderProgram";
import Mat3 from "./Mat3";
import Texture from "./Texture";
import Vec2 from "./Vec";

class Sprite {
    private _gl: WebGL2RenderingContext;
    private _vao: WebGLVertexArrayObject;

    private _shader: ShaderProgram;
    private _texture: Texture;

    private _pos = new Vec2(0, 0);
    private _scale = new Vec2(1, 1);

    constructor(gl: WebGL2RenderingContext, shader: ShaderProgram, texture: Texture, width: number = 1, height: number = 1)
    {
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        const vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -width,  height, 0, 0,
             width,  height, 1, 0,
            -width, -height, 0, 1,
             width, -height, 1, 1
        ]), gl.STATIC_DRAW);

        this._pos = new Vec2(gl.canvas.width, -gl.canvas.height);

        const vap = shader.getAttribLocation("pos");
        const uv = shader.getAttribLocation("auv");
        gl.vertexAttribPointer(vap, 2, gl.FLOAT, false, 16, 0);
        gl.enableVertexAttribArray(vap);
        gl.vertexAttribPointer(uv, 2, gl.FLOAT, false, 16, 8);
        gl.enableVertexAttribArray(uv);

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        this._vao = vao;
        this._gl = gl;
        this._shader = shader;
        this._texture = texture;
    }

    public set_scale(scale: Vec2) {
        this._scale = scale;
    }

    public get_pos() { return this._pos; }

    public set_pos(pos: Vec2) {
        this._pos = pos;
    }

    public draw() {
        const tex = this._texture.use();

        this._shader.use();
        this._shader.setUniform1i(tex, "texture");

        var mat = Mat3.projection(this._gl.canvas.clientWidth, this._gl.canvas.clientHeight);
        mat = Mat3.multiply(mat, Mat3.translation(this._pos.x, this._pos.y));
        mat = Mat3.multiply(mat, Mat3.rotation(0));
        mat = Mat3.multiply(mat, Mat3.scale(this._scale.x, this._scale.y));
        this._shader.setMatrix3fv(mat, "mvm");

        this._gl.bindVertexArray(this._vao);
        this._gl.drawArrays(this._gl.TRIANGLE_STRIP, 0, 4);
    }
}

export default Sprite;
