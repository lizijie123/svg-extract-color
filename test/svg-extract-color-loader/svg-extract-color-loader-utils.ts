import svgExtractColorLoader from '@svg-extract-color/svg-extract-color-loader'

class SvgExtractColorLoaderUtils {
  /**
   * 创建loader的上下文对象
   */
  createContext () {
    const callback = (err, content) => {
      if (err) throw err
      context.result = content
    }
    /**
     * loader上下文对象
     */
    const context = {
      result: '',
      async: () => callback
    }

    return context
  }

  /**
   * 执行svg-extract-color-loader
   */
  async runSvgExtractColorLoader (svgContent: string): Promise<string> {
    const context = this.createContext()
    await svgExtractColorLoader.call(context, svgContent)
    return context.result
  }
}

export default new SvgExtractColorLoaderUtils()
