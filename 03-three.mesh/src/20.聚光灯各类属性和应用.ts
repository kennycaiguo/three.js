
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import gsap from 'gsap'
import * as dat from 'dat.gui';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

/**
 * 目标：聚光灯各类属性和应用
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

/**
 * 追加灯光 
 */
// 环境光 四面八方打过来的
const light = new THREE.AmbientLight(0x404040); // soft white light 柔和的白光
scene.add(light);
// 聚光灯（SpotLight）--- 一个手电筒
const spotLight = new THREE.SpotLight(0xffffff, 0.5);
// 假如这个值设置等于 Object3D.DEFAULT_UP (0, 1, 0),那么光线将会从上往下照射+ (x，z, y)
spotLight.position.set(5, 5, 5);
// 设置光照投影阴影
spotLight.castShadow = true
//  光照强度。 缺省值（默认值） 1  修改上面的0.5
spotLight.intensity = 2

// 设置阴影模糊度
spotLight.shadow.radius = 20
// 但是看起来很模糊，所以需要调节一下分辨率
// 设置阴影贴图的分辨率 
spotLight.shadow.mapSize.set(4096, 4096)

// 设置透视相机的属性 只有近端near，远端far和角度fov
// spotLight.shadow.camera.near = 0.5
// spotLight.shadow.camera.far = 500

/**
 * 设置聚光灯的方向 
 * 聚光灯的方向是从它的位置到目标位置
 * 默认的目标位置为原点 (0,0,0)
 * 
 * 但是上面设置spotLight.position.set(5, 5, 5) 
 * 位置则为(5, 5, 5) 
 */
spotLight.target = sphere

/**
 * 设置聚光灯角度
 * 从聚光灯的位置以弧度表示聚光灯的最大范围
 * 
 * 应该不超过 Math.PI/2
 * 默认值为 Math.PI/3
 */
spotLight.angle = Math.PI / 6

/**
 * 设置最大光源发出光的最大距离
 * 
 * 从光源发出光的最大距离，其强度根据光源的距离线性衰减
 * 
 * 如果非零，那么光强度将会从最大值当前灯光位置处按照距离线性衰减到0。 缺省值为 0.0
 */
spotLight.distance = 0

/**
 * 设置聚光锥的半影衰减效果
 * 
 * 聚光锥的半影衰减百分比。
 * 在0和1之间的值。默认为0。
 */
spotLight.penumbra = 0


/**
 * 设置光照距离的衰减量
 * 
 * 光沿着光的距离变暗的量。默认值是2。
 * 在物理正确呈现的上下，不应该更改默认值。
 * 
 * 所以应该先设置 renderer.physicallyCorrectLights = true
 */
spotLight.decay = 0


scene.add(spotLight);


// 想开启一下模拟场景中平行光
// const spotLighthelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLighthelper);

// 创建gui
const gui = new dat.GUI();
gui
  .add(sphere.position, 'x')
  .min(-5)
  .max(5)
  .step(0.1)
  .onChange(() => {
    // spotLighthelper.update()
  })

gui.add(spotLight, 'angle').min(0).max(Math.PI / 2).step(0.01)
gui.add(spotLight, 'distance').min(0).max(10).step(0.01)
gui.add(spotLight, 'penumbra').min(0).max(1).step(0.01)
gui.add(spotLight, 'decay').min(0).max(5).step(0.01)



const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true
// 聚光灯 沿着光照距离的衰减量-需要设置物理上的光照
renderer.physicallyCorrectLights = true

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