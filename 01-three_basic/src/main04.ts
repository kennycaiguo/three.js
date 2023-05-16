
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * 目标：
 * 控制3d物体移动
 * 物体的缩放与旋转
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10)
scene.add(camera)

const cubeGeomtry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xfff00 })
const cube = new THREE.Mesh(cubeGeomtry, cubeMaterial)
scene.add(cube);


// 修改物体的位置
// cube.position.set(5, 0, 0)
// 可以直接修改某一个坐标的值
// cube.position.x = 3

// 缩放 X轴放大3倍，Y轴放大2倍，Z轴放大1倍
// cube.scale.set(3, 2, 1)
// 可以直接修改某一个坐标的值
// cube.scale.x = 5

/**
 * 旋转
 * .set ( x : Float, y : Float, z : Float, order : String ) : this
 * x - 用弧度表示x轴旋转量。
 * y - 用弧度表示y轴旋转量。
 * z - 用弧度表示z轴旋转量。
 * order - (optional) 表示旋转顺序的字符串。
 * 
 * 设置该欧拉变换的角度和旋转顺序 order。
 * 默认值为 'XYZ'，这意味着对象将首先是 绕X轴旋转，然后是Y轴，最后是Z轴。其他可能性包括: 'YZX'， 'ZXY'， 'XZY'， 'YXZ'和'ZYX'。这些必须是大写字母。
 */
// cube.rotation.set(Math.PI / 4, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
const render = () => {
  // 模拟移动 向前移动0.01
  cube.position.x += 0.01
  if (cube.position.x > 5) {
    // 大于5的时候重新回到原点
    cube.position.x = 0;
  }

  // 模拟旋转
  cube.rotation.x += 0.01

  renderer.render(scene, camera)
  // 渲染下一针的时候就要调用render函数
  requestAnimationFrame(render)
}
render()

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);