const {app, BrowserWindow} = require('electron');
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    useContentSize:true,
    transparent:true,
    resizable:false,
    frame: false
  });
  mainWindow.loadURL('file://' + __dirname + '/Window1/html/Window1.html');
}); 