# 目标：掌握gsap设置各种动画效果
# 1. 导入动画库
```ts
import gsap from 'gsap'
```

# 2.设置动画
## 2.1 向前移动到5，用时5,速率先慢后快再慢
```diff
+  const animation = gsap.to(cube.position, {
+    x: 5,
+    // 设置重复的次数，设置无限次循环就是-1
+    repeat: -1,
+    // 往返运动
+    yoyo: true,
+    // 延时2秒开始运动
+    delay: 2,
+    duration: 5,
+    ease: "power1.inOut", onComplete: () => {
+      console.log('动画完成');
+    },
+    onStart: () => {
+      console.log('动画开始');
+    }
+  })
```

## 2.2 旋转360，用时5,速率先慢后快再慢
```diff
+ gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut" })

   const render = () => {
-    // 获取时钟运行的总时长
-    const time = clock.getElapsedTime()
-    // 获取间隔时间
-    // const deltaTime = clock.getDelta()
-    console.log('获取时钟运行的总时长：', time);
-    // console.log('两次获取时间的间隔时间：', deltaTime);
-
-    const t = time % 5
-    cube.position.x = 1 * t
-
-    // cube.position.x += 0.01
-    if (cube.position.x > 5) {
-      cube.position.x = 0;
-    }
-
-    cube.rotation.x += 0.01
-
    renderer.render(scene, camera)
    // 渲染下一针的时候就要调用render函数
     requestAnimationFrame(render)
 }
```

## 2.3 双击屏幕，如果正在运行，双击停止。否则运动
```diff
+  window.addEventListener('dblclick', () => {
+    console.log(animation);
+
+    if (animation.isActive()) {
+      animation.pause()
+    } else {
+      animation.resume()
+    }
+  })
```
