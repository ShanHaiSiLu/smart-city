varying float uTransparent;

void main() {
    float tra = 1.0 - uTransparent;
    if(tra > 1.0) tra = 0.0;
    gl_FragColor = vec4(1.0, .0, 1.0, tra);
}