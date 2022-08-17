import fs from 'fs'

/**
 * 创建文件路径
 */
export function mkdir (filePath: string): void {
  const filePathArr = filePath.split('/')
  filePathArr.pop()
  let dirName = ''
  for (const filePathName of filePathArr) {
    dirName = `${dirName}/${filePathName}`
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName)
    }
  }
}

/**
 * 将文件内容写入文件中
 */
export function setFile (filePath: string, content: string): void {
  // 判断文件路径是否存在
  if (!fs.existsSync(filePath)) {
    // 文件路径不存在则创建路径
    mkdir(filePath)
  }

  // 创建新的文件并写入
  fs.writeFileSync(filePath, content)
}