import fs from 'fs'

/**
 * 获取svg文件
 */
export function getSvgFile (fileName: string, subdirectory = 'svg'): string {
  return fs.readFileSync(`${process.cwd()}/test/rollup-plugin-svg-extract-color/${subdirectory}/${fileName}`, 'utf-8')
}

/**
 * 移除中括号以外的空格与xml标签
 */
export function removeSpaceAndXml (content: string): string {
  if (!content) return ''
  const res = content.match(/<.*>/ig)
  return res.join('').replace(/<\?xml[^>]*>/ig, '')
}
