
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * 目标：
 * requestAnimationFrame 时间参数 控制物体动画
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

const controls = new OrbitControls(camera, renderer.domElement)
const render = (time?) => {
  // 请求帧动画方法，内部的回调函数中会自带一个默认参数，他是请求动画帧执行回调函数的时间
  // console.log(time);
  // 求余表示在余数范围内变化
  const t = (time / 1000) % 5
  cube.position.x = 1 * t

  // cube.position.x += 0.01
  if (cube.position.x > 5) {
    cube.position.x = 0;
  }

  cube.rotation.x += 0.01

  renderer.render(scene, camera)
  // 渲染下一针的时候就要调用render函数
  requestAnimationFrame(render)
}
render()

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);