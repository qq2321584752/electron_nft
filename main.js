
const path = require('path');
const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');

const isDev = require("electron-is-dev");
// const mvp_ser = require("./mvp-ser/out/mvp-ser");

app.on('ready', () => {
  const urlLocation = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`;



  let mainWindow = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  mainWindow.loadURL(urlLocation);

  // 检查更新
  autoUpdater.autoDownload = false;

  const startCheckUpdate = () => {
    if (isDev) {
      autoUpdater.updateConfigPath = path.join(__dirname, 'dev-app-update.yml')
      autoUpdater.checkForUpdates();
      mainWindow.webContents.openDevTools();
    } else {
      autoUpdater.checkForUpdatesAndNotify();
    };
    console.log('检查更新');

  }

  startCheckUpdate();

  autoUpdater.on('error', (error) => {
    console.log(error, '-------------error--------------');
    error.statusCode && dialog.showErrorBox('Error', JSON.stringify(error));
  });

  // dialog.showErrorBox('Error', "一段测试内容");
  autoUpdater.on('update-available', (info) => {
    console.log('进入update-available', info);
    dialog.showMessageBox({
      type: "question",
      title: "检查更新",
      message: "应用有新版本,是否现在更新?",
      buttons: ['是', '否']
    }).then((buttonIndex) => {
      console.log(buttonIndex, "buttonIndex");
      if (buttonIndex.response === 0) {
        console.log('点击确定按钮');
        autoUpdater.downloadUpdate();

      };
    });
  });


  autoUpdater.on('update-not-available', () => {
    dialog.showMessageBoxSync({
      title: "检查更新",
      message: "当前已经是最新版本了"
    })
  });

  autoUpdater.on('checking-for-update', () => {
    console.log('检查版本更新-checking-for-update---------');
  });


  // download-progress
  autoUpdater.on('download-progress', (progressObj) => {
    let percent = progressObj.percent.toFixed(2);
    console.log(progressObj, percent, '------下载中------');
    mainWindow.setProgressBar(progressObj.percent / 100);

  });


  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBoxSync({
      title: "安装更新",
      message: "更新下载完毕,应用将重启并进行安装"
    }).then(() => {
      mainWindow.setProgressBar(-1);
      console.log('update-downloaded--------------');
      setImmediate(() => autoUpdater.quitAndInstall());
    });
  });


  ipcMain.on('check_update', (event) => {
    // console.log(event, args, "event, args");
    startCheckUpdate();
    // event.reply('reply_check_update', { status: "200", data: null, msg: "我裂开" });

  });

})