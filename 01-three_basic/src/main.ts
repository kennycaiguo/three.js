
import * as THREE from 'three'
// console.log(THREE)

/**
 * 目标：
 * 了解three.js最基本内容
 * 
 * 场景
 * 摄像头
 * 渲染器
 */

// 1.创建场景
const scene = new THREE.Scene();

/**
 *  2、创建相机
 *  PerspectiveCamera（透视摄像机）或者 OrthographicCamera（正交摄像机）
 * 
 * PerspectiveCamera（透视摄像机）被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
 * orthographic projection（正交投影）无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。
 * 
 * PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
 * fov — 摄像机视锥体垂直视野角度
 * aspect — 摄像机视锥体长宽比
 * near — 摄像机视锥体近端面
 * far — 摄像机视锥体远端面
 * 
 * 第一个参数为 角度 例如 45 45°
 * 第二个参数为 摄像头的宽高比例 
 * 第三个参数为 最近的距离为多少
 * 第四个参数为 最远的距离为多少
 * 
 * 这些参数一起定义了摄像机的viewing frustum（视锥体）。
 */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 2.1.设置相机位置(参数为三位坐标x、y、z)
camera.position.set(0, 0, 10)

// 2.2.相机添加到场景当中
scene.add(camera)

/**
 * 3.添加几何体
 */
/**
 * 3.1 创建几何体
 * 
 * BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
 * width — X轴上面的宽度，默认值为1。
 * height — Y轴上面的高度，默认值为1。
 * depth — Z轴上面的深度，默认值为1。
 * widthSegments — （可选）宽度的分段数，默认值是1。
 * heightSegments — （可选）高度的分段数，默认值是1。
 * depthSegments — （可选）深度的分段数，默认值是1。
 */
const cubeGeomtry = new THREE.BoxGeometry(1, 1, 1);
// 3.2 几何体材质 （目前用的 基础网格材质，一个以简单着色（平面或线框）方式来绘制几何体的材质。）
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xfff00 })
// 3.3 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeomtry, cubeMaterial)
// 3.4 将几何体添加到场景中
scene.add(cube);


/**
 * 4.渲染物体
 */
// 4.1 初始化渲染器
const render = new THREE.WebGLRenderer()
// 4.2 设置渲染的尺寸大小
render.setSize(window.innerWidth, window.innerHeight)

// console.log(render);
// 4.3 将webgl渲染的canvas内容添加到body上
document.body.appendChild(render.domElement)

// 4.4 使用渲染器，通过相机将场景渲染进来
render.render(scene, camera)

