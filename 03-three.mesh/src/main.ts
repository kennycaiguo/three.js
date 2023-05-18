
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import gsap from 'gsap'
// import * as dat from 'dat.gui';

/**
 * 目标：
 * 1.标准网络材质与光照物理效果
 * 标准网络材质是根据PBR物理渲染的
 * 太阳光源对地球来说是点光源制造阴影，然后加环境光决定场景亮度
 * 
 * 
 * 2.置换贴图
 * 3.粗糙度与粗糙度贴图
 * 4.金属贴图
 * 5.法线贴图
 * 
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

// 导入纹理
const textureLoder = new THREE.TextureLoader()
const doorColorTexture = textureLoder.load('./textures/door/eee.jpg')
const doorAlphaTexture = textureLoder.load('./textures/door/alpha.jpg')
const doorAoTexture = textureLoder.load('./textures/door/ambientOcclusion.jpg')
// 导入置换贴图
const doorHeightTexture = textureLoder.load('./textures/door/height.jpg')
// 导入粗糙度贴图
const doorRoughnessTexture = textureLoder.load('./textures/door/roughness.jpg')
// 导入金属贴图
const doorMetalnessTexture = textureLoder.load('./textures/door/metalness.jpg')
// 导入法线贴图
const doorNormalTexture = textureLoder.load('./textures/door/normal.jpg')

// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 100, 100)
// 材质
// 添加后是黑的原因是必须要有灯光
const material = new THREE.MeshStandardMaterial({
  color: '#ffff00',
  map: doorColorTexture,
  // 设置透明
  alphaMap: doorAlphaTexture,
  transparent: true,

  // 第一组uv是颜色贴图，第二组uv控制光照效果
  aoMap: doorAoTexture,
  // 环境遮挡效果的强度。默认值为1
  aoMapIntensity: 1,
  // opacity: 0.5,
  //  定义将要渲染哪一面
  // side: THREE.DoubleSide

  // 设置置换属性
  displacementMap: doorHeightTexture,

  // 平面设置为200,200 宽度和高度分段太高导致很突兀，需要设置影响程度,这里最大凸出5公分
  displacementScale: 0.05,

  /**
   * 改变物体粗糙度
   * 0.0表示平滑的镜面反射，1.0表示完全漫反射。默认值为1.0。
   */
  roughness: 0,
  roughnessMap: doorRoughnessTexture,

  /**
   * 改变物体金属度  --- 材质与金属的相似度。
   * 非金属材质，如木材或石材，使用0.0，金属使用1.0，通常没有中间值。 
   * 默认值为0.0。0.0到1.0之间的值可用于生锈金属的外观。
   */
  metalness: 1,
  metalnessMap: doorMetalnessTexture,

  /**
   * RGB值会影响每个像素片段的曲面法线，并更改颜色照亮的方式。
   * 法线贴图不会改变曲面的实际形状，只会改变光照。
   * 
   * 怎么反射这个光，增加凹凸感
   */
  normalMap: doorNormalTexture,
})
const cube = new THREE.Mesh(cubeGeometry, material)
// material.side = THREE.DoubleSide
scene.add(cube)

cubeGeometry.setAttribute('uv2', new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2))

// 设置透明材质平面
const planeGeometry = new THREE.PlaneGeometry(1, 1, 200, 200)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(1.5, 0, 0)
scene.add(plane)

// 给平面设置第二组uv  第一组uv控制的是颜色贴图，第二组uv控制的是光照效果，和虚幻4引擎一个意思
planeGeometry.setAttribute('uv2', new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2))

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