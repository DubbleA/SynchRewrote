const {app, BrowserWindow} = require('electron');
let mainWindow;

const shell = require('electron').shell;



app.on('ready', () => {
  mainWindow = new BrowserWindow ({
    width: 995,
    height: 555,
    useContentSize:true,
    transparent:true,
    resizable:false,
    frame: false,
    
  });
  
  mainWindow.loadURL('file://' + __dirname + '/Window1/html/Window1.html');
  
}); 