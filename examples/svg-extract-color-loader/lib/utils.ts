import path from 'path'

/**
 * 根据传入的相对跟目录路径计算绝对路径
 * @param pathname: 相对路径
 * @returns 绝对路径
 */
export const fixedToRelativePath = (pathname: string): string => path.join(process.cwd(), pathname)

/**
 * 根据传入的相对路径计算绝对路径
 * @param pathname: 相对路径
 * @returns 绝对路径
 */
export const absoluteToRelativePath = (pathname: string): string => path.join(__dirname, pathname)
