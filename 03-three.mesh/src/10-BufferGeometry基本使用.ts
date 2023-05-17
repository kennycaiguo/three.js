
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import gsap from 'gsap'
// import * as dat from 'dat.gui';

/**
 * 目标：
 * 使用BufferGeometry
 * 打造酷炫三角形
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

// 创建多个三角形小案例
for (let i = 0; i < 50; i++) {
  // 创建实例的面
  const geometry = new THREE.BufferGeometry();
  const positionArray = new Float32Array(9)
  // 每一个三角形，需要3个顶点，每个顶点需要3个值
  for (let j = 0; j < 9; j++) {
    positionArray[j] = Math.random() * 10 - 5
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
  // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  // const material = new THREE.MeshBasicMaterial({ color: '#ffff00' })
  const color = new THREE.Color(Math.random(), Math.random(), Math.random());

  // 设置材质的颜色，设置材质的透明度(需要先设置transparent为true)
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.8
  })
  // 根据几何体和材质创建物体
  var mesh = new THREE.Mesh(geometry, material);
  // console.log(mesh);
  // 添加到场景中
  scene.add(mesh)
}




// const geometry = new THREE.BufferGeometry();
// // 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。 一个一维数组每三个点都是(x,y,z)
// // 因为在两个三角面片里，这两个顶点都需要被用到。 创建位置告诉他这个一个一维数组每三个值为一个坐标
// const vertices = new Float32Array([
//   -1.0, -1.0, 1.0,
//   1.0, -1.0, 1.0,
//   1.0, 1.0, 1.0,

//   1.0, 1.0, 1.0,
//   -1.0, 1.0, 1.0,
//   -1.0, -1.0, 1.0
// ]);
// // itemSize = 3 因为每个顶点都是一个三元组。  创建位置告诉他这个一个一维数组每三个值为一个坐标
// geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
// // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const material = new THREE.MeshBasicMaterial({ color: '#ffff00' })
// // 根据几何体和材质创建物体
// const mesh = new THREE.Mesh(geometry, material);
// // console.log(mesh);
// // 添加到场景中
// scene.add(mesh)


// 创建gui
// const gui = new dat.GUI();

// 将几何体添加到图形面板里面
// 改变物体的x轴的最小值为0，最大值为5,步长为0.01，名字叫移动x轴坐标
// gui
//   .add(mesh.position, 'x')
//   .min(0)
//   .max(5)
//   .step(0.01)
//   .name('移动x轴坐标')
//   .onChange(value => {
//     console.log('值被修改：', value)
//   })
//   .onFinishChange(value => {
//     console.log('完全停下来：', value)
//   })

// // 修改物体的颜色 color
// const params = {
//   color: '#ffff00',
//   fn: () => {
//     // 让物体运动起来
//     gsap.to(mesh.position, {
//       x: 5,
//       // 设置重复的次数，设置无限次循环就是-1
//       repeat: -1,
//       // 往返运动
//       yoyo: true,
//       // 延时2秒开始运动
//       // delay: 2,
//       duration: 5,
//     })
//   }
// }
// gui
//   .addColor(params, 'color')
//   .onChange(value => {
//     // console.log('改变颜色的值：', value);
//     // 设置物体材质的颜色
//     mesh.material.color.set(value);
//   })

// // 设置物体的显示和隐藏是个选项框
// gui.add(mesh, 'visible').name('是否显示')

// // 设置按钮点击触发某个事件
// // gui.add(params, 'fn').name('点击立方体运动')

// // 添加文件夹
// const folder = gui.addFolder('设置立方体')
// folder.add(mesh.material, 'wireframe').name('是否变成线框')
// folder.add(params, 'fn').name('点击立方体运动')

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

// gsap.to(mesh.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut" })

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