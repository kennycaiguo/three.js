
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import gsap from 'gsap'
// import * as dat from 'dat.gui';

/**
 * 目标：
 * 设置纹理显示算法与mipmap
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
const texture = textureLoder.load('./textures/minecraft.png')

/**
 * 纹理显示设置
 * 自动计算
 * 如果放大或者缩小的时候，纹理的像素也要进行改变（放大滤镜）
 * 
 * 默认值是LinearFilter，最近的四个纹理元素的加权平均值
 * NearestFilter 是与指定纹理坐标（在曼哈顿距离之内）最接近的纹理元素的值
 */
texture.minFilter = THREE.NearestFilter
texture.magFilter = THREE.NearestFilter

// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: '#ffff00',
  // map: doorColorTexture
  map: texture
})
const cube = new THREE.Mesh(cubeGeometry, basicMaterial)
scene.add(cube)

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