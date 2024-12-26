/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-12-25 11:43:25
 */
const fsPromises = require('fs/promises');
const path = require('path');

// 强制删除文件夹及文件
exports.rm = function (dirPath) {
  return fsPromises.rm(dirPath, { recursive: true, force: true });
}