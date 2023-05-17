
import * as THREE from 'three'

// 1.1 导入轨道控制器 --- 相当于卫星 360°进行围绕查看
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * 目标：
 * 使用控制器查看3d物体
 * 添加坐标轴辅助器
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10)
scene.add(camera)

const cubeGeomtry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xfff00 })
const cube = new THREE.Mesh(cubeGeomtry, cubeMaterial)
scene.add(cube);


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
// renderer.render(scene, camera)

/**
 * 1.2 创建轨道控制器
 * OrbitControls( object : Camera, domElement : HTMLDOMElement )
 * object: （必须）将要被控制的相机。该相机不允许是其他任何对象的子级，除非该对象是场景自身。
 * domElement: 用于事件监听的HTML元素。
 */
const controls = new OrbitControls(camera, renderer.domElement)

// 1.3 浏览器每调用一帧就要调用一下渲染器
const render = () => {
  renderer.render(scene, camera)
  // 渲染下一针的时候就要调用render函数
  requestAnimationFrame(render)
}
render()

// 2.添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
// 2.1 添加到场景之中
scene.add(axesHelper);