/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-12-25 11:37:34
 */
const { series, parallel } = require('gulp');
const fsPromises = require('fs/promises');
const path = require('path')

// 返回路径,如果修改文件位置请修改代码
const getPath = (dir) => {
  return path.join(path.join(__dirname, "../"), dir)
};
exports.packWinorMac = series(
  // 主进程和渲染进程同时进行打包
  parallel(
    series(clean('./packages/main/dist'), build_main),
    series(clean('./packages/web/dist'), build_web)),
  clean('./.cache'),
  copyDist
)

// recursive: true 表示递归复制
exports.copyDist = async function () {
  //主进程
  await fsPromises.cp('./packages/main/dist', './.cache/main', { recursive: true })
  //渲染进程
  await fsPromises.cp('./packages/web/dist', './.cache/web', { recursive: true })
  let packageJson = await readFile('./packages/main/package.json')
  packageJson = JSON.parse(packageJson)

  await writeFile('./.cache/package.json', JSON.stringify(packageJson, null, 2))
  await fsPromises.cp('./assets', './.cache/assets')
  await exec('./.cache', 'npm install --force --omit dev')

}

// 文件读取
exports.readFile = async function (path) {
  return fsPromises.readFile(path, { encoding: 'utf-8' })
}
// 文件写入
exports.writeFile = async function (path, data) {
  const bufferData = Buffer.from(data, 'utf-8')
  return fsPromises.writeFile(path, bufferData)
}
// 目录下执行命令
exports.exec = function (path, command) {
  const { exec } = require('child_process')
  return new Promise((res, rej) => {
    exec(command, { cwd: getPath(path) }, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        console.error(stderr);
        rej({ error, stdout, stderr })
      } else {
        console.info(stdout);
        res({ error, stdout, stderr })
      }
    });
  })
}