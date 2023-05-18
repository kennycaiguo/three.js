# 目标：简单使用BufferGeometry和打造酷炫三角形

# 1. 简单使用BufferGeometry 官方案例
```ts
const geometry = new THREE.BufferGeometry();
// 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。 一个一维数组每三个点都是(x,y,z)
// 因为在两个三角面片里，这两个顶点都需要被用到。 创建位置告诉他这个一个一维数组每三个值为一个坐标
const vertices = new Float32Array([
  -1.0, -1.0, 1.0,
  1.0, -1.0, 1.0,
  1.0, 1.0, 1.0,

  1.0, 1.0, 1.0,
  -1.0, 1.0, 1.0,
  -1.0, -1.0, 1.0
]);
// itemSize = 3 因为每个顶点都是一个三元组。  创建位置告诉他这个一个一维数组每三个值为一个坐标
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const material = new THREE.MeshBasicMaterial({ color: '#ffff00' })
// 根据几何体和材质创建物体
const mesh = new THREE.Mesh(geometry, material);
// console.log(mesh);
// 添加到场景中
scene.add(mesh)
```

# 2.打造酷炫三角形
```ts
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
```