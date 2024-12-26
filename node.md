<!--
 * @Author: caixin caixin185@163.com
 * @Date: 2024-12-25 11:06:57
 * @LastEditors: caixin
-->
# 1.在目录下执行命令
const path = require('path')
exports.exec = function(path,command){
  const {exec} = require('child_process')
  return new Promise((res,rej) => {
    exec(command,{cwd:path.join(path.join(__dirname, "../"), path)},(error,stdout,stderr)=>{
      if(error){
        console.error(error)
        console.error(stderr)
        rej({error,stdout,stderr})
      }else{
        console.info(stdout)
        res({error,stdout,stderr})
      }
    })
  })
}