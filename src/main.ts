import ShaderProgram from "./ShaderProgram";
import vSource from "../shaders/sprite.vert";
import fSource from "../shaders/sprite.frag";
import Sprite from "./Sprite";
import Texture from "./Texture";
import Player from "./Player";

var gl: WebGL2RenderingContext;
var sprites: Sprite[] = [];
var images = ['assets/obstacle-1.png'];
var textures: Map<string, Texture> = new Map<string, Texture>();
var loadingSprite: Sprite;
var loadingTexture: Texture;

var player: Player;

function init()
{
    const canvas : HTMLCanvasElement = document.querySelector('#glCanvas');
    gl = canvas.getContext("webgl2");

    if(gl == null)
    {
        alert("Unable to initialize WebGL");
        return;
    }

    const shader = new ShaderProgram(gl, vSource, fSource);
    loadingTexture = new Texture(gl, "assets/loading.png");
    loadingSprite = new Sprite(gl, shader, loadingTexture, 640, 320);

    images.forEach(url => {
        textures[url] = new Texture(gl, url);
    });
    player = new Player(gl, shader, textures[images[0]]);
    // sprites.push(new Sprite(gl, shader, textures[images[0]]));
}

var prev: number;
function update(now: number)
{
    const deltaTime = (now - prev) * 0.001;
    prev = now;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    if(!loadingTexture.loaded)
    {
        requestAnimationFrame(update);
        return;
    }

    let loaded = true;
    textures.forEach((tex) => {
        if(!tex.loaded)
        {
            loaded = false;
        } else if(!tex.glLoaded) tex.glLoad();
    });

    if(!loaded || now * 0.001 <= 1) {
        loadingSprite.draw();
    } else {
        player.update(deltaTime);
    }
    requestAnimationFrame(update);
}

init();
requestAnimationFrame(update);
