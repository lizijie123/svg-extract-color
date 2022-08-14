import * as utils from '@utils/index'
import type {
  IWalkSvgPosthmlPlugin,
} from '@defineds/index'

/**
 * 该posthtml插件功能如下
 * 颜色属性值修改为传入的css变量名
 */
const walkSvgPosthmlPlugin: IWalkSvgPosthmlPlugin = (options) => {
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

export default walkSvgPosthmlPlugin
