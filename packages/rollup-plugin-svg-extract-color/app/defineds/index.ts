/**
 * svg-extract-color 插件可选参数
 */
export interface ISvgExtractColorOptions {
  /**
   * 输出路径，默认为 output.dir
   */
  outputDir?: string,
  /**
   * 用于设置 SVG 中使用的 CSS 变量名，这会影响use标签中传入的 CSS 变量名，默认值为: `--color`
   */
  cssVariableName?: string,
}