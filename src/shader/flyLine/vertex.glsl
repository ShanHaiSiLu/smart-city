uniform float uTime;
uniform float uLength;

attribute float aSize;

varying float vSize;

void main() {
    vec4 viewPosition = viewMatrix * modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    vSize = (aSize - uTime );

    if(vSize < 0.0) {
        vSize = vSize + uLength;
    }
    vSize = (vSize - 850.0) * 0.5;

    gl_PointSize = -vSize / viewPosition.z;
}