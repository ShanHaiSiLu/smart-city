import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import scene from "./scene";
import createCity from "./mesh/City";

export default function ceateMesh() {
  createCity();
}
