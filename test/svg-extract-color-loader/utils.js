const fs = require('fs')

/**
 * 获取所有svg文件
 */
function getSvgFile (fileName) {
  return fs.readFileSync(`${process.cwd()}/test/svg-extract-color-loader/svg/${fileName}`, 'utf-8')
}

/**
 * 移除中括号以外的空格与xml标签
 */
function removeSpaceAndXml (content) {
  const res = content.match(/<.*>/ig)
  return res.join('').replace(/<\?xml[^>]*>/ig, '')
}

module.exports = {
  getSvgFile,
  removeSpaceAndXml,
}
