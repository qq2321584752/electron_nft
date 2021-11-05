
const path = require('path');
// const url = require('url');
const { app, BrowserWindow, ipcMain } = require('electron');

const isDev = require("electron-is-dev");

// const indexUrl = isDev ? devUrl : prodUrl;
app.on('ready', () => {
  const urlLocation = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`
  // console.log(urlLocation, "urlLocation");
  console.log(isDev);

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