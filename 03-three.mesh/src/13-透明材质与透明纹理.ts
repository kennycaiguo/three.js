
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import gsap from 'gsap'
// import * as dat from 'dat.gui';

/**
 * 目标：
 * 透明材质与透明纹理
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
const doorColorTexture = textureLoder.load('./textures/door/ccc.jpg')
// console.log(doorColorTexture);
// 纹理的透明
const doorAlphaTexture = textureLoder.load('./textures/door/alpha.jpg')

// 纹理偏移设置
// doorColorTexture.offset.x = 0.5
// doorColorTexture.offset.y = 0.5
doorColorTexture.offset.set(0.5, 0.5)

// 纹理的旋转45deg
doorColorTexture.rotation = Math.PI / 4

// 纹理旋转中心设置，默认左下角 Vector2表示二位对象
doorColorTexture.center.set(0.5, 0.5)

// 纹理设置重复
doorColorTexture.repeat.set(2, 3)

//设置纹理包裹的模式 无线重复模式，
doorColorTexture.wrapS = THREE.RepeatWrapping
doorColorTexture.wrapT = THREE.RepeatWrapping


// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: '#ffff00',
  map: doorColorTexture,
  // 设置透明
  alphaMap: doorAlphaTexture,
  transparent: true,
  opacity: 0.5,
  /**
    * 定义将要渲染哪一面 - 正面，背面或两者，默认为THREE.FrontSide
    * 
    * 其他选项有THREE.BackSide 和 THREE.DoubleSide。
    */
  side: THREE.DoubleSide
})
const cube = new THREE.Mesh(cubeGeometry, basicMaterial)
// basicMaterial.side = THREE.DoubleSide
scene.add(cube)

// 设置透明材质平面
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), basicMaterial)
plane.position.set(3, 0, 0)
scene.add(plane)

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