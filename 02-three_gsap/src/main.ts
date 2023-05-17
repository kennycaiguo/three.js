
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap'

// 1.导入dat.gui
import * as dat from 'dat.gui';

/**
 * 目标：
 * 应用图形用户界面改变变量
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
// const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xfff00 })
const cubeMaterial = new THREE.MeshBasicMaterial({ color: '#ffff00' })
const cube = new THREE.Mesh(cubeGeomtry, cubeMaterial)
// console.log(cube);
console.log(cubeGeomtry);
scene.add(cube);

// 2. 创建gui
const gui = new dat.GUI();

// 3. 将几何体添加到图形面板里面
// 3.1 改变物体的x轴的最小值为0，最大值为5,步长为0.01，名字叫移动x轴坐标
gui
  .add(cube.position, 'x')
  .min(0)
  .max(5)
  .step(0.01)
  .name('移动x轴坐标')
  .onChange(value => {
    console.log('值被修改：', value)
  })
  .onFinishChange(value => {
    console.log('完全停下来：', value)
  })

// 3.2 修改物体的颜色 color
const params = {
  color: '#ffff00',
  fn: () => {
    // 让物体运动起来
    gsap.to(cube.position, {
      x: 5,
      // 设置重复的次数，设置无限次循环就是-1
      repeat: -1,
      // 往返运动
      yoyo: true,
      // 延时2秒开始运动
      // delay: 2,
      duration: 5,
    })
  }
}
gui
  .addColor(params, 'color')
  .onChange(value => {
    // console.log('改变颜色的值：', value);
    // 设置物体材质的颜色
    cube.material.color.set(value);
  })

// 3.3 设置物体的显示和隐藏是个选项框
gui.add(cube, 'visible').name('是否显示')

// 3.4 设置按钮点击触发某个事件
// gui.add(params, 'fn').name('点击立方体运动')

// 3.5 添加文件夹
const folder = gui.addFolder('设置立方体')
folder.add(cube.material, 'wireframe').name('是否变成线框')
folder.add(params, 'fn').name('点击立方体运动')

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true


//双击控制屏幕进入全屏，退出全屏
// window.addEventListener('dblclick', () => {
//   const fullscreen = document.fullscreenElement
//   if (!fullscreen) {
//     // 让画布全屏
//     renderer.domElement.requestFullscreen()
//   } else {
//     // renderer.domElement.exitFullscreen()
//     // 退出全屏 使用document对象
//     document.exitFullscreen();
//   }
// })

gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut" })

const render = () => {
  controls.update()

  renderer.render(scene, camera)
  // 渲染下一针的时候就要调用render函数
  requestAnimationFrame(render)
}
render()

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

window.addEventListener('resize', () => {
  // 更新摄像头的宽高比
  camera.aspect = window.innerWidth / window.innerHeight

  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix()

  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)

  // 设置渲染器的像素比  1像素像素分辨率/系统的像素分辨率
  renderer.setPixelRatio(window.devicePixelRatio)
})