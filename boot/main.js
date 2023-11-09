const process = require('node:process');
const path = require('node:path');
const { app, BrowserWindow, Menu } = require('electron');

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';

let win= null;

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false,
      contextIsolation: false
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));
  Menu.setApplicationMenu(null);

  win.on('closed', async function() {
    win = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (win === null) {
    createWindow();
  }
});