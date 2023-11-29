const { Menu, app } = require("electron");
const getProtocalPath  = require("./getProtocalPath");
const process = require("process");

const initMenu = (mainWindow) => {
  const template = [
    {
      label: "配置",
      submenu: [
        {
          click: async () => {
            const res = await getProtocalPath(true);
            if (res) {
              mainWindow.webContents.send('file:update-list')
            } else {
              mainWindow.webContents.send('message:show', "路径选择错误，请重新选择")
            }
            
          },
          label: "选择目录",
        },
      ],
    },
    {
      label: "调试",
      submenu: [
        {
          click: async () => {
            mainWindow.webContents.openDevTools()
          },
          label: "打开调试",
        },
      ],
    },
    {
      label: '编辑',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    }
  ];
  if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    });
}

  const menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
};

module.exports = initMenu;
