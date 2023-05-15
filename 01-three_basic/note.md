# 本地搭建three.js官方网站
官网 https://threejs.org/
中文官网 http://www.webgl3d.cn/
在官网点击`github`跳转到 https://github.com/mrdoob/three.js/

![typora.jpg](./noteImg/20230515145456.png)

# 使用Parcel搭建three.js环境
官网 https://parceljs.org/
中文官网 https://www.parceljs.cn/

## 1. 初始化项目
```sh
npm init -y
```

## 2.  在根目录下添加.gitignore 文件
```sh
node_modules
```
忽略 node_modules文件

## 3.  安装Parcel
```sh
npm install parcel-bundler --save-dev
```

## 4. 创建目录结构
```sh
- src
  - assets                静态文件
    - css
    - imgs
  - index.html
  - main.ts
```

### 1.1 修改 package.json
```json
{
  "name": "01-three_basic",
  "version": "1.0.0",
  "description": "",
  "main": "src/main.js",
  "scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel src/index.html"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "parcel-bundler": "^1.8.1"
  },
  "dependencies": {
    "three": "^0.152.2"
  }
}
```

### 1.2 main.ts导入 three.js
```ts
import * as THREE from 'three'
console.log(THREE)
```

