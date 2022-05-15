const utils = require('./utils')
const { testSvg, targetSvg } = require('./svg-test')

describe('constants', () => {
  it("svg-extract-color-loader", async () => {
    const svgResult = await utils.runSvgExtractColorLoader(testSvg)
    expect(svgResult).toBe(utils.removeSpace(targetSvg))
  })
})
