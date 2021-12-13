attribute vec3 pos;
attribute vec2 auv;

uniform mat3 mvm;
varying highp vec2 uv;

void main() {
    gl_Position = vec4(mvm * vec3(pos.xy, 1), 1);
    uv = auv;
}
