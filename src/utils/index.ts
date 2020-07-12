/**
 * @description:
 * @author: zs
 * @Date: 2020-06-14 13:01:40
 * @LastEditTime: 2020-07-12 16:53:24
 * @LastEditors: zs
 */

import cloneDeep from 'lodash/cloneDeep'

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
export const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export function arrayToTree(array, id = 'id', pid = 'pid', children = 'children') {
  const data = cloneDeep(array)
  const result = []
  const hash = {}
  data.forEach((_item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    const hashVP = hash[item[pid]]
    if (hashVP) {
      if (!hashVP[children]) {
        hashVP[children] = []
      }
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
