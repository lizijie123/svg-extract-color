import posthtml from 'posthtml'
import * as utils from '../utils/index'
import type {
  IWalkSvgPosthmlPluginOptions,
} from '../../types/index'

/**
 * 该posthtml插件功能如下
 * 颜色属性值修改为传入的css变量名
 */
const walkSvgPosthmlPlugin: (options: IWalkSvgPosthmlPluginOptions) => posthtml.Plugin<void> = (options) => {
  const {
    cssVariableName,
  } = options

  return tree => {
    tree.walk(node => {
      if (node?.attrs) {
        Object.entries(node.attrs).map(([key, value]) => {
          if (value && utils.hasColor(`"${value}"`)) {
            Object.assign(node.attrs, {
              [key]: `var(${cssVariableName}, ${value})`,
            })
          }
        })
      }
      return node
    })
  }
}

/**
 * 调用walkSvgPosthmlPlugin插件 遍历svg所有节点
 */
async function walkSvg (svgContent: string, cssVariableName: string): Promise<string> {
  const res = await posthtml([
    walkSvgPosthmlPlugin({
      cssVariableName,
    }),
  ]).process(svgContent)
  return res.html
}

export default walkSvg
