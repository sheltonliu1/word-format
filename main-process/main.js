const { app, BrowserWindow } = require('electron');
const path = require('path')
const initMenu = require('./util/initMenu')

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 960,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
    },
  });
  initMenu(win);
  // ipcMain.handle('ping', () => 'pong');
  // win.loadFile('web/index.html');
  // 注册监听
  require('./controller/index.js');
  // win.loadURL('https://yka-editor-web-1g0zbban1800124a-1252574745.ap-shanghai.app.tcloudbase.com/')
  win.loadURL('http://localhost:5173/')
  // const options = {"extraHeaders" : "pragma: no-cache\n"}
  // win.loadURL('https://my-bucket-o71cczy-1252574745.cos-website.ap-guangzhou.myqcloud.com/editor/', options)

  win.webContents.openDevTools()
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
