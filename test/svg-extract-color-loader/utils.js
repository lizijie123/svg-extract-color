const { default: svgExtractColorLoader } = require('../../packages/svg-extract-color-loader/dist/index')

/**
 * loader上下文对象
 */
const context = {
  result: '',
  async: () => callback
}

function callback (err, content) {
  if (err) throw err
  context.result = content
}

/**
 * 移除中括号以外的空格
 */
function removeSpace (content) {
  const res = content.match(/<.*>/ig)
  return res.join('')
}

/**
 * 执行svg-extract-color-loader
 */
async function runSvgExtractColorLoader (content) {
  await svgExtractColorLoader.call(context, content)
  return removeSpace(context.result)
}

module.exports = {
  removeSpace,
  runSvgExtractColorLoader,
}
