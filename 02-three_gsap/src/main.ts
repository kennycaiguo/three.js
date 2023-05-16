
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap'

/**
 * 目标：
 * 设置阻尼/惯性 
 * 根据尺寸实现自适应界面
 * 调用js接口控制画布全屏和退出全屏
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
// 1.1 设置控制器阻尼,让控制器更有真实效果,必须在动画循环里调用.update()
controls.enableDamping = true


//双击控制屏幕进入全屏，退出全屏
window.addEventListener('dblclick', () => {
  const fullscreen = document.fullscreenElement
  if (!fullscreen) {
    // 让画布全屏
    renderer.domElement.requestFullscreen()
  } else {
    // renderer.domElement.exitFullscreen()
    // 退出全屏 使用document对象
    document.exitFullscreen();
  }
})

gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut" })

const render = () => {
  //1.2 阻尼
  controls.update()

  renderer.render(scene, camera)
  // 渲染下一针的时候就要调用render函数
  requestAnimationFrame(render)
}
render()

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 2.1 监听画面的变化，更新渲染画面
window.addEventListener('resize', () => {
  // console.log('画面变化了！');

  // 2.2.更新摄像头的宽高比
  camera.aspect = window.innerWidth / window.innerHeight

  // 2.3.更新摄像机的投影矩阵
  camera.updateProjectionMatrix()

  // 2.4.更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)

  // 2.5.设置渲染器的像素比  1像素像素分辨率/系统的像素分辨率
  renderer.setPixelRatio(window.devicePixelRatio)
})