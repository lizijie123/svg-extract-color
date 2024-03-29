import type { Plugin } from 'posthtml'

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
