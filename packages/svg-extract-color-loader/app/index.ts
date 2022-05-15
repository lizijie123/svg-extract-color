import * as utils from './utils/index'
import walkSvg from './utils/walk-svg'

async function content (content: string): Promise<void> {
  const callback = this.async()
  try {
    const colors = utils.getColors(content)
    // TODO 暂时只处理单个颜色的svg
    if (colors.length === 1) {
      const newSvgContent = await walkSvg(content)
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
