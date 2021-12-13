import ShaderProgram from "./ShaderProgram";
import Sprite from "./Sprite";
import Texture from "./Texture";
import Vec2 from "./Vec";


const spaceForce = new Vec2(0, 10000);
const gravity = new Vec2(0, -50);

class Player {
    private _sprite: Sprite;
    private _spacePressed: boolean;

    private _position = new Vec2(0, 0);
    private _velocity = new Vec2(0, 0);
    private _acceleration = new Vec2(0, 0);

    constructor(gl: WebGL2RenderingContext, shader: ShaderProgram, texture: Texture) {
        this._sprite = new Sprite(gl, shader, texture, 100, 100);
        this._position = this._sprite.get_pos();
        this._position.x -= 350;
        document.addEventListener('keydown', (e) => this.handleInput(e));
    }

    private handleInput(event: KeyboardEvent) {
        // console.log(event.code);
        if(event.code == 'Space') this._spacePressed = true;
    }

    public update(deltaTime: number) {
        if(this._spacePressed) {
            // this._acceleration = spaceForce;
            this._acceleration = this._acceleration.add(spaceForce);
            if(this._acceleration.y >= 400) this._acceleration.y = 400;
            // this._position = this._position.add(new Vec2(0, 1000 * deltaTime));
            this._spacePressed = false;
        } else {
            // if(this._acceleration.y > 0) this._acceleration.y -= 300;
            this._acceleration = this._acceleration.add(gravity);
            if(this._acceleration.y <= -150) this._acceleration.y = -150;
        }

        // this._acceleration = this._acceleration.add(gravity);
        this._velocity = this._velocity.add(this._acceleration.mult(deltaTime));
        this._position = this._position.add(this._velocity.mult(deltaTime));
        // this._position = this._position.add(new Vec2(0, -200 * deltaTime));
        this._sprite.set_pos(this._position);

        console.log(this._acceleration);
        this._sprite.draw();
    }
}

export default Player;
