<!--
 * @description: 
 * @author: zs
 * @Date: 2020-06-10 18:01:37
 * @LastEditTime: 2020-06-12 15:10:35
 * @LastEditors: zs
--> 
npm init -y
npm install typescript purgecss-webpack-plugin glob @babel/preset-react @babel/preset-typescript copy-webpack-plugin @babel/plugin-transform-runtime @babel/runtime core-js@2 @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/core @babel/preset-env babel-loader url-loader file-loader optimize-css-assets-webpack-plugin terser-webpack-plugin  postcss-loader autoprefixer less-loader less  style-loader css-loader mini-css-extract-plugin webpack webpack-cli webpack-dev-server webpack-merge html-webpack-plugin html-webpack-plugin clean-webpack-plugin --save-dev

npm i @types/react @types/react-dom -D
npm i react react-dom antd @ant-design/icons -S

// 配置eslint，采用airbnb -> react

npm i eslint-config-airbnb-typescript eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y --D
npm i @typescript-eslint/parser @typescript-eslint/eslint-plugin -D

项目资源下载
npm i cross-env babel-plugin-import -D
npm i dva dva-model-extend antd immer lodash moment nprogress prop-types qs query-string path-to-regexp @ant-design/icons -S