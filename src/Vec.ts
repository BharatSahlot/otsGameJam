class Vec2 {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public add(b: Vec2) {
        return new Vec2(this.x + b.x, this.y + b.y);
    }

    public subtract(b: Vec2) {
        return new Vec2(this.x - b.x, this.y - b.y);
    }

    public mult(v: number) {
        return new Vec2(this.x * v, this.y * v);
    }
}

export default Vec2;
