import path from 'path'
import * as utils from '@utils/index'
import {
  walkSvg,
  colorTool,
} from '@svg-extract-color/svg-extract-color-core'
import { CSS_VARIABLE_DEFAULT_NAME } from '@utils/constants'
import type { Plugin } from 'rollup'
import type { ISvgExtractColorOptions } from '@defineds/index'

function svgExtractColor (options: ISvgExtractColorOptions = {}): Plugin {
  const name = 'svg-extract-color'
  const {
    outputDir = '',
    cssVariableName = CSS_VARIABLE_DEFAULT_NAME,
  } = options

  const svgs = new Map()

  return {
    name,
    async transform (code, id) {
      if (!id.endsWith('.svg')) return

      const pathObj = path.parse(id)
      const svgUrl = `${outputDir}/${pathObj.base}`

      let newCode = code
      try {
        const colors = colorTool.getColors(code)
        // TODO 暂时只处理单个颜色的svg
        if (colors.length === 1) {
          newCode = await walkSvg(code, cssVariableName)
        }
      } catch (err) {
        console.warn(name, err)
      }
      svgs.set(svgUrl, newCode)

      return {
        code: `export default "${svgUrl}"`,
      }
    },
    async writeBundle(outputOption) {
      for (const [key, value] of svgs) {
        utils.setFile(`${outputOption.dir}/${key}`, value)
      }
    }
  }
}

export default svgExtractColor
