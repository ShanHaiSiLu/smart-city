#define PI 3.1415926

uniform float uTime;
uniform vec3 uColor;

varying vec2 vUv;

// 旋转矩阵
mat2 rotate2d(float _angle) {
    return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
}

void main() {
    // 通过旋转矩阵旋转UV坐标
    vec2 newUv = vUv;
    newUv -= 0.5;
    newUv = rotate2d(uTime * PI * 2.0) * newUv;
    newUv += 0.5;

    // 做个圆形的透明区域
    float alpha = 1.0 - step(0.5, distance(newUv, vec2(0.5)));
    // 根据角度计算当前uv位置的透明度
    float angle = atan(newUv.x - 0.5, newUv.y - 0.5);
    float strength = (angle + PI) / (PI * 2.0);

    // 通过以上参数计算出一个根据角度渐变透明度的圆形区域
    gl_FragColor = vec4(uColor, strength * alpha);
}