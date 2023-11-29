const { app, dialog } = require('electron');
const path = require('path')
const fs = require('fs')

async function getProtocalPath (forceOpen = false) {
  // 检查是否有指定协议文件目录，有则解析协议tree，无则弹窗选择目录
  const dataPath = path.join(app.getPath('userData'), 'data.json')
  let dirPath = '';
  if(fs.existsSync(dataPath)) {
    dirPath = fs.readFileSync(dataPath, { encoding: "utf-8" });
  }
  if(!dirPath || !fs.existsSync(dataPath) || forceOpen) {
    const chosenPathArr = dialog.showOpenDialogSync({ properties: ['openDirectory'] })
    
    if(chosenPathArr && chosenPathArr.length) {
      const chosenPath = chosenPathArr[0];
      if(chosenPath.endsWith('protocol')) {
        dirPath = chosenPath;
      } else {
        let hasRightPath = false;
        fs.readdirSync(chosenPath, { withFileTypes: true }).forEach(dirent => {
          if (dirent.isDirectory() && dirent.name === 'yka-protocol') {
            dirPath = path.join(chosenPath, dirent.name)
            hasRightPath = true;
          }
        })
        if (!hasRightPath) {
          // 目录选择错误，提示用户
          return false;
        }
      }
      fs.writeFileSync(dataPath, dirPath);
    } else {
      // 未选择，则重来
      getProtocalPath();
    }
  }
  protocalBasePath = dirPath;
  return dirPath;
}

module.exports = getProtocalPath;
