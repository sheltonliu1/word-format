const { ipcMain, Notification } = require('electron');
const path = require('path')
const fs = require('fs')
const getProtocalPath  = require("../util/getProtocalPath");

// 获取本地数据
ipcMain.handle('project:list', async (event) => {
  const dirPath = await getProtocalPath(false);
  const projects = [];
  const directoryPath = path.resolve(dirPath + '/projects/');
  if(dirPath) {
    const files = fs.readdirSync(directoryPath);
    files.forEach(file => {
      if (path.extname(file) === '.json') {
        const filePath = path.join(directoryPath, file);
  
        const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
        try {
          const jsonData = JSON.parse(content);
          projects.push(jsonData);
          console.log(`File: ${file} - Content:`, jsonData);
        } catch (error) {
          console.log('Error parsing JSON data from file:', error);
        }
      }
    });
  } else {
    // mainWindow.webContents.send('message:show', "路径选择错误，请重新选择")
    const notify = new Notification();
    notify.show('路径选择错误，请重新选择');
  }
  return projects;
})
