import qs from 'querystring'
import {
  colorReg,
  includeColorReg,
} from '../utils/validator'
import type {
  IAnyObj,
} from '../../types/index'

/**
 * 获取字符串中的所有颜色
 */
export const getColors = (str = ''): Array<string> => {
  includeColorReg.lastIndex = 0
  const colors: Array<string> = []
  let res = includeColorReg.exec(str)
  while (res) {
    colors.push(res[0])
    res = includeColorReg.exec(res.input)
  }
  return [...(new Set(colors))]
}

/**
 * 判断字符串中是否包含颜色
 */
export const hasIncludeColor = (str = ''): boolean => {
  includeColorReg.lastIndex = 0
  return includeColorReg.test(str)
}

/**
 * 判断字符串是否为颜色
 */
export const hasColor = (str = ''): boolean => {
  colorReg.lastIndex = 0
  return colorReg.test(str)
}

/**
 * 判断字符串中是否只存在一种颜色
 */
export const hasOnlyColor = (str = ''): boolean => {
  const colors = getColors(str)
  return colors.length === 1
}

/**
 * 移除两端的"
 */
export const removeDoubleQuotes = (str = ''): string => {
  return str.replace(/(^")|("$)/g, '')
}

/**
 * 获取配置的参数
 */
export function getOptions (query?: string | IAnyObj): IAnyObj {
  if (typeof query === 'string') {
    return (qs.parse(query.replace(/^\?/, '')) || {}) as IAnyObj
  }
  return query || {}
}
