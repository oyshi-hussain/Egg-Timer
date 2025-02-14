const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 700,
        height: 720,
        minHeight: 620,
        minWidth: 600,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
            webSecurity: true,
            sandbox: true,
        },
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
    // mainWindow.webContents.openDevTools();
}

ipcMain.on("minimize-window", () => {
    if (mainWindow) mainWindow.minimize();
});

ipcMain.on("close-window", () => {
    if (mainWindow) mainWindow.close();
});

app.whenReady().then(createWindow);
