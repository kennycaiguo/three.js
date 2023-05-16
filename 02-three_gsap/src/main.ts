
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * 目标：
 * 通过clock跟踪时间处理动画
 * 
 * 让物体绝对匀速运动，消除requestAnimationFrame方式相同时间内单位内位移不确定
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

const clock = new THREE.Clock()

const render = () => {
  // 获取时钟运行的总时长
  const time = clock.getElapsedTime()
  // 获取间隔时间
  // const deltaTime = clock.getDelta()
  console.log('获取时钟运行的总时长：', time);
  // console.log('两次获取时间的间隔时间：', deltaTime);

  const t = time % 5
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