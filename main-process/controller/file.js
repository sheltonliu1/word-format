const { ipcMain, Notification } = require('electron');
const path = require('path')
const fs = require('fs')
const parseDir = require("../util/parseDir");
const getProtocalPath  = require("../util/getProtocalPath");

// 获取本地数据
ipcMain.handle('file:list', async (event) => {
  const dirPath = await getProtocalPath(false);
  // const interfaceArr = [];
  const structsMap = [];
  const structPath = path.join(dirPath, 'structs')
  if(dirPath) {
    parseDir(structPath, structsMap);
  } else {
    // mainWindow.webContents.send('message:show', "路径选择错误，请重新选择")
    const notify = new Notification();
    notify.show('路径选择错误，请重新选择');
  }
  return structsMap;
})

ipcMain.handle('file:detail', async (event, filePath) => {
  const wholeFilePath = path.join(protocalBasePath, filePath);
  const content = fs.readFileSync(wholeFilePath, { encoding: "utf-8" });
  return content;
})

ipcMain.handle('file:save', async (event, filePath, content) => {
  const wholeFilePath = path.join(protocalBasePath, filePath);
  let prePath = wholeFilePath.substring(0, wholeFilePath.lastIndexOf("/"));
  if(!prePath) {
    // windows系统
    prePath = wholeFilePath.substring(0, wholeFilePath.lastIndexOf("\\"));
  }
  if(!fs.existsSync(prePath)) {
    fs.mkdirSync(prePath, { recursive: true });
  }
  const res = fs.writeFileSync(wholeFilePath, content, { encoding: "utf-8" });
  return res;
})

ipcMain.handle('file:addDir', async (event, filePath) => {
  const wholeFilePath = path.join(protocalBasePath, filePath);
  const res = fs.mkdirSync(wholeFilePath);
  return res;
})
ipcMain.handle('file:addFile', async (event, filePath, infoStr) => {
  const info = JSON.parse(infoStr);
  // let tempPath = 'interfaces/' + info.path;
  // if(!tempPath.endsWith('.json')) {
  //   tempPath += '.json';
  // }
  const wholeFilePath = path.join(protocalBasePath, filePath);
  let prePath = wholeFilePath.substring(0, wholeFilePath.lastIndexOf("/"));
  if(!prePath) {
    // windows系统
    prePath = wholeFilePath.substring(0, wholeFilePath.lastIndexOf("\\"));
  }
  if(!fs.existsSync(prePath)) {
    fs.mkdirSync(prePath, { recursive: true });
  }
  const res = fs.writeFileSync(wholeFilePath, JSON.stringify([{
    ...info
  }], null, 2), { encoding: "utf-8" });
  return res;
})
ipcMain.handle('file:remove', async (event, filePath) => {
  const wholeFilePath = path.join(protocalBasePath, filePath);
  const file = fs.lstatSync(wholeFilePath);
  if(file.isFile()) {
    const res = fs.unlinkSync(wholeFilePath);
    return res;
  } else if (file.isDirectory()) {
    const res = fs.rmdirSync(wholeFilePath);
    return res;
  }
  return '';
})
ipcMain.handle('file:rename', async (event, filePath, newPath) => {
  const wholeFilePath = path.join(protocalBasePath, filePath);
  const file = fs.lstatSync(wholeFilePath);
  let wholeNewPath = path.join(protocalBasePath, newPath);

  let prePath = wholeNewPath.substring(0, wholeNewPath.lastIndexOf("/"));
  if(!prePath) {
    // windows系统
    prePath = wholeNewPath.substring(0, wholeNewPath.lastIndexOf("\\"));
  }
  if(!fs.existsSync(prePath)) {
    fs.mkdirSync(prePath, { recursive: true });
  }
  if(file.isFile() && !wholeNewPath.endsWith('.json')) {
    wholeNewPath += '.json';
  }
  const res = fs.renameSync(wholeFilePath, wholeNewPath);
  return res;
})