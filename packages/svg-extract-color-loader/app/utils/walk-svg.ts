import posthtml from 'posthtml'
import * as utils from '../utils/index'

/**
 * 该posthtml插件功能如下
 * 颜色属性值修改为--color
 */
const walkSvgPosthmlPlugin: () => posthtml.Plugin<void> = () => {
  return tree => {
    tree.walk(node => {
      if (node?.attrs) {
        Object.entries(node.attrs).map(([key, value]) => {
          if (value && utils.hasColor(`"${value}"`)) {
            Object.assign(node.attrs, {
              [key]: `var(--color, ${value})`,
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
async function walkSvg (svgContent: string): Promise<string> {
  const res = await posthtml([
    walkSvgPosthmlPlugin(),
  ]).process(svgContent)
  const newSvg = `
    <?xml version="1.0" encoding="UTF-8"?>
    ${res.html}
  `
  return newSvg
}

export default walkSvg
