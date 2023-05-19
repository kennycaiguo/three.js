
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import gsap from 'gsap'
// import * as dat from 'dat.gui';

/**
 * 目标：
 * 纹理加载进度情况
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

// 设置加载管理器   纹理的加载，这个也可以用于其他的加载
const loadingManager = new THREE.LoadingManager(
  () => {
    console.log('图片加载完成');
  },
  // 目前暂不支持onProgress的回调
  // undefined,
  (url, itemsLoaded, itemsTotal) => {
    // 可以改成慢速3g网络进行测试
    // console.log('图片加载进度', 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

    console.log('图片加载事件', event);
    console.log('图片加载地址', url);
    console.log('图片加载进度', itemsLoaded);
    console.log('图片总数', itemsTotal);
    console.log('图片进度百分比', parseFloat(((itemsLoaded / itemsTotal) * 100).toFixed(2)) + '%');

    const progressvalue = parseFloat(((itemsLoaded / itemsTotal) * 100).toFixed(2)) + '%'
    // const progressvalue = `${parseFloat(((itemsLoaded / itemsTotal) * 100).toFixed(2))}%`
    // h2.innerText = progressvalue
    h2.innerHTML = progressvalue
  },

  // onError回调
  (err) => {
    console.error(err, 'An error happened.');
  })
// 导入纹理
const textureLoder = new THREE.TextureLoader(loadingManager)
const doorColorTexture = textureLoder.load('./textures/door/eee.jpg')
// 设置一个h2 显示进度条
const h2 = document.createElement('h2')
// 无法为“style”赋值，因为它是只读属性。
// h2.style = {
// }
h2.style.width = '200px'
h2.style.height = '200px'
h2.style.position = 'fixed'
h2.style.right = '0'
h2.style.top = '0'
h2.style.color = 'white'
document.body.appendChild(h2)

// 导入纹理
// const textureLoder = new THREE.TextureLoader()
//单张纹理图的加载 --- > onLoad回调
// const event = {
//   onLoad: (texture) => {
//     console.log('图片加载完成', texture);
//   },

//   // 目前暂不支持onProgress的回调
//   // onProgress:undefined,
//   onProgress: (e) => {
//     console.log('图片加载进度', e);
//   },

//   // onError回调
//   onError: (err) => {
//     console.error(err, 'An error happened.');
//   }
// }
// const doorColorTexture = textureLoder.load('./textures/door/eee.jpg',event.onLoad,event.onProgress,event.onError)
// ...event ts必须得具有返回迭代器的 "[Symbol.iterator]()" 方法才可以
// const doorColorTexture = textureLoder.load('./textures/door/eee.jpg',...event)
// const doorColorTexture = textureLoder.load(
//   // 资源URL
//   './textures/door/eee.jpg',

//   //单张纹理图的加载 --- > onLoad回调
//   (texture) => {
//     console.log('图片加载完成', texture);
//   },
//   // 目前暂不支持onProgress的回调
//   // undefined,
//   (e) => {
//     // 可以改成慢速3g网络进行测试
//     console.log('图片加载进度', e);
//   },

//   // onError回调
//   (err) => {
//     console.error(err, 'An error happened.');
//   }
// )

const doorAlphaTexture = textureLoder.load('./textures/door/alpha.jpg')
const doorAoTexture = textureLoder.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoder.load('./textures/door/height.jpg')
const doorRoughnessTexture = textureLoder.load('./textures/door/roughness.jpg')
const doorMetalnessTexture = textureLoder.load('./textures/door/metalness.jpg')
const doorNormalTexture = textureLoder.load('./textures/door/normal.jpg')

// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 100, 100)
// 材质
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

  // 改变物体粗糙度
  roughness: 0,
  roughnessMap: doorRoughnessTexture,

  // 改变物体金属度  --- 材质与金属的相似度。
  metalness: 1,
  metalnessMap: doorMetalnessTexture,

  // RGB值会影响每个像素片段的曲面法线，并更改颜色照亮的方式。
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