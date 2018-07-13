const {app, BrowserWindow} = require('electron');
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600
  });
  mainWindow.loadURL('file://' + __dirname + '/Window1/html/Address.html');
});