uniform float uTime;
uniform float uLength;
uniform float uLineLength;
uniform float uRadius;

attribute float aSize;

varying float vSize;

void main() {
    vec4 viewPosition = viewMatrix * modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    vSize = (aSize - uTime);

    if(vSize < 0.0) {
        vSize = vSize + uLength;
    }
    vSize = (vSize - (uLength - uLineLength)) * uRadius;
    
    // vSize = (vSize - (vSize - uLineLength)) * uRadius;

    gl_PointSize = -vSize / viewPosition.z;
}