import * as THREE from "three";
import gsap from "gsap";

/**
 * 修改着色器
 * @param {type:网格模型} mesh
 */
export default function modifyCityMaterial(mesh) {
  mesh.material.onBeforeCompile = (shader) => {
    // 添加替换用的标识符
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `
      #include <dithering_fragment>
      // #end#
      `
    );
    // 添加渐变色
    addGradColor(shader, mesh);
    // 添加扩散
    addSpread(shader);

    // addLine(shader);
    // addLine2(shader);
    // addLine3(shader);

    // 添加上下扫光
    addToTop(shader);
  };
}

/**
 * 实现建筑渐变色效果
 * @param {type:着色器} shader
 * @param {type:网格模型} mesh
 */
export function addGradColor(shader, mesh) {
  // 计算当前几何体的边界矩形，否则几何体的boundingBox属性默认为null
  mesh.geometry.computeBoundingBox();

  // 获取物体的高度差
  const uHeight =
    mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y;

  // 传入着色器，作为渐变色的基础
  shader.uniforms.uHeight = {
    value: uHeight,
  };

  // 传入顶部和底部颜色，作为渐变色计算依据
  shader.uniforms.uTopColor = {
    value: new THREE.Color("#aaaeff"),
  };

  // 修改顶点着色器，将position属性通过varying传递到片元着色器
  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
    #include <common>
    varying vec3 vPosition;
    `
  );
  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
    #include <begin_vertex>
    vPosition = position;
    `
  );

  // 修改片元着色器，接收position变量边以此生成渐变色
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform vec3 uTopColor;
    uniform float uHeight;
    varying vec3 vPosition;
    `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "// #end#",
    `
    vec4 distGradColor = gl_FragColor;

    // 设置混恶化的百分比
    float gradMix = (vPosition.y + uHeight/2.0)/uHeight;

    // 计算混合颜色
    vec3 gradMinColor = mix(distGradColor.xyz, uTopColor, gradMix);

    // 颜色赋值
    gl_FragColor = vec4(gradMinColor, 1.0);
    // #end#
    `
  );
}

/**
 * 添加光圈扩散效果
 * @param {type:着色器} shader
 */
export function addSpread(shader) {
  // 定义光圈中心点
  shader.uniforms.uSpreadCenter = {
    value: new THREE.Vector2(0, 0),
  };
  // 设置扩散的时间
  shader.uniforms.uSpreadTime = {
    value: 0,
  };
  // 设置条带宽度
  shader.uniforms.uSpreadWidth = {
    value: 40,
  };

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform vec2 uSpreadCenter;
    uniform float uSpreadTime;
    uniform float uSpreadWidth;
    `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "// #end#",
    `
    // 获取当前点到中心的距离
    float length = distance(vPosition.xz, uSpreadCenter);

    // 将这个距离与时间变量做运算，得到一个新变量，这个新变量随着时间的变动会产生不同的负数值
    float lengthByTime = length - uSpreadTime;

    // 新变量同时有正负值，那么对这个新变量取以下二次函数，即可获得新一个随着时间变动而不断变动正直的效果
    float spreadIndex = - lengthByTime * lengthByTime + uSpreadWidth;
    
    if(spreadIndex > 0.0) {
      gl_FragColor = mix(gl_FragColor, vec4(0.4666, 0.8784, 0.9216, 1.0), spreadIndex/uSpreadWidth);
    }
    // #end#
    `
  );

  gsap.to(shader.uniforms.uSpreadTime, {
    value: 700,
    duration: 2,
    repeat: -1,
  });
}

