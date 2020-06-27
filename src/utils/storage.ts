/**
 * @description: localStorage
 * @author: zs
 * @Date: 2020-06-13 21:08:43
 * @LastEditTime: 2020-06-27 17:00:19
 * @LastEditors: zs
 */

/* global window */

const { localStorage } = window;

/**
 * 获取所有存储的数据
 */
function valueOf() {
  return localStorage.valueOf()
}

/**
 * 清空localStorage
 */
function clear() {
  localStorage.clear()
}

/**
 * 存储数据
 * @param {键} key
 * @param {值} value
 */
function setItem(key: string, value: any) {
  localStorage.setItem(key, value)
}

/**
 * 读取数据
 * @param {键} key
 */
function getItem(key: string) {
  return localStorage.getItem(key)
}

/**
 * 删除某个变量
 * @param {键} key
 */
function removeItem(key: string) {
  localStorage.removeItem(key)
}

/**
 * 检查localStorage里是否保存某个变量
 * @param {键} key
 */
function hasOwnProperty(key: string) {
  return Object.prototype.hasOwnProperty.call(localStorage, key)
}

const storage = {
  valueOf,
  clear,
  setItem,
  getItem,
  removeItem,
  hasOwnProperty,
};

export default storage;
