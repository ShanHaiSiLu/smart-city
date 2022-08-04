uniform float uHeight;

varying float uTransparent;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    uTransparent = modelPosition.y * 2.0 / uHeight;
}