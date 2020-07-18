<!--
 * @description: 
 * @author: zs
 * @Date: 2020-06-10 18:01:37
 * @LastEditTime: 2020-07-18 12:00:31
 * @LastEditors: zs
--> 
## 技术栈说明

> react(16.9) + antd4.x + webpack4.0 + eslint + typeScript + less

## 开发

```js
// 开发环境启动
npm run start 或者 yarn start

// 生产环境打包
npm run build 或者 yarn build
```





## 初始化项目
```js
npm init -y
npm install typescript purgecss-webpack-plugin glob @babel/preset-react @babel/preset-typescript copy-webpack-plugin @babel/plugin-transform-runtime @babel/runtime core-js@2 @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/core @babel/preset-env babel-loader url-loader file-loader optimize-css-assets-webpack-plugin terser-webpack-plugin  postcss-loader autoprefixer less-loader less  style-loader css-loader mini-css-extract-plugin webpack webpack-cli webpack-dev-server webpack-merge html-webpack-plugin html-webpack-plugin clean-webpack-plugin add-asset-html-webpack-plugin --save-dev

npm i @types/react @types/react-dom -D
npm i react react-dom antd @ant-design/icons -S
```



## 配置eslint，采用airbnb -> react

```js
npm i eslint-config-airbnb-typescript eslint eslint-loader eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y --D
npm i @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```



## 项目资源下载
```js
npm i cross-env babel-plugin-import -D
npm i dva dva-model-extend dva-loading antd immer lodash moment nprogress prop-types qs query-string path-to-regexp @ant-design/icons axios -S
```



## 遗留问题

### 1.css模块化时使用这个插件去除css无用代码

```js
  new PurgeCssWebpackPlugin({
    paths: glob.sync("./src/**/*", {
      nodir: true
    })
  }),
```



> 在css模块化时使用这个插件去除css无用代码时，没有将css中无用的的样式全部删除掉，目前没有找到解决方式



### 2.js文件的热更新没有实现，只有style文件的热更新



### 3.ts文件导入问题

```javascript
a.js
export type A = any
const fn = () => {}
export default fn

b.js
import fn, { A } from './a.js'
export {
  fn,
  A,
}
// 这样b.js会报警告
"export 'A' was not found in './a'
```



### 4.react的语法错误显示问题，其余目前都可以展示在浏览器上

```
{/* <div>{{}}</div> */}
```

这样的错误在浏览器不显示，只有在控制台中才能看到

### 5.对于ie9-ie10，在ie浏览器上运行，页面空白，报错，不支持，待解决










