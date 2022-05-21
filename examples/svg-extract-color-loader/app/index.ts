// 全量引入 SVG，并通过 svg-sprite-loader 将 SVG 内联到html中
const requireContext = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(requireContext)

/**
 * 创建内联 SVG 标签
 * @param iconName SVG 图标名
 * @param color SVG 颜色
 */
function createSvg (iconName: string, color?: string) {
  // 元素命名空间
  const ns = 'http://www.w3.org/2000/svg'
  // xlink命名空间
  const childNs = 'http://www.w3.org/1999/xlink'

  // 创建svg标签
  const svg = document.createElementNS(ns, 'svg')
  svg.setAttribute('xmlns', ns)

  // 创建use标签
  const use = document.createElementNS(ns, 'use')
  use.setAttributeNS(childNs, 'xlink:href', `#icon-${iconName}`)
  if (color) {
    use.setAttribute('style', `--color-test: ${color}`)
  }
  svg.appendChild(use)
  document.body.appendChild(svg)
}
// 创建默认颜色svg
createSvg('complex')
// 创建红色的svg
createSvg('complex', 'red')
// 创建蓝色的svg
createSvg('complex', 'blue')

// hot-reload
if ((module as any).hot) {
  (module as any).hot.accept()
}