export function addLine(shader) {
  // 设置扩散的时间
  shader.uniforms.uLineTime = {
    value: -500,
  };
  // 设置条带宽度
  shader.uniforms.uLineWidth = {
    value: 40,
  };

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform float uLineTime;
    uniform float uLineWidth;
    `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "// #end#",
    `
    float line = vPosition.x * vPosition.z * 0.0035;

    // 将这个距离与时间变量做运算，得到一个新变量，这个新变量随着时间的变动会产生不同的负数值
    float lineByTime = line - uLineTime;

    // 新变量同时有正负值，那么对这个新变量取以下二次函数，即可获得新一个随着时间变动而不断变动正直的效果
    float lineIndex = - lineByTime * lineByTime + uLineWidth;
    
    if(lineIndex > 0.0) {
      gl_FragColor = mix(gl_FragColor, vec4(1.0, 0.0, 0.0, 1.0), lineIndex/uLineWidth);
    }
    // #end#
    `
  );

  gsap.to(shader.uniforms.uLineTime, {
    value: 700,
    duration: 5,
    repeat: -1,
    yoyo: true,
  });
}

export function addLine2(shader) {
  // 设置扩散的时间
  shader.uniforms.uLine2Time = {
    value: -900,
  };
  // 设置条带宽度
  shader.uniforms.uLine2Width = {
    value: 40,
  };

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform float uLine2Time;
    uniform float uLine2Width;
    `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "// #end#",
    `
    float line2 = vPosition.x + vPosition.z;

    // 将这个距离与时间变量做运算，得到一个新变量，这个新变量随着时间的变动会产生不同的负数值
    float line2ByTime = line2 - uLine2Time;

    // 新变量同时有正负值，那么对这个新变量取以下二次函数，即可获得新一个随着时间变动而不断变动正直的效果
    float line2Index = - line2ByTime * line2ByTime + uLine2Width;
    
    if(line2Index > 0.0) {
      gl_FragColor = mix(gl_FragColor, vec4(1.0, 0.0, 0.0, 1.0), line2Index/uLine2Width);
    }
    // #end#
    `
  );

  gsap.to(shader.uniforms.uLine2Time, {
    value: 900,
    duration: 5,
    repeat: -1,
    yoyo: true,
  });
}

export function addLine3(shader) {
  // 设置扩散的时间
  shader.uniforms.uLine3Time = {
    value: -900,
  };
  // 设置条带宽度
  shader.uniforms.uLine3Width = {
    value: 40,
  };

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform float uLine3Time;
    uniform float uLine3Width;
    `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "// #end#",
    `
    float line3 = vPosition.x - vPosition.z;

    // 将这个距离与时间变量做运算，得到一个新变量，这个新变量随着时间的变动会产生不同的负数值
    float line3ByTime = line3 - uLine3Time;

    // 新变量同时有正负值，那么对这个新变量取以下二次函数，即可获得新一个随着时间变动而不断变动正直的效果
    float line3Index = - line3ByTime * line3ByTime + uLine3Width;

    if(line3Index > 0.0) {
      gl_FragColor = mix(gl_FragColor, vec4(1.0, 0.0, 0.0, 1.0), line3Index/uLine3Width);
    }
    // #end#
    `
  );

  gsap.to(shader.uniforms.uLine3Time, {
    value: 900,
    duration: 3,
    repeat: -1,
    yoyo: true,
  });
}



export function addToTop(shader) {
  // 设置扩散的时间
  shader.uniforms.uToTopTime = {
    value: 0,
  };
  // 设置条带宽度
  shader.uniforms.uToTopWidth = {
    value: 40,
  };

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform float uToTopTime;
    uniform float uToTopWidth;
    `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "// #end#",
    `
    float ToTop = vPosition.y;

    // 将这个距离与时间变量做运算，得到一个新变量，这个新变量随着时间的变动会产生不同的负数值
    float ToTopByTime = ToTop - uToTopTime;

    // 新变量同时有正负值，那么对这个新变量取以下二次函数，即可获得新一个随着时间变动而不断变动正直的效果
    float ToTopIndex = - ToTopByTime * ToTopByTime + uToTopWidth;

    if(ToTopIndex > 0.0) {
      gl_FragColor = mix(gl_FragColor, vec4(0.4588, 0.6078, 0.9373, 1.0), ToTopIndex/uToTopWidth);
    }
    // #end#
    `
  );

  gsap.to(shader.uniforms.uToTopTime, {
    value: 200,
    duration: 2,
    repeat: -1,
    ease: "none"
  });
}
