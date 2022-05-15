import cssAllowColors from '../utils/color-config'

/**
 * 匹配currentColor
 */
const currentColorReg = /"currentColor"/

/**
 * 匹配#000-#fff表示法的颜色
 */
const hexadecimalReg = /"#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})"/

/**
 * 匹配rgba表示法的颜色
 */
const rgbaReg = /"rgba?\((\s*((2[0-4]\d)|(25[0-5])|([01]?\d\d?)),){2}\s*((2[0-4]\d)|(25[0-5])|([01]?\d\d?)),?\s*(0\.\d{1,2}|1|0)?\)"/

/**
 * 匹配英文的颜色
 */
const colorChatSource = cssAllowColors.map(allowColor => {
  return `"${allowColor}"`
}).join('|')
const colorChatReg = new RegExp(colorChatSource)

/**
 * 匹配currentColor 或 #000-#fff表示法的颜色 或rgba表示法的颜色 或 英文的颜色
 */
export const colorReg = new RegExp(`^(${currentColorReg.source})|(${hexadecimalReg.source})|(${rgbaReg.source})|(${colorChatReg.source})$`, 'ig')

/**
 * 匹配是否包含 currentColor 或 #000-#fff表示法的颜色 或rgba表示法的颜色 或 英文的颜色
 */
export const includeColorReg = new RegExp(`(${currentColorReg.source})|(${hexadecimalReg.source})|(${rgbaReg.source})|(${colorChatReg.source})`, 'ig')
