# 目标： requestAnimationFrame 时间参数 控制物体动画

```diff
-   const render = () => {
+  const render = (time?) => {
-    cube.position.x += 0.01
+    // 请求帧动画方法，内部的回调函数中会自带一个默认参数，他是请求动画帧执行回调函数的时间
+    // console.log(time);
+    // 求余表示在余数范围内变化
+    const t = (time / 1000) % 5
+    cube.position.x = 1 * t

     if (cube.position.x > 5) {
       cube.position.x = 0;
     }
 
     cube.rotation.x += 0.01
 
     renderer.render(scene, camera)
     // 渲染下一针的时候就要调用render函数
     requestAnimationFrame(render)
   }
```