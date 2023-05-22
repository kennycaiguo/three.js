
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import gsap from 'gsap'
import * as dat from 'dat.gui';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

/**
 * 目标：点光源各类属性和应用
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


// 添加物体 -- 球
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
// 材质
const material = new THREE.MeshStandardMaterial()
// 合成球体
const sphere = new THREE.Mesh(sphereGeometry, material);
// 设置物体投射阴影
sphere.castShadow = true
scene.add(sphere);

// 创建一个平面
const planeGeometry = new THREE.PlaneGeometry(50, 50)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(0, -1, 0)
// 旋转后 轴变了
plane.rotation.x = -Math.PI / 2
// 设置物体接受阴影
plane.receiveShadow = true
scene.add(plane)

// 创建一个小球
const smallBall = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 20, 20),
  new THREE.MeshBasicMaterial({
    color: 0xff0000
  })
)
smallBall.position.set(2, 2, 2)
scene.add(smallBall)

/**
 * 追加灯光 
 */
// 环境光 四面八方打过来的
const light = new THREE.AmbientLight(0x404040); // soft white light 柔和的白光
scene.add(light);
// 点光源（PointLight）--- 一个手电筒
const pointLight = new THREE.PointLight(0xff0000, 1);
// 假如这个值设置等于 Object3D.DEFAULT_UP (0, 1, 0),那么光线将会从上往下照射+ (x，z, y)
// pointLight.position.set(2, 2, 2);
// 设置光照投影阴影
pointLight.castShadow = true

// 设置阴影模糊度
pointLight.shadow.radius = 20
// 但是看起来很模糊，所以需要调节一下分辨率
// 设置阴影贴图的分辨率 
pointLight.shadow.mapSize.set(512, 512)

// 直接把光线加在小球上
smallBall.add(pointLight)
// scene.add(pointLight);
scene.add(smallBall)


// 想开启一下模拟场景中平行光
// const spotLighthelper = new THREE.PointLightHelper(pointLight);
// scene.add(spotLighthelper);

// 创建gui
const gui = new dat.GUI();
gui
  .add(pointLight.position, 'x')
  .min(-5)
  .max(5)
  .step(0.1)
  .onChange(() => {
    // spotLighthelper.update()
  })
gui.add(pointLight, 'distance').min(0).max(5).step(0.001)
gui.add(pointLight, 'decay').min(0).max(5).step(0.01)



const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true
// 聚光灯 沿着光照距离的衰减量-需要设置物理上的光照
// renderer.physicallyCorrectLights = true
/**
 * waring：
 * three.module.js:29909 THREE.WebGLRenderer: 
 * the property .physicallyCorrectLights has been removed. 
 * Set renderer.useLegacyLights instead.
 */
renderer.useLegacyLights = true

document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// 设置时钟进行围绕
const clock = new THREE.Clock()
/**
 * 1.2246467991473532e-16 
 * 1.22乘以10的-16次方 非常接近精确值0
 * 
 * 1
 */
console.log(Math.sin(Math.PI), Math.sin(Math.PI / 2));


const render = () => {
  // 小球围绕着大球转
  const time = clock.getElapsedTime()
  smallBall.position.x = Math.sin(time) * 3
  smallBall.position.z = Math.cos(time) * 3
  smallBall.position.y = 2 + Math.sin(time * 10)

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