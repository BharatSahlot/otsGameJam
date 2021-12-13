varying highp vec2 uv;

uniform sampler2D texture;

void main() {
    // gl_FragColor = vec4(uv, 0, 1);
    gl_FragColor = texture2D(texture, uv);
}
