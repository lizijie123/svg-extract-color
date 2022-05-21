const utils = require('./utils')
const { default: svgExtractColorLoaderUtils } = require('./svg-extract-color-loader-utils')

describe('constants', () => {
  it("svg-extract-color-loader", async () => {
    // 需要编译的svg
    const currentSvg = utils.getSvgFile('test.svg')
    // 编译的目标svg
    let targetSvg = currentSvg.replace(/#000000/ig, 'var(--color, #000000)')

    // 开始编译svg，获取编译后的svg
    let doneSvg = await svgExtractColorLoaderUtils.runSvgExtractColorLoader(currentSvg)
    
    // 移除尖括号外的空格
    targetSvg = utils.removeSpaceAndXml(targetSvg)
    doneSvg = utils.removeSpaceAndXml(doneSvg)

    // 比对
    expect(targetSvg).toBe(doneSvg)
  })
})
