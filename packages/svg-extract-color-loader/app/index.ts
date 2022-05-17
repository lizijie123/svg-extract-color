import * as utils from './utils/index'
import walkSvg from './utils/walk-svg'
import { CSS_VARIABLE_DEFAULT_NAME } from './utils/constants'

async function content (content: string): Promise<void> {
  const callback = this.async()

  const {
    cssVariableName = CSS_VARIABLE_DEFAULT_NAME,
  } = utils.getOptions(this.query)

  try {
    const colors = utils.getColors(content)
    // TODO 暂时只处理单个颜色的svg
    if (colors.length === 1) {
      const newSvgContent = await walkSvg(content, cssVariableName)
      callback(null, newSvgContent)
    } else {
      callback(null, content)
    }
  } catch (err) {
    console.warn('svg-extract-color-loader', err)
    callback(null, content)
  }
}

export default content
