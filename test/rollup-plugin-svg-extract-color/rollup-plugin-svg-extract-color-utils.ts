import * as utils from './utils'
import rollupPluginSvgExtractColor from '@svg-extract-color/rollup-plugin-svg-extract-color'

class RollupPluginSvgExtractColorUtils {
  /**
   * 编译输出子目录
   */
  subdirectory: string

  constructor () {
    this.subdirectory = 'dist'
  }

  /**
   * 执行 rollup-plugin-svg-extract-color
   */
  async runRollupPluginSvgExtractColor (svgContent: string, svgName: string): Promise<string> {
    const { transform, writeBundle } = rollupPluginSvgExtractColor() as any
    await transform(svgContent, svgName)
    writeBundle({
      dir: `${process.cwd()}/test/rollup-plugin-svg-extract-color/${this.subdirectory}`
    })
    return utils.getSvgFile(svgName, this.subdirectory)
  }
}

export default new RollupPluginSvgExtractColorUtils()
