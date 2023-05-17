# 目标： 通过clock跟踪时间处理动画
> 让物体绝对匀速运动，消除requestAnimationFrame方式相同时间内单位内位移不确定

```diff
+   const clock = new THREE.Clock()
-  const render = (time?) => {
+   const render = () => {
-   // 请求帧动画方法，内部的回调函数中会自带一个默认参数，他是请求动画帧执行回调函数的时间
-    // console.log(time);
-    // 求余表示在余数范围内变化


+   // 获取时钟运行的总时长
+   const time = clock.getElapsedTime()
+   // 获取间隔时间
+   // const deltaTime = clock.getDelta()
+   console.log('获取时钟运行的总时长：', time);
+   // console.log('两次获取时间的间隔时间：', deltaTime);
-    const t = (time / 1000) % 5
+    const t = time % 5
     cube.position.x = 1 * t

     if (cube.position.x > 5) {
       cube.position.x = 0;
     }
 
     cube.rotation.x += 0.01
 
     renderer.render(scene, camera)
     // 渲染下一针的时候就要调用render函数
     requestAnimationFrame(render)
   }
```