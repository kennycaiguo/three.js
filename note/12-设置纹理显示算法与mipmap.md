# 目的：设置纹理显示算法与mipmap
# 1.导入纹理
```ts
const textureLoder = new THREE.TextureLoader()
```
# 2. 加载纹理图片
```diff
+ const texture = textureLoder.load('./textures/minecraft.png')
 const basicMaterial = new THREE.MeshBasicMaterial({
   color: '#ffff00',
+  map: texture
 })
```

# 3. 纹理显示设置
> 自动计算
> 如果放大或者缩小的时候，纹理的像素也要进行改变（放大滤镜）
>  
> 默认值是LinearFilter，最近的四个纹理元素的加权平均值
> NearestFilter 是与指定纹理坐标（在曼哈顿距离之内）最接近的纹理元素的值
```ts
texture.minFilter = THREE.NearestFilter
texture.magFilter = THREE.NearestFilter
```