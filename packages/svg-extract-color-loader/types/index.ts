import type { Plugin } from 'posthtml'
export type Mode = 'development' | 'production'

/**
 * 任意类型对象
 */
export interface IAnyObj<T = string> {
  [props: string]: T,
}

/**
 * 遍历svg posthml插件配置
 */
export interface IWalkSvgPosthmlPluginOptions {
  cssVariableName: string,
}

/**
 * 遍历svg posthml插件
 */
export type IWalkSvgPosthmlPlugin = (options: IWalkSvgPosthmlPluginOptions) => Plugin<void>
