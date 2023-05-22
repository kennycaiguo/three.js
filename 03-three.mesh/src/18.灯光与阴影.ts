
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import gsap from 'gsap'
// import * as dat from 'dat.gui';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

/**
 * 目标：灯光与阴影
 * 灯光阴影
 * 1. 材质要满足能够对光照有反应
 * 2. 设置渲染器开启阴影的计算 render.shadowMap.enabled = true
 * 3. 设置光照投影阴影 directionalLight.castShadow =  true
 * 4. 设置物体投射阴影 sphere.castShadow = true
 * 5. 设置物体接受阴影 plane.receiveShadow = true
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
// 4.设置物体投射阴影
sphere.castShadow = true
scene.add(sphere);

// 创建一个平面
const planeGeometry = new THREE.PlaneGeometry(10, 10)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(0, -1, 0)
// 旋转后 轴变了
plane.rotation.x = -Math.PI / 2
// 5. 设置物体接受阴影
plane.receiveShadow = true
scene.add(plane)


/**
 * 追加灯光 
 */
// 环境光 四面八方打过来的
const light = new THREE.AmbientLight(0x404040); // soft white light 柔和的白光
scene.add(light);
// 直线光 = 平行光
// White directional light at half intensity shining from the top. 
// 白色的定向光在半强度从顶部照射
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// 假如这个值设置等于 Object3D.DEFAULT_UP (0, 1, 0),那么光线将会从上往下照射+ (x，z, y)
directionalLight.position.set(10, 10, 10);
// 3. 设置光照投影阴影
directionalLight.castShadow = true
scene.add(directionalLight);


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
// 2. 开启场景中的阴影贴图
renderer.shadowMap.enabled = true

document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

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