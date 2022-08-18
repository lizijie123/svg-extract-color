import * as utils from './utils'
import rollupPluginSvgExtractColorUtils from './rollup-plugin-svg-extract-color-utils'

describe('constants', () => {
  it('svg-extract-color-loader', async () => {
    const svgName = 'test.svg'
    // 需要编译的svg
    const currentSvg = utils.getSvgFile(svgName)
    // 编译的目标svg
    let targetSvg = currentSvg.replace(/#000000/ig, 'var(--color, #000000)')

    // 开始编译svg，获取编译后的svg
    let doneSvg = await rollupPluginSvgExtractColorUtils.runRollupPluginSvgExtractColor(currentSvg, svgName)
    
    // 移除尖括号外的空格
    targetSvg = utils.removeSpaceAndXml(targetSvg)
    doneSvg = utils.removeSpaceAndXml(doneSvg)

    // 比对
    expect(targetSvg).toBe(doneSvg)
  })
})
