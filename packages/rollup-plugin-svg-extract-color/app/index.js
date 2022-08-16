import fs from 'fs-extra'
import path from 'path'

function svgExtractColor (options = {}) {
  const { outputDir } = options

  if (!outputDir) {
    throw new Error('outputDir is not null')
  }

  const svgs = new Map()

  return {
    name: 'svg-extract-color',
    transform(code, id) {
      if (!id.endsWith('.svg')) return null

      const pathObj = path.parse(id)
      const svgUrl = `${outputDir}/${pathObj.base}`
      svgs.set(svgUrl, code)
      return {
        code: `export default "${svgUrl}"`,
      }
    },
    async writeBundle(outputOption) {
      for (const [key, value] of svgs) {
        await fs.outputFile(`${outputOption.dir}/${key}`, value) 
      }
    }
  }
}

export default svgExtractColor
