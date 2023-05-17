
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 1.导入动画库
import gsap from 'gsap'

/**
 * 目标：
 * 掌握gsap设置各种动画效果
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
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

// 2.设置动画
// 2.1 向前移动到5，用时5,速率先慢后快再慢
const animation = gsap.to(cube.position, {
  x: 5,
  // 设置重复的次数，设置无限次循环就是-1
  repeat: -1,
  // 往返运动
  yoyo: true,
  // 延时2秒开始运动
  delay: 2,
  duration: 5,
  ease: "power1.inOut", onComplete: () => {
    console.log('动画完成');
  },
  onStart: () => {
    console.log('动画开始');
  }
})

//2.3 双击屏幕，如果正在运行，双击停止。否则运动
window.addEventListener('dblclick', () => {
  console.log(animation);

  if (animation.isActive()) {
    animation.pause()
  } else {
    animation.resume()
  }
})

// 2.2 旋转360，用时5,速率先慢后快再慢
gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut" })

const render = () => {
  renderer.render(scene, camera)
  // 渲染下一针的时候就要调用render函数
  requestAnimationFrame(render)
}
render()

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);