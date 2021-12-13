class Texture {
    public loaded: boolean = false;
    public glLoaded: boolean = false;

    private _gl: WebGL2RenderingContext;
    private _texture: WebGLTexture;
    private _image: HTMLImageElement;

    constructor(gl: WebGL2RenderingContext, url: string) {
        const image = new Image();
        image.onload = () => {
            this.loaded = true;
        };
        image.src = url;
        this._image = image;
        this._gl = gl;
    }
    
    public glLoad() {
        this.glLoaded = true;
        this._texture = this._gl.createTexture();
        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
        this._gl.texImage2D(this._gl.TEXTURE_2D, 
                            0, this._gl.RGBA, 
                            this._gl.RGBA, 
                            this._gl.UNSIGNED_BYTE, 
                            this._image);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
        this._gl.bindTexture(this._gl.TEXTURE_2D, null);
    }
    
    public use() : number {
        if(!this.glLoaded) this.glLoad();
        // wont have many so can have all my texture active?
        // for later tho
        this._gl.activeTexture(this._gl.TEXTURE0);
        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
        return 0;
    }
}
export default Texture;
