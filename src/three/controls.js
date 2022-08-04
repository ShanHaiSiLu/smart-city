import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import camera from "./camera"
import renderer from "./renderer"

// 控制器
let controls = new OrbitControls(camera, renderer.domElement);
// 添加阻尼
// controls.enableDamping = true;

export default controls