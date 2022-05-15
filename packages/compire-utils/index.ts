import fs from 'fs'
import path from 'path'
import type {
  IAnyObj,
} from '../../types/utils'

/**
 * 根据传入的相对跟目录路径计算绝对路径
 * @param pathname: 相对路径
 * @returns 绝对路径
 */
export const fixedToRelativePath = (pathname: string): string => path.join(process.cwd(), pathname)

/**
 * 根据传入的相对路径计算绝对路径
 * @param pathname: 相对路径
 * @returns 绝对路径
 */
export const absoluteToRelativePath = (pathname: string): string => path.join(__dirname, pathname)

/**
 * 获取当前目录下node_modules文件夹中的所有模块
 * @returns 当前目录下node_modules文件夹中的所有模块
 */
export const getExternalModules = (): IAnyObj => {
  const nodeModules = {}
  fs.readdirSync('node_modules')
    .filter(filename => {
      return ['.bin'].indexOf(filename) === -1
    })
    .forEach(mod => {
      nodeModules[mod] = `commonjs ${mod}`
    })
  return nodeModules
}
