import posthtml from 'posthtml'
import walkSvgPosthmlPlugin from '@walk-svg/walk-svg-posthml-plugin'

/**
 * 调用walkSvgPosthmlPlugin插件，遍历svg所有节点，并返回处理后的svg
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
