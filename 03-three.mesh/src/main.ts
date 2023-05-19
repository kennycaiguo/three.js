
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import gsap from 'gsap'
// import * as dat from 'dat.gui';

// 导入hdr文件数据加载器的RGBELoader 
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

/**
 * 目标：
 * 环境贴图
 * 场景设置背景
 * 经纬线映射贴图(墨卡托投影)与HDR
 */

// 加载hdr环境图
const rgbELoader = new RGBELoader()
// 因为很大选择进行异步加载
rgbELoader.loadAsync('textures/hdr/002.hdr').then((texture) => {
  /**
   * 设置图像将如何应用到物体（对象）上
   * 默认值是THREE.UVMapping对象类型， 即UV坐标将被用于纹理映射。
   * 
   * CubeReflectionMapping 和 CubeRefractionMapping 
   * 用于 CubeTexture —— 由6个纹理组合而成，每个纹理都是立方体的一个面。 
   * 对于CubeTexture来说，CubeReflectionMapping是其默认值。
   * 
   * 
   * EquirectangularReflectionMapping 和 EquirectangularRefractionMapping 
   * 用于等距圆柱投影的环境贴图，也被叫做经纬线映射贴图。(墨卡托投影)
   * 等距圆柱投影贴图表示沿着其水平中线360°的视角，以及沿着其垂直轴向180°的视角。
   * 贴图顶部和底部的边缘分别对应于它所映射的球体的北极和南极。
   */
  texture.mapping = THREE.EquirectangularReflectionMapping

  // 场景设置纹理
  scene.background = texture
  // 设置环境纹理
  scene.environment = texture
})

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10)
scene.add(camera)

// 设置cube纹理加载器
const cubeTextureLoader = new THREE.CubeTextureLoader()
// cubeTextureLoader.setPath('./textures/environmentMaps/');
const envMapTexture = cubeTextureLoader.load([
  "./textures/environmentMaps/1/px.jpg",
  "./textures/environmentMaps/1/nx.jpg",
  "./textures/environmentMaps/1/py.jpg",
  "./textures/environmentMaps/1/ny.jpg",
  "./textures/environmentMaps/1/pz.jpg",
  "./textures/environmentMaps/1/nz.jpg",
])

// 在渲染场景的时候将设置背景 只给场景添加背景
scene.background = envMapTexture
// 给所有的物体添加环境贴图，下面的envMap 也可以不用加的
scene.environment = envMapTexture


// 添加物体 -- 球
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
// 材质
const material = new THREE.MeshStandardMaterial({
  // 设置金属材质
  metalness: 0.7,
  // 设置粗糙度
  roughness: 0.1,
  // 设置环境贴图
  // envMap: envMapTexture
})
// 合成球体
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);


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
scene.add(directionalLight);


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
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