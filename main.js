
const path = require('path');
// const url = require('url');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

const isDev = require("electron-is-dev");
// asar extract app.asar my-app
// const indexUrl = isDev ? devUrl : prodUrl;
app.on('ready', () => {
  console.log(autoUpdater, "autoUpdater");

  autoUpdater.autoDownload = false;
  if (isDev) autoUpdater.updateConfigPath = path.join(__dirname, 'dev-app-update.yml');
  // autoUpdater.checkForUpdatesAndNotify();
  autoUpdater.checkForUpdates();

  autoUpdater.on('error', (error) => {
    dialog.showErrorBox('Error', error);
  });

  // dialog.showErrorBox('Error', "一段测试内容");
  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: "info",
      title: "应用有新版本,是否现在更新?",
      buttons: ['是', '否']
    }, (buttonIndex) => {
      if (buttonIndex === 0) autoUpdater.downloadUpdate();
    });
  });


  autoUpdater.on('update-not-available', () => {
    dialog.showMessageBox({
      title: "检查更新",
      message: "当前已经是最新版本了"
    })
  });

  autoUpdater.on('checking-for-updat', () => {
    console.log('检查版本更新');
  });


  // download-progress
  autoUpdater.on('download-progress', (progressObj) => {
    console.log(progressObj, '下载中');
  });


  autoUpdater.on('update-downloaded', (progressObj) => {
    dialog.showMessageBox({
      title: "安装更新",
      message: "更新下载完毕,应用将重启并进行安装"
    }, () => {
      setImmediate(() => autoUpdater.quitAndInstall());
    });
  });


  const urlLocation = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`

  let mainWindow = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadURL(urlLocation);
  isDev && mainWindow.webContents.openDevTools();

  ipcMain.on('message', (event, arg) => {
    console.log(event)
    console.log(arg)
    event.reply('reply', 'hello from main process')
  })

